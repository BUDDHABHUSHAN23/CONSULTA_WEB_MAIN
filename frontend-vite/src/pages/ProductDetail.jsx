import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Check } from "lucide-react";
import { productsAPI } from "../services/api";

export default function ProductDetail() {
  const { slug } = useParams();
  const [p, setP] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      try {
        const data = await productsAPI.getBySlug(slug);
        setP(data);
      } catch(e) { setError(e); } finally { setLoading(false); }
    })();
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-600">Loading…</div>;
  if (error || !p) return <div className="min-h-screen flex items-center justify-center text-gray-600">Not found. <Link to="/products" className="ml-2 underline">Back</Link></div>;

  return (
    <div className="min-h-screen bg-white">
      <section className="pt-28 sm:pt-32 pb-10 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/products" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 group transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Products
          </Link>

          <div className="flex items-start gap-4">
            {p.logo && <img src={p.logo} alt="" className="h-12 w-12 rounded-lg object-contain bg-gray-50 border border-gray-200" />}
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">{p.title}</h1>
              {p.tagline && <p className="mt-2 text-lg text-gray-600 max-w-3xl">{p.tagline}</p>}
              {p.website && (
                <a href={p.website} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm text-gray-900 underline-offset-2 hover:underline">
                  Visit website <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {p.description && (
            <div className="rounded-3xl border border-gray-100 bg-white p-6 sm:p-10 shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-900">Overview</h2>
              <p className="mt-3 text-gray-700 leading-relaxed">{p.description}</p>
            </div>
          )}

          {Array.isArray(p.features) && p.features.length > 0 && (
            <div className="mt-6 rounded-3xl border border-gray-100 bg-white p-6 sm:p-10 shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-900">Key features</h2>
              <div className="mt-3 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
                {p.features.map((f,i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-gray-900" />
                    <div className="text-sm text-gray-800">{f}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
