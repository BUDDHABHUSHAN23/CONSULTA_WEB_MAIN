import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ExternalLink,
  Filter,
  Globe,
  MapPin,
  Calendar,
  X,
  Search,
  Building2,
  SortAsc,
  RotateCcw,
} from "lucide-react";

import Footer from "../components/Footer";
import { sampleAssociates } from "../data/mock";

// ---------- helpers ----------
const safeAssociates = sampleAssociates;

const FALLBACK_SVG =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="320" height="80" viewBox="0 0 320 80"><rect width="100%" height="100%" rx="12" fill="%23f3f4f6"/><g fill="%239ca3af" font-family="Arial,Helvetica,sans-serif" font-size="16"><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">Logo</text></g></svg>';

function useTagIndex(list) {
  return useMemo(() => {
    const counts = new Map();
    list.forEach((a) => (a.tags || []).forEach((t) => counts.set(t, (counts.get(t) || 0) + 1)));
    const tags = Array.from(counts.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([name, count]) => ({ name, count }));
    return [{ name: "All", count: list.length }, ...tags];
  }, [list]);
}

function Mark({ text, q }) {
  if (!q) return text;
  const parts = text.split(new RegExp(`(${q.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&")})`, "ig"));
  return parts.map((p, i) =>
    p.toLowerCase() === q.toLowerCase() ? (
      <mark key={i} className="rounded px-0.5 bg-yellow-100">
        {p}
      </mark>
    ) : (
      <React.Fragment key={i}>{p}</React.Fragment>
    )
  );
}

