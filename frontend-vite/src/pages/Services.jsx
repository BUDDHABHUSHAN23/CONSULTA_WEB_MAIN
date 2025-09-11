import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, ExternalLink, LayoutGrid, List } from "lucide-react";
import Footer from "../components/Footer";
import { productsAPI } from "../services/api";
import useReveal from "../hooks/useReveal"; // <-- adjust path if needed

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

const ProductCard = ({ p, index, compact = false, featured = false }) => {
  const { ref, show } = useReveal(0.15); // your hook returns {ref, show}
  return (
    <article
      ref={ref}
      className={[
        "group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-xl",
        "transition-all duration-500 will-change-transform",
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        featured && !compact ? "md:col-span-2 p-8" : "",
        compact ? "flex gap-4 items-start" : "",
      ].join(" ")}
      style={{ transitionDelay: `${Math.min(index * 60, 240)}ms` }}
    >
      {/* Logo */}
      {p.logo ? (
        <img
          src={p.logo}
          alt=""
          className={[
            "rounded-xl object-contain bg-gray-50 border border-gray-200",
            compact ? "h-16 w-16 shrink-0" : "h-16 w-16",
          ].join(" ")}
          loading="lazy"
        />
      ) : (
        <div className="h-16 w-16 rounded-xl bg-gray-100 border border-gray-200 grid place-items-center text-xs text-gray-500">
          Logo
        </div>
      )}

      {/* Content */}
      <div className={compact ? "min-w-0 flex-1" : ""}>
        <header className={compact ? "" : "mt-2"}>
          <h3
            className={[
              "font-semibold text-gray-900 tracking-tight line-clamp-1 group-hover:opacity-90",
              featured && !compact ? "text-2xl" : "text-lg",
            ].join(" ")}
          >
            {p.title}
          </h3>
          {p.tagline && (
            <p className={["text-gray-600", featured && !compact ? "mt-1" : "", "text-sm line-clamp-2"].join(" ")}>
              {p.tagline}
            </p>
          )}
        </header>

        {p.description && !compact && (
          <p className={["text-sm leading-6 text-gray-700", featured ? "mt-3 line-clamp-3" : "mt-3 line-clamp-4"].join(" ")}>
            {p.description}
          </p>
        )}

        {Array.isArray(p.features) && p.features.length > 0 && (
          <ul className={compact ? "mt-2 flex flex-wrap gap-2" : "mt-4 space-y-1.5 text-sm text-gray-700 list-disc pl-5"}>
            {p.features.slice(0, compact ? 3 : featured ? 6 : 4).map((f, i) =>
              compact ? (
                <li key={i} className="text-xs text-gray-700 bg-gray-100 border border-gray-200 rounded-full px-2.5 py-0.5">
                  {f}
                </li>
              ) : (
                <li key={i}>{f}</li>
              )
            )}
          </ul>
        )}

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Link
            to={`/products/${p.slug}`}
            className="px-3 py-2 rounded-xl border border-gray-200 bg-white text-sm font-medium hover:bg-gray-50 active:bg-gray-100 transition-colors"
          >
            Learn more
          </Link>
          {p.website && (
            <a
              href={p.website}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm text-gray-900 underline-offset-2 hover:underline"
            >
              Website <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

/* ------------------------------ Page ------------------------------ */

export default function Products() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [layout, setLayout] = useState("detailed"); // "detailed" | "compact"
  const [cat, setCat] = useState("All");

  const [entered, setEntered] = useState(false);
  useEffect(() => setEntered(true), []);

  // fetch
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

  // categories
  const categories = useMemo(() => {
    const all = new Set();
    items.forEach((p) => (p.categories || []).forEach((c) => all.add(String(c).trim())));
    return ["All", ...Array.from(all)];
  }, [items]);

  // filter
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

  // reveal for chips/grid using your hook
  const chipsReveal = useReveal(0.1);
  const gridReveal = useReveal(0.15);

  // feature the first card only on All + no search + detailed layout
  const showFeatured =
    layout === "detailed" && !query.trim() && cat === "All" && filtered.length > 0;

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

          <div className={`transition-all duration-1000 ease-out ${entered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
              Products we use
            </h1>
            <p className="mt-3 text-lg text-gray-600 max-w-3xl">
              Best-in-class tools we integrate into dependable solutions.
            </p>
          </div>

          {/* search + layout toggle */}
          <div className={`mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between transition-all duration-700 ${entered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
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

          {/* sticky chips row (tap active → All) */}
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
            <div className="grid gap-6 sm:gap-8 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
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
                "rounded-2xl border border-gray-200 bg-white p-10 text-center text-sm text-gray-600",
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
                layout === "compact"
                  ? "grid gap-4 sm:gap-6 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]"
                  : "grid gap-6 sm:gap-8 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]",
                "transition-all duration-700",
                gridReveal.show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
              ].join(" ")}
            >
              {filtered.map((p, i) => (
                <ProductCard
                  key={p.id || p.slug || i}
                  p={p}
                  index={i}
                  compact={layout === "compact"}
                  featured={showFeatured && i === 0}
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
