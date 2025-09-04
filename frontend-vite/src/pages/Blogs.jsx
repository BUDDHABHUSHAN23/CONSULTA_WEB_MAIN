import React, { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import useReveal from "../hooks/useReveal";

const posts = [
  { title: "Why PCS 7 Templates Matter", excerpt: "Reduce engineering hours and improve reliability with template-driven projects.", slug: "pcs7-templates" },
  { title: "OPC UA vs HDA: When to Use Which", excerpt: "A pragmatic guide to data connectivity for brownfield plants.", slug: "opc-ua-hda" },
  { title: "Historian Cleanup Playbook", excerpt: "Tag hygiene and retrieval APIs that make BI folks happy.", slug: "historian-cleanup" },
];

const Blogs = () => {
  const hero = useReveal(0.1);
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="min-h-screen bg-white">
      <section className="pt-32 pb-10 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={hero.ref} className={`transition-all duration-700 ${hero.show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
            <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 group transition-colors">
              <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
              Back to Home
            </Link>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">Blogs</h1>
            <p className="mt-3 text-lg text-gray-600 max-w-3xl">Insights on PCS 7, OPC connectivity, and historian strategy.</p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:gap-6 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
            {posts.map((p) => (
              <div key={p.slug} className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
                <div className="text-lg font-semibold text-gray-900">{p.title}</div>
                <p className="mt-1 text-sm text-gray-600">{p.excerpt}</p>
                <Link to="/contact" className="mt-4 inline-flex items-center text-sm text-gray-900 hover:underline">Learn More →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blogs;


