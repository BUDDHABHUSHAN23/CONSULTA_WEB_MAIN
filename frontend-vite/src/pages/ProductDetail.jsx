import React, { useEffect, useState, useMemo, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  ExternalLink,
  Check,
  Building2,
  Tag,
  BookOpen,
  Layers,
  Store,
  Link2,
  FileText,
} from "lucide-react";
import { productsAPI } from "../services/api";

/* ------------------------- tiny helpers/hooks ------------------------- */

const useReveal = (threshold = 0.2, once = true) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) obs.unobserve(el);
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, once]);
  return { ref, visible };
};

const SectionCard = ({ title, icon, children, className = "" }) => {
  const { ref, visible } = useReveal(0.2);
  return (
    <section
      ref={ref}
      className={[
        "rounded-3xl border border-gray-100 bg-white p-6 sm:p-10 shadow-sm transition-all duration-700",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        className,
      ].join(" ")}
    >
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
      </div>
      {children}
    </section>
  );
};

const Pill = ({ children }) => (
  <span className="text-xs text-gray-700 bg-gray-100 border border-gray-200 rounded-full px-2.5 py-1">
    {children}
  </span>
);

/* ------------------------------ page -------------------------------- */

export default function ProductDetail() {
  const { slug } = useParams();
  const [p, setP] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // local “entered” reveal for hero
  const [entered, setEntered] = useState(false);
  useEffect(() => setEntered(true), []);

  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      try {
        const data = await productsAPI.getBySlug(slug);
        setP(data);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  const catList = useMemo(() => (p?.categories || []).filter(Boolean), [p]);
  const feats = useMemo(() => (Array.isArray(p?.features) ? p.features : []), [p]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading…
      </div>
    );

  if (error || !p)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Not found. <Link to="/products" className="ml-2 underline">Back</Link>
      </div>
    );

  return (
    <div className="min-h-screen bg-white">
      {/* ----------- Header / hero ----------- */}
      <section className="pt-28 sm:pt-32 pb-10 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/products"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 group transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Products
          </Link>

          <div
            className={`flex items-start gap-4 transition-all duration-1000 ease-out ${
              entered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {p.logo && (
              <img
                src={p.logo}
                alt=""
                className="h-20 w-20 rounded-2xl object-contain bg-gray-50 border border-gray-200"
              />
            )}

            <div className="min-w-0">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
                {p.title}
              </h1>
              {p.tagline && (
                <p className="mt-2 text-lg text-gray-600 max-w-3xl">{p.tagline}</p>
              )}
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {catList.map((c, i) => (
                  <Pill key={i}>{c}</Pill>
                ))}
              </div>

              {/* {p.website && (
                <a
                  href={p.website}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-sm text-gray-900 underline-offset-2 hover:underline"
                >
                  Visit website <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )} */}
            </div>
          </div>
        </div>
      </section>

      {/* ----------- Body ----------- */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_320px] gap-8">
          <div className="space-y-6">
            {/* Overview */}
            {p.description && (
              <SectionCard title="Overview" icon={<BookOpen className="h-5 w-5 text-gray-900" />}>
                <p className="text-gray-700 leading-relaxed">{p.description}</p>
              </SectionCard>
            )}

            {/* Key features */}
            {feats.length > 0 && (
              <SectionCard title="Key features" icon={<Layers className="h-5 w-5 text-gray-900" />}>
                <div className="mt-3 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
                  {feats.map((f, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-gray-900" />
                      <div className="text-sm text-gray-800">{f}</div>
                    </div>
                  ))}
                </div>
              </SectionCard>
            )}

            {/* Integrations / Compatibility (OPC, PLCs, Historians, etc.) */}
            {(p?.integrations?.length || p?.compatibility?.length) && (
              <SectionCard
                title="Integrations & Compatibility"
                icon={<Link2 className="h-5 w-5 text-gray-900" />}
              >
                <div className="grid md:grid-cols-2 gap-6">
                  {p?.integrations?.length ? (
                    <div>
                      <div className="text-sm font-semibold text-gray-900 mb-2">Integrates with</div>
                      <div className="flex flex-wrap gap-2">
                        {p.integrations.map((x, i) => (
                          <Pill key={i}>{x}</Pill>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {p?.compatibility?.length ? (
                    <div>
                      <div className="text-sm font-semibold text-gray-900 mb-2">Compatible with</div>
                      <div className="flex flex-wrap gap-2">
                        {p.compatibility.map((x, i) => (
                          <Pill key={i}>{x}</Pill>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              </SectionCard>
            )}

            {/* Docs / Resources */}
            {(p?.docs?.length || p?.resources?.length) && (
              <SectionCard title="Resources" icon={<FileText className="h-5 w-5 text-gray-900" />}>
                <div className="grid sm:grid-cols-2 gap-3">
                  {(p.docs || []).map((d, i) => (
                    <a
                      key={`doc-${i}`}
                      href={d.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span className="truncate">{d.label || d.url}</span>
                    </a>
                  ))}
                  {(p.resources || []).map((r, i) => (
                    <a
                      key={`res-${i}`}
                      href={r.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span className="truncate">{r.label || r.url}</span>
                    </a>
                  ))}
                </div>
              </SectionCard>
            )}

            {/* Internal insights (visible only if API provides) */}
            {(p?.insights?.length || p?.internal_notes) && (
              <SectionCard
                title="Internal insights"
                icon={<Tag className="h-5 w-5 text-gray-900" />}
              >
                {p?.insights?.length ? (
                  <ul className="list-disc pl-5 space-y-2 text-sm text-gray-800">
                    {p.insights.map((t, i) => (
                      <li key={i}>{t}</li>
                    ))}
                  </ul>
                ) : null}
                {p?.internal_notes ? (
                  <p className="mt-3 text-sm text-gray-700 whitespace-pre-line">
                    {p.internal_notes}
                  </p>
                ) : null}
                {/* Optional badge to remind this is internal */}
                <div className="mt-4 inline-flex items-center gap-2 text-xs text-gray-600">
                  <span className="h-2 w-2 rounded-full bg-yellow-400" />
                  For internal reference only
                </div>
              </SectionCard>
            )}
          </div>

          {/* ----------- Right rail (quick facts) ----------- */}
          <aside className="space-y-6">
            {/* Quick facts / Specs */}
            {(p?.specs && Object.keys(p.specs).length > 0) && (
              <SectionCard title="Specs" icon={<Layers className="h-5 w-5 text-gray-900" />}>
                <dl className="grid grid-cols-1 gap-y-3 text-sm">
                  {Object.entries(p.specs).map(([k, v]) => (
                    <div key={k} className="flex items-start justify-between gap-3">
                      <dt className="text-gray-500">{k}</dt>
                      <dd className="text-gray-900 text-right">{String(v)}</dd>
                    </div>
                  ))}
                </dl>
              </SectionCard>
            )}

            {/* Industries / Use cases */}
            {(p?.industries?.length || p?.use_cases?.length) && (
              <SectionCard title="Use in industries" icon={<Building2 className="h-5 w-5 text-gray-900" />}>
                {p?.industries?.length ? (
                  <div className="mb-3 flex flex-wrap gap-2">
                    {p.industries.map((i, idx) => (
                      <Pill key={idx}>{i}</Pill>
                    ))}
                  </div>
                ) : null}
                {p?.use_cases?.length ? (
                  <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-800">
                    {p.use_cases.map((u, i) => (
                      <li key={i}>{u}</li>
                    ))}
                  </ul>
                ) : null}
              </SectionCard>
            )}

            {/* Stores / Distributors / Licensing */}
            {(p?.stores?.length || p?.pricing) && (
              <SectionCard title="Stores & licensing" icon={<Store className="h-5 w-5 text-gray-900" />}>
                {p?.pricing ? (
                  <div className="mb-4 rounded-xl border border-gray-200 p-3">
                    <div className="text-sm text-gray-500">Starting</div>
                    <div className="text-lg font-semibold text-gray-900">{p.pricing}</div>
                    {p?.license_note && (
                      <div className="mt-1 text-xs text-gray-500">{p.license_note}</div>
                    )}
                  </div>
                ) : null}
                {p?.stores?.length ? (
                  <div className="space-y-2">
                    {p.stores.map((s, i) => (
                      <a
                        key={i}
                        href={s.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between rounded-xl border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50"
                      >
                        <span className="truncate">{s.name}</span>
                        <span className="text-gray-500">{s.region || ""}</span>
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-gray-600">Contact us for purchase options.</div>
                )}
              </SectionCard>
            )}

            {/* Related products */}
            {(p?.related || []).length > 0 && (
              <SectionCard title="Related products" icon={<Layers className="h-5 w-5 text-gray-900" />}>
                <div className="space-y-2">
                  {p.related.map((r, i) => (
                    <Link
                      key={i}
                      to={`/products/${r.slug}`}
                      className="flex items-center gap-3 rounded-xl border border-gray-200 p-2 hover:bg-gray-50"
                    >
                      {r.logo ? (
                        <img
                          src={r.logo}
                          alt=""
                          className="h-10 w-10 rounded-lg object-contain bg-gray-50 border border-gray-200"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-lg bg-gray-100 border border-gray-200" />
                      )}
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">{r.title}</div>
                        {r.tagline && (
                          <div className="text-xs text-gray-600 truncate">{r.tagline}</div>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </SectionCard>
            )}
          </aside>
        </div>
      </section>
    </div>
  );
}
