import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, ExternalLink, LayoutGrid, List } from "lucide-react";
import Footer from "../components/Footer";
import { productsAPI } from "../services/api";
import useReveal from "../hooks/useReveal";

/* --------------------------- UI bits --------------------------- */

const Chip = ({ active, children, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={[
      "whitespace-nowrap rounded-full border px-3 py-1.5 text-sm transition-all",
      active
        ? "bg-gray-900 text-white border-gray-900 shadow-sm"
        : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50",
    ].join(" ")}
  >
    {children}
  </button>
);

const FALLBACK_LOGO =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><rect width="100%" height="100%" rx="12" fill="%23f3f4f6"/><g fill="%239ca3af" font-family="Arial,Helvetica,sans-serif" font-size="12"><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">Logo</text></g></svg>';

const ProductCard = ({ p, index, compact = false, featured = false }) => {
  const { ref, show } = useReveal(0.15);

  return (
    <article
      ref={ref}
      className={[
        // frame
        "group relative rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg",
        "transition-all duration-300 will-change-transform hover:-translate-y-0.5",
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        // equal heights + inner layout
        "h-full flex flex-col p-6",
      ].join(" ")}
      style={{ transitionDelay: `${Math.min(index * 60, 240)}ms` }}
    >
      {/* removed decorative top accent to avoid faint line artifacts */}

      {/* header: logo + title/tagline */}
      <div className="flex items-start gap-4">
        <div className="size-16 rounded-xl border border-gray-200 bg-gray-50 grid place-items-center shrink-0 overflow-hidden">
          <img
            src={p.logo || FALLBACK_LOGO}
            onError={(e) => (e.currentTarget.src = FALLBACK_LOGO)}
            alt=""
            className="h-12 w-12 object-contain"
            loading="lazy"
          />
        </div>

        <div className="min-w-0">
          <h3
            className={[
              "font-semibold text-gray-900 tracking-tight line-clamp-1",
              featured ? "text-xl" : "text-lg",
            ].join(" ")}
            title={p.title}
          >
            {p.title}
          </h3>
          {p.tagline && (
            <p className="mt-0.5 text-sm text-gray-600 line-clamp-2" title={p.tagline}>
              {p.tagline}
            </p>
          )}
        </div>
      </div>

      {/* body */}
      <div className="mt-3 flex-1 min-h-[1rem]">
        {!compact && p.description && (
          <p
            className={[
              "text-sm leading-6 text-gray-700",
              featured ? "line-clamp-3" : "line-clamp-4",
            ].join(" ")}
          >
            {p.description}
          </p>
        )}

        {Array.isArray(p.features) && p.features.length > 0 && (
          <>
            {!compact && <div className="my-4 h-px bg-gray-100" />}
            <ul
              className={
                compact
                  ? "mt-2 flex flex-wrap gap-2"
                  : "mt-3 space-y-2 text-sm text-gray-700 list-disc pl-5"
              }
            >
              {p.features
                .slice(0, compact ? 3 : featured ? 6 : 4)
                .map((f, i) =>
                  compact ? (
                    <li
                      key={i}
                      className="text-xs text-gray-700 bg-gray-100 border border-gray-200 rounded-full px-2.5 py-0.5"
                    >
                      {f}
                    </li>
                  ) : (
                    <li key={i} className="leading-6">
                      {f}
                    </li>
                  )
                )}
            </ul>
          </>
        )}
      </div>

      {/* footer */}
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Link
          to={`/products/${p.slug}`}
          className="px-3 py-2 rounded-xl border border-gray-200 bg-white text-sm font-medium hover:bg-gray-50 active:bg-gray-100 transition-colors"
        >
          Learn more
        </Link>
        {/* {p.website && (
          <a
            href={p.website}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-sm text-gray-900 underline-offset-2 hover:underline"
          >
            Website <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )} */}
      </div>
    </article>
  );
};


/* ------------------------------ Page ------------------------------ */

export default function Services() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [layout, setLayout] = useState("detailed"); // "detailed" | "compact"
  const [cat, setCat] = useState("All");
  const [entered, setEntered] = useState(false);

  useEffect(() => setEntered(true), []);

  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      try {
        const list = await productsAPI.getAll();
        setItems(Array.isArray(list) ? list : []);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const categories = useMemo(() => {
    const all = new Set();
    items.forEach((p) => (p.categories || []).forEach((c) => all.add(String(c).trim())));
    return ["All", ...Array.from(all)];
  }, [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((p) => {
      const matchesQ =
        !q ||
        p.title?.toLowerCase().includes(q) ||
        (p.tagline || "").toLowerCase().includes(q) ||
        (p.categories || []).join(" ").toLowerCase().includes(q);
      const matchesCat = cat === "All" || (p.categories || []).includes(cat);
      return matchesQ && matchesCat;
    });
  }, [items, query, cat]);

  // Keep the reveal effects for chips + grid
  const chipsReveal = useReveal(0.1);
  const gridReveal = useReveal(0.15);

  // If you still want a “featured” look, we only bump typography/padding (no col-span)
  const showFeatured = layout === "detailed" && !query.trim() && cat === "All" && filtered.length > 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="pt-28 pb-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 group transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Home
          </Link>

          <div
            className={`transition-all duration-1000 ease-out ${
              entered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
              Our Professional Services
            </h1>
            <p className="mt-3 text-lg text-gray-600 max-w-3xl">
              Superior tools meticulously assembled into dependable frameworks
            </p>
          </div>

          {/* search + layout toggle */}
          <div
            className={`mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between transition-all duration-700 ${
              entered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="relative max-w-xl w-full">
              <Search className="pointer-events-none absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, categories…"
                className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-10 pr-3 text-sm outline-none focus:ring-4 focus:ring-gray-900/10"
              />
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                onClick={() => setLayout("detailed")}
                className={[
                  "inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition-all",
                  layout === "detailed"
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50",
                ].join(" ")}
              >
                <List className="h-4 w-4" /> Detailed
              </button>
              <button
                onClick={() => setLayout("compact")}
                className={[
                  "inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition-all",
                  layout === "compact"
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50",
                ].join(" ")}
              >
                <LayoutGrid className="h-4 w-4" /> Compact
              </button>
            </div>
          </div>

          {/* sticky chips row */}
          <div
            ref={chipsReveal.ref}
            className={[
              "mt-4 sticky top-16 z-[5] bg-gradient-to-b from-gray-50 to-white py-3",
              "border-y border-gray-100",
              "transition-all duration-700",
              chipsReveal.show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
            ].join(" ")}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
                {categories.map((c) => (
                  <Chip
                    key={c}
                    active={c === cat}
                    onClick={() => setCat((prev) => (prev === c ? "All" : c))}
                  >
                    {c}
                  </Chip>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid gap-6 sm:gap-8 [grid-template-columns:repeat(auto-fill,minmax(280px,1fr))]">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse rounded-2xl border border-gray-200 bg-white p-6">
                  <div className="flex items-start gap-3">
                    <div className="h-16 w-16 rounded-xl bg-gray-100" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-40 bg-gray-100 rounded" />
                      <div className="h-3 w-64 bg-gray-100 rounded" />
                    </div>
                  </div>
                  <div className="mt-4 h-16 bg-gray-100 rounded" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div
              ref={gridReveal.ref}
              className={[
                "grid gap-6 sm:gap-8 items-stretch",
                layout === "compact"
                  ? "[grid-template-columns:repeat(auto-fill,minmax(260px,1fr))]"
                  : "[grid-template-columns:repeat(auto-fill,minmax(300px,1fr))]",
                // this line encourages equal heights across rows
                "auto-rows-fr",
                "transition-all duration-700",
                gridReveal.show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
              ].join(" ")}
            >
              No products found.
            </div>
          ) : (
            <div
              ref={gridReveal.ref}
              className={[
                "grid gap-6 sm:gap-8 items-stretch",
                layout === "compact"
                  ? "[grid-template-columns:repeat(auto-fill,minmax(260px,1fr))]"
                  : "[grid-template-columns:repeat(auto-fill,minmax(280px,1fr))]",
                "transition-all duration-700",
                gridReveal.show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
              ].join(" ")}
            >
              {filtered.map((p, i) => (
                <ProductCard
                  key={p._id?.$oid || p.id || p.slug || i}
                  p={p}
                  index={i}
                  compact={layout === "compact"}
                  featured={showFeatured && i === 0} // only typography/padding, no col-span
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