// ---------- page ----------
const Associates = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("All");
  const [sort, setSort] = useState("name"); // "name" | "newest" | "oldest"
  const [current, setCurrent] = useState(null);
  const [showAllTags, setShowAllTags] = useState(false);

  const tags = useTagIndex(safeAssociates);

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = safeAssociates.filter((a) => {
      const hitTag = tag === "All" || (a.tags || []).includes(tag);
      if (!q) return hitTag;
      const hay = `${a.name} ${a.blurb} ${a.industries?.join(" ")} ${a.location}`.toLowerCase();
      return hitTag && hay.includes(q);
    });

    if (sort === "name") return [...base].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "newest") return [...base].sort((a, b) => (b.since || 0) - (a.since || 0));
    return [...base].sort((a, b) => (a.since || 0) - (b.since || 0));
  }, [query, tag, sort]);

  const visibleTags = useMemo(
    () => (showAllTags ? tags : tags.slice(0, 12)),
    [tags, showAllTags]
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-b from-gray-50 to-white pt-28 sm:pt-32 pb-8 sm:pb-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={`transition-all duration-700 ease-out ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <Link
              to="/"
              className="group mb-6 inline-flex items-center text-gray-600 transition-colors hover:text-gray-900"
            >
              <ArrowLeft className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to Home
            </Link>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
              Our{" "}
              <span className="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                Associates
              </span>
            </h1>

            <p className="mt-4 max-w-3xl text-lg sm:text-xl text-gray-600 leading-relaxed">
              <span className="font-bold">Trusted partners</span> across DCS, connectivity, and electrical ecosystems.
            </p>

            {/* Logo strip */}
              <div
                className={`transition-all duration-1000 ease-out delay-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <div className="mt-20">
                  <p className="text-sm text-gray-500 font-medium tracking-wide uppercase mb-8">
                    Trusted by industry leaders
                  </p>

                  <div className="logo-marquee opacity-80 border border-gray-200 bg-white/60">
                    <div className="logo-track">
                      {[
                        { src: "/logos/siemens.svg", alt: "Siemens" },
                        { src: "/logos/dell.svg", alt: "Dell Technologies" },
                        { src: "/logos/Cytiva.svg", alt: "Cytiva" },
                      ].map((logo, i) => (
                        <img
                          key={i}
                          src={logo.src}
                          alt={logo.alt}
                          className="logo-img grayscale opacity-70 transition-all duration-300 hover:grayscale-0 hover:opacity-100 hover:scale-105"
                          onError={(e) => {
                            // fallback label block if a logo is missing
                            e.currentTarget.replaceWith(Object.assign(document.createElement('div'), {
                              className: 'px-4 py-2 text-xs text-gray-500 border border-gray-200 rounded-lg bg-white',
                              innerText: 'Logo'
                            }));
                          }}
                        />
                      ))}

                      {/* duplicate set for seamless loop */}
                      {[
                        { src: "/logos/siemens.svg", alt: "Siemens" },
                        { src: "/logos/dell.svg", alt: "Dell Technologies" },
                        { src: "/logos/Cytiva.svg", alt: "Cytiva" },
                      ].map((logo, i) => (
                        <img
                          key={`dup-${i}`}
                          src={logo.src}
                          alt={logo.alt}
                          className="logo-img grayscale opacity-70 transition-all duration-300 hover:grayscale-0 hover:opacity-100 hover:scale-105"
                          onError={(e) => {
                            e.currentTarget.replaceWith(Object.assign(document.createElement('div'), {
                              className: 'px-4 py-2 text-xs text-gray-500 border border-gray-200 rounded-lg bg-white',
                              innerText: 'Logo'
                            }));
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>



            {/* Controls */}
            <div className="mt-8 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
              {/* Search */}
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  className="w-full rounded-xl border border-gray-200 bg-white px-10 py-3 text-[15px] outline-none transition focus:ring-2 focus:ring-gray-200"
                  placeholder="Search associates, e.g. OPC, Drives, Cement…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                {(query || tag !== "All") && (
                  <button
                    onClick={() => {
                      setQuery("");
                      setTag("All");
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-2.5 py-1 text-xs text-gray-600 hover:bg-gray-50"
                    title="Clear filters"
                  >
                    <RotateCcw className="h-3.5 w-3.5" /> Clear
                  </button>
                )}
              </div>

              {/* Sort */}
              <div className="flex items-center justify-start sm:justify-end gap-2">
                <span className="hidden sm:inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600">
                  <SortAsc className="mr-2 h-4 w-4" />
                  Sort
                </span>
                <div className="flex overflow-hidden rounded-full border border-gray-200">
                  {[
                    { k: "name", label: "A–Z" },
                    { k: "newest", label: "Newest" },
                    { k: "oldest", label: "Oldest" },
                  ].map((opt) => (
                    <button
                      key={opt.k}
                      onClick={() => setSort(opt.k)}
                      className={`px-3 py-1.5 text-sm transition ${
                        sort === opt.k
                          ? "bg-gray-900 text-white"
                          : "bg-white text-gray-800 hover:bg-gray-100"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tag chips */}
            <div className="mt-4">
              <div className="mb-2 inline-flex items-center gap-2 text-sm text-gray-600">
                <Filter className="h-4 w-4" />
                <span>Filter by domain</span>
                <span className="text-gray-400">|</span>
                <span className="text-gray-500">{filtered.length} result(s)</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex-1 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  <div className="flex w-max flex-wrap gap-2 sm:w-full">
                    {visibleTags.map((t) => {
                      const active = tag === t.name;
                      return (
                        <button
                          key={t.name}
                          onClick={() => setTag(t.name)}
                          aria-pressed={active}
                          className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-sm transition
                            ${active
                              ? "border-gray-900 bg-gray-900 text-white shadow-sm"
                              : "border-gray-200 bg-white text-gray-800 hover:bg-gray-50"}`}
                          title={`${t.name} (${t.count})`}
                        >
                          {t.name}
                          <span className={`ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs
                            ${active ? "bg-white/20" : "bg-gray-100 text-gray-600"}`}>
                            {t.count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {tags.length > 12 && (
                  <button
                    onClick={() => setShowAllTags((v) => !v)}
                    className="shrink-0 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-800 transition hover:bg-gray-50"
                  >
                    {showAllTags ? "Less" : "More"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-200 p-8 text-center text-gray-500">
              No associates match your search.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((a, i) => (
                <article
                  key={a.id}
                  className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md hover:ring-1 hover:ring-gray-200"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  {/* Logo header */}
                  <div className="relative h-32 bg-gradient-to-br from-gray-50 to-white">
                    <div className="absolute inset-0 grid place-items-center">
                      <img
                        src={a.logo}
                        alt={`${a.name} logo`}
                        className="h-10 sm:h-12 w-auto object-contain opacity-90 transition hover:opacity-100"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = FALLBACK_SVG;
                        }}
                      />
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Building2 className="h-4 w-4" />
                      <span>{a.name}</span>
                    </div>

                    <h3 className="mt-1 text-lg font-semibold text-gray-900">
                      <Mark text={a.name} q={query} />
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-gray-600">
                      <Mark text={a.blurb || ""} q={query} />
                    </p>

                    {/* Badges */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {(a.tags || []).map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs text-gray-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Meta */}
                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{a.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>Since {a.since}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-5 flex items-center gap-3">
                      <a
                        href={a.website}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-3.5 py-2 text-sm text-white transition hover:bg-gray-800"
                      >
                        <Globe className="h-4 w-4" />
                        Website
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>

                      <button
                        onClick={() => setCurrent(a)}
                        className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-3.5 py-2 text-sm transition hover:bg-gray-50"
                        aria-haspopup="dialog"
                        aria-expanded={!!current}
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {current && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setCurrent(null)}
        >
          <div
            className="relative w-full max-w-xl rounded-3xl border border-gray-200 bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              aria-label="Close"
              onClick={() => setCurrent(null)}
              className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50"
            >
              <X className="h-5 w-5" />
            </button>
              {/* inner logo with card */}
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-40 items-center justify-center ">
                <img
                  src={current.logo}
                  alt={`${current.name} logo`}
                  className="max-h-8 w-auto object-contain"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = FALLBACK_SVG;
                  }}
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{current.name}</h3>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-gray-600">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-4 w-4" /> {current.location}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-4 w-4" /> Since {current.since}
                  </span>
                </div>
              </div>
            </div>

            <p className="mt-4 text-gray-700">{current.blurb}</p>

            <div className="mt-4">
              <h4 className="text-sm font-semibold text-gray-900">Industries</h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {(current.industries || []).map((ind) => (
                  <span
                    key={ind}
                    className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-700"
                  >
                    {ind}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <a
                href={current.website}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2 text-sm text-white transition hover:bg-gray-800"
              >
                <Globe className="h-4 w-4" />
                Visit Website
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <button
                onClick={() => setCurrent(null)}
                className="rounded-xl border border-gray-200 px-4 py-2 text-sm transition hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Associates;
