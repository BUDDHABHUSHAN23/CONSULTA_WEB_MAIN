// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { ArrowLeft, Check } from "lucide-react";
// import { industriesAPI } from "../services/api";

// export default function IndustryDetail() {
//   const { slug } = useParams();
//   const [item, setItem] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//     (async () => {
//       try {
//         const data = await industriesAPI.getBySlug(slug);
//         setItem(data);
//       } catch (e) {
//         setError(e);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, [slug]);

//   if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-600">Loading…</div>;
//   if (error || !item) return (
//     <div className="min-h-screen flex items-center justify-center text-gray-600">
//       Unable to load industry details. <Link to="/industries" className="ml-2 underline">Back</Link>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-white">
//       <section className="pt-28 sm:pt-32 pb-10 bg-gradient-to-b from-gray-50 to-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <Link to="/industries" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 group transition-colors">
//             <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
//             Back to Industries
//           </Link>

//           <div className="grid lg:grid-cols-2 gap-8 items-center">
//             <div>
//               <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">{item.title}</h1>
//               <p className="mt-4 text-lg text-gray-600 max-w-2xl">{item.description}</p>

//               {Array.isArray(item.features) && item.features.length > 0 && (
//                 <div className="mt-6 space-y-2">
//                   {item.features.map((f, i) => (
//                     <div key={i} className="flex items-center text-gray-800">
//                       <Check className="h-5 w-5 text-green-500 mr-3" />
//                       {f}
//                     </div>
//                   ))}
//                 </div>
//               )}

//               <div className="mt-8 flex gap-3">
//                 <Link to="/contact" className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-all duration-300 hover:shadow-lg group">
//                   Talk to us
//                 </Link>
//                 <a href="#solutions" className="inline-flex items-center px-6 py-3 rounded-xl font-medium border border-gray-200 hover:bg-gray-50">View solutions</a>
//               </div>
//             </div>

//             <div className="relative h-72 sm:h-80 lg:h-96 rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
//               <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }} />
//               <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/30" />
//             </div>
//           </div>
//         </div>
//       </section>

//       <section id="solutions" className="py-14">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="rounded-3xl border border-gray-100 bg-white p-6 sm:p-10 shadow-sm">
//             <h2 className="text-2xl font-semibold text-gray-900">How we help</h2>
//             <div className="mt-4 grid gap-4 sm:gap-6 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
//               {(item.solutions || item.features || []).slice(0, 8).map((s, i) => (
//                 <div key={i} className="rounded-2xl border border-gray-200 bg-white p-5">
//                   <div className="flex items-start gap-3">
//                     <Check className="h-5 w-5 text-gray-900" />
//                     <div className="text-sm text-gray-800">{s}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Bell, CalendarDays, Hammer } from "lucide-react";

function titleCaseSlug(slug) {
  if (!slug) return "Industry";
  return slug.split("-").map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(" ");
}

export default function IndustryDetail() {
  const { slug } = useParams();
  const name = titleCaseSlug(slug);

  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="min-h-screen bg-white">
      <section className="pt-24 sm:pt-28 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            to="/industries"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 group"
          >
            <ArrowLeft className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Industries
          </Link>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left: copy */}
            <div className="reveal-y">
              <span className="pill">
                <Hammer className="h-4 w-4" />
                Building in public
              </span>

              <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 balance">
                {name} — Page Coming Soon
              </h1>

              <p className="mt-4 text-lg text-gray-600 max-w-2xl">
                We’re crafting a deep-dive for {name}: market overview, key challenges,
                solution playbook, and real-world success stories. In the meantime, reach out
                or get notified when it goes live.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="apple-button inline-flex items-center px-6 py-3 rounded-xl font-medium text-white bg-gray-900 hover:bg-gray-800"
                >
                  Talk to us
                </Link>

                <a
                  href={`mailto:info@consulta.in?subject=Notify%20me%20about%20industry%20page:%20${encodeURIComponent(
                    name
                  )}`}
                  className="apple-button inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium border border-gray-200 hover:bg-gray-50 text-gray-900"
                >
                  <Bell className="h-5 w-5" />
                  Notify me
                </a>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  {
                    icon: <CalendarDays className="h-5 w-5" />,
                    title: "Timeline",
                    desc: "Rolling updates over the next few weeks",
                  },
                  {
                    icon: <Hammer className="h-5 w-5" />,
                    title: "What’s coming",
                    desc: "Challenges, solutions, KPIs, and case studies",
                  },
                ].map((it, i) => (
                  <div key={i} className="glass-card reveal-y">
                    <div className="flex items-start gap-3 p-4">
                      <div className="mt-0.5 text-gray-700">{it.icon}</div>
                      <div>
                        <div className="font-semibold text-gray-900">{it.title}</div>
                        <div className="text-sm text-gray-600">{it.desc}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: static visual (no gradient/stripes) */}
            <div className="relative h-64 sm:h-80 lg:h-[28rem] reveal-y">
                <div className="absolute inset-0 rounded-3xl bg-white ring-1 ring-gray-200 shadow-sm" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="shine shine-run rounded-2xl bg-white px-5 py-3 text-sm font-medium text-gray-700 ring-1 ring-gray-200">
                    Content under construction
                  </div>
                </div>
              </div>
          </div>

          {/* What to expect */}
          <div className="mt-14">
            <div className="rounded-3xl bg-white p-6 sm:p-10 shadow-sm ring-1 ring-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900">What you’ll find here soon</h2>
              <div className="mt-4 grid gap-4 sm:gap-6 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
                {[
                  "Market size & growth outlook",
                  "Operational challenges & pain points",
                  "Our solution playbook for this industry",
                  "Expected KPIs and ROI ranges",
                  "Case studies & success stories",
                  "Recommended tech stack & roadmap",
                ].map((s, i) => (
                  <div
                    key={i}
                    className="shine glass-card p-5 text-gray-800 reveal-y"
                  >
                    {s}
                  </div>
                ))}
              </div>
              <div className="mt-6 text-sm text-gray-500">
                Need details before this page goes live?{" "}
                <Link
                  to="/contact"
                  className="underline underline-offset-4 decoration-gray-300 hover:text-gray-700"
                >
                  Reach out here
                </Link>
                .
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

