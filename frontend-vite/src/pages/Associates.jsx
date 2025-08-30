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
  ImageOff,
} from "lucide-react";

import Footer from "../components/Footer";
import { sampleAssociates } from "../data/mock";

// ---------- helpers ----------
const safeAssociates = sampleAssociates;

function useMemoTags(list) {
  return useMemo(() => {
    const set = new Set();
    list.forEach((a) => (a.tags || []).forEach((t) => set.add(t)));
    return ["All", ...Array.from(set).sort()];
  }, [list]);
}

const FALLBACK_SVG =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="320" height="80" viewBox="0 0 320 80"><rect width="100%" height="100%" rx="12" fill="%23f3f4f6"/><g fill="%239ca3af" font-family="Arial,Helvetica,sans-serif" font-size="16"><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">Logo</text></g></svg>';

// ---------- page ----------
const Associates = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("All");
  const [current, setCurrent] = useState(null);

  const allTags = useMemoTags(safeAssociates);

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return safeAssociates.filter((a) => {
      const hitTag = tag === "All" || (a.tags || []).includes(tag);
      const hay = `${a.name} ${a.blurb} ${a.industries?.join(" ")} ${a.location}`.toLowerCase();
      const hitQuery = !q || hay.includes(q);
      return hitTag && hitQuery;
    });
  }, [query, tag]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header (match Contact spacing/scale) */}
      <section className="bg-gradient-to-b from-gray-50 to-white pt-28 sm:pt-32 pb-10 sm:pb-12">
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
              Our <span className="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">Associates</span>
            </h1>

            <p className="mt-4 max-w-3xl text-lg sm:text-xl text-gray-600 leading-relaxed">
              Trusted partners across DCS, connectivity, and electrical ecosystems.
            </p>

            {/* Marquee (normalized frames + mask like the hero strip) */}
            <div className="logo-marquee mt-10">
            <div className="logo-track items-center">
                {[...safeAssociates, ...safeAssociates].map((a, i) => (
                <img
                    key={`${a.id}-${i}`}
                    src={a.logo}
                    alt={`${a.name} logo`}
                    title={a.name}
                    className="h-8 sm:h-10 w-auto mx-10 object-contain
                            opacity-60 grayscale contrast-125
                            transition-transform duration-300
                            hover:opacity-100 hover:grayscale-0 hover:scale-[1.03]"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = FALLBACK_SVG;
                    }}
                />
                ))}
            </div>
            </div>
            {/* Controls (rounded-full like your Contact CTA tone) */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative w-full sm:max-w-md">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  className="w-full rounded-full border border-gray-200 bg-white px-10 py-2.5 outline-none transition focus:ring-2 focus:ring-gray-200"
                  placeholder="Search associates, e.g. OPC, Drives, Cement…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </span>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((t) => {
                    const active = tag === t;
                    return (
                      <button
                        key={t}
                        onClick={() => setTag(t)}
                        className={`rounded-full px-3 py-1.5 text-sm transition ${
                          active
                            ? "bg-gray-900 text-white shadow-sm"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                        }`}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid (cards match Contact’s soft card look) */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-gray-500">No associates match your search.</div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((a, i) => (
                <article
                  key={a.id}
                  className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:shadow-lg"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                    
                {/* Logo header – clean, no inner chip */}
                <div className="relative h-32 bg-gradient-to-br from-gray-50 to-white">
                <div className="absolute inset-0 grid place-items-center">
                    <img
                    src={a.logo}
                    alt={`${a.name} logo`}
                    className="h-10 sm:h-12 w-auto object-contain opacity-90 transition
                                hover:opacity-100 hover:scale-[1.02]"
                    loading="lazy"
                    onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = FALLBACK_SVG; // keep your fallback
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

                    <h3 className="mt-1 text-lg font-semibold text-gray-900">{a.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">{a.blurb}</p>

                    {/* Badges */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {(a.tags || []).map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-700"
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

            <div className="flex items-center gap-4">
              <div className="flex h-10 w-40 items-center justify-center rounded-xl bg-gray-50 ring-1 ring-gray-200">
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
