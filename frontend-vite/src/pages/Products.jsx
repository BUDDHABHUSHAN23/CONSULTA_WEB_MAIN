import React, { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Search, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { productsAPI } from "../services/api";

export default function Products() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      try {
        const list = await productsAPI.getAll();
        setItems(Array.isArray(list) ? list : []);
      } finally { setLoading(false); }
    })();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(p =>
      p.title.toLowerCase().includes(q) ||
      (p.tagline || "").toLowerCase().includes(q) ||
      (p.categories || []).join(" ").toLowerCase().includes(q)
    );
  }, [items, query]);

  return (
    <div className="min-h-screen bg-white">
      <section className="pt-32 pb-10 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 group transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Home
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">Products we use</h1>
          <p className="mt-3 text-lg text-gray-600 max-w-3xl">Best-in-class tools we integrate into dependable solutions.</p>
          <div className="mt-6 relative max-w-xl">
            <Search className="pointer-events-none absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, categories…"
              className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-gray-500">Loading products…</div>
          ) : filtered.length === 0 ? (
            <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center text-sm text-gray-600">No products found.</div>
          ) : (
            <div className="grid gap-6 sm:gap-8 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
              {filtered.map((p) => (
                <article key={p.id} className="group rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-2xl transition-all">
                  <header className="flex items-start gap-3">
                    {p.logo && <img src={p.logo} alt="" className="h-10 w-10 rounded-lg object-contain bg-gray-50 border border-gray-200" />}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:opacity-90">{p.title}</h3>
                      {p.tagline && <p className="text-sm text-gray-600">{p.tagline}</p>}
                    </div>
                  </header>
                  {p.description && <p className="mt-3 text-sm text-gray-700 line-clamp-4">{p.description}</p>}
                  {Array.isArray(p.features) && p.features.length > 0 && (
                    <ul className="mt-3 space-y-1 text-sm text-gray-700 list-disc pl-5">
                      {p.features.slice(0,4).map((f,i) => <li key={i}>{f}</li>)}
                    </ul>
                  )}
                  <div className="mt-4 flex items-center gap-3">
                    <Link to={`/products/${p.slug}`} className="px-3 py-2 rounded-xl border border-gray-200 text-sm hover:bg-gray-50">Learn more</Link>
                    {p.website && (
                      <a href={p.website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm text-gray-900 underline-offset-2 hover:underline">
                        Website <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
