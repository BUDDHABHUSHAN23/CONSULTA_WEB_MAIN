import React, { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Clock, Tag, Search } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import useReveal from "../hooks/useReveal";

// Optional future backend integration
async function fetchBlogs() {
  try {
    // If you add a backend endpoint later, replace below
    // const res = await (await import("../services/api")).default.blogs.getAll();
    // return Array.isArray(res) ? res : [];
    return [];
  } catch {
    return [];
  }
}

const defaultPosts = [
  { title: "Why PCS 7 Templates Matter", excerpt: "Reduce engineering hours and improve reliability with template-driven projects.", slug: "pcs7-templates", read: "4 min", tags: ["PCS 7", "Templates"] },
  { title: "OPC UA vs HDA: When to Use Which", excerpt: "A pragmatic guide to data connectivity for brownfield plants.", slug: "opc-ua-hda", read: "5 min", tags: ["OPC UA", "OPC HDA"] },
  { title: "Historian Cleanup Playbook", excerpt: "Tag hygiene and retrieval APIs that make BI folks happy.", slug: "historian-cleanup", read: "6 min", tags: ["Historians", "Data"] },
];

export default function Blogs() {
  const hero = useReveal(0.1);
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState(defaultPosts);

  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      const serverPosts = await fetchBlogs();
      if (serverPosts.length) setPosts(serverPosts);
    })();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      (p.tags || []).join(" ").toLowerCase().includes(q)
    );
  }, [posts, query]);

  return (
    <div className="min-h-screen surface">
      <section className="pt-32 pb-10 bg-gradient-to-b from-secondary to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={hero.ref} className={`transition-all duration-700 ${hero.show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
            <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 group transition-colors">
              <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
              Back to Home
            </Link>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">Blogs</h1>
            <p className="mt-3 text-lg text-muted-foreground max-w-3xl">Insights on PCS 7, OPC connectivity, and historian strategy.</p>

            <div className="mt-6 relative max-w-xl">
              <Search className="pointer-events-none absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles, topics, tags…"
                className="w-full rounded-xl border border-border bg-card text-foreground py-2.5 pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring/10"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card p-6 text-center text-sm text-muted-foreground">No posts found.</div>
          ) : (
            <div className="grid gap-4 sm:gap-6 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
              {filtered.map((p) => (
                <article key={p.slug} className="group rounded-2xl border border-border bg-card p-5 sm:p-6 hover:shadow-2xl transition-all">
                  <header>
                    <h3 className="text-lg font-semibold text-foreground group-hover:opacity-90">{p.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{p.excerpt}</p>
                  </header>
                  <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4" /> {p.read || "5 min"}</span>
                    <div className="flex flex-wrap gap-1.5">
                      {(p.tags || []).slice(0, 3).map(t => (
                        <span key={t} className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5"><Tag className="h-3 w-3" /> {t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4">
                    <Link to="/contact" className="text-sm text-foreground underline-offset-2 hover:underline">Read more →</Link>
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


