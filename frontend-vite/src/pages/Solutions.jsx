// import React, { useEffect, useMemo, useRef, useState } from "react";
// import {
//   Wrench,
//   Cpu,
//   Package,
//   MonitorCog,
//   GraduationCap,
//   ShieldCheck,
//   ChevronDown,
//   ChevronRight,
//   ImageOff,
// } from "lucide-react";

// /*
//   SOLUTIONS PAGE
//   - Keeps your existing hero, chips, and cards
//   - Adds an API-powered scroll storytelling section (left accordion + right image)
//   - Endpoint: GET /api/industries/sections -> Array<Section>

//   Section shape expected from backend (graceful on partials):
//   {
//     id?: string
//     slug: string
//     title: string
//     summary?: string
//     body?: string
//     points?: string[]
//     image?: string  // hero or primary image URL
//     artwork?: string // optional alt image/artwork URL
//     order?: number
//     icon?: string    // optional key to map a lucide icon
//   }
// */

// // --- Local fallback if API is empty or fails ---
// const fallbackSections = [
//   {
//     slug: "cement",
//     title: "Cement",
//     summary:
//       "Kiln to cooler—robust control, energy KPIs, and brownfield migrations without downtime.",
//     points: [
//       "PCS 7 / CEMAT upgrades",
//       "VRM/VCM optimization",
//       "Expert data historian + Grafana",
//     ],
//     image: "/images/industries/cement.jpg",
//     icon: "shield",
//     order: 1,
//   },
//   {
//     slug: "power",
//     title: "Power & Utilities",
//     summary: "Reliable generation and distribution with clear ops insight and alarms that matter.",
//     points: ["DCS/PLC retrofits", "Load shedding logic", "Energy monitoring"],
//     image: "/images/industries/power.jpg",
//     icon: "monitor",
//     order: 2,
//   },
//   {
//     slug: "water",
//     title: "Water & Wastewater",
//     summary: "Networked pumping, WTP/ETP automation, and remote telemetry built to last.",
//     points: ["Pump sequencing", "Telemetry & RTU", "KPI dashboards"],
//     image: "/images/industries/water.jpg",
//     icon: "cpu",
//     order: 3,
//   },
// ];

// const iconMap = {
//   wrench: Wrench,
//   cpu: Cpu,
//   monitor: MonitorCog,
//   graduation: GraduationCap,
//   shield: ShieldCheck,
//   package: Package,
// };

// function SectionRow({ section, active, onToggle }) {
//   const Icon = iconMap[section.icon?.toLowerCase?.()] || ShieldCheck;
//   return (
//     <div
//       className={`rounded-2xl border transition-colors ${
//         active ? "border-gray-300 bg-white" : "border-gray-200 bg-white"
//       }`}
//     >
//       <button
//         className="w-full flex items-start gap-3 p-4 text-left"
//         onClick={() => onToggle(section.slug)}
//         aria-expanded={active}
//         aria-controls={`panel-${section.slug}`}
//       >
//         <div className="mt-0.5">
//           {active ? (
//             <ChevronDown className="h-5 w-5 text-gray-600" />
//           ) : (
//             <ChevronRight className="h-5 w-5 text-gray-500" />
//           )}
//         </div>
//         <Icon className="h-5 w-5 text-gray-800" />
//         <div>
//           <div className="font-semibold text-gray-900">{section.title}</div>
//           {section.summary && (
//             <p className="mt-1 text-sm text-gray-700">{section.summary}</p>
//           )}
//         </div>
//       </button>
//       <div
//         id={`panel-${section.slug}`}
//         className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out ${
//           active ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
//         }`}
//       >
//         <div className="min-h-0">
//           {section.points?.length ? (
//             <ul className="px-4 pb-4 list-disc pl-9 text-sm text-gray-700 space-y-1">
//               {section.points.map((p) => (
//                 <li key={p}>{p}</li>
//               ))}
//             </ul>
//           ) : null}
//           {section.body ? (
//             <p className="px-4 pb-4 text-sm text-gray-700">{section.body}</p>
//           ) : null}
//         </div>
//       </div>
//     </div>
//   );
// }

// function ScrollStory({ apiUrl = "/api/industries/sections" }) {
//   const [sections, setSections] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeSlug, setActiveSlug] = useState(null);
//   const rightRef = useRef(null);

//   useEffect(() => {
//     let mounted = true;
//     (async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const res = await fetch(apiUrl, { headers: { accept: "application/json" } });
//         if (!res.ok) throw new Error(`HTTP ${res.status}`);
//         const data = await res.json();
//         const arr = Array.isArray(data) ? data : data?.items || [];
//         const cleaned = arr
//           .map((s, idx) => ({
//             slug: s.slug || `sec-${idx}`,
//             title: s.title || s.name || `Section ${idx + 1}`,
//             summary: s.summary || s.tagline || "",
//             body: s.description || s.body || "",
//             points: s.points || s.features || [],
//             image: s.image || s.artwork || s.logo || "",
//             order: typeof s.order === "number" ? s.order : idx,
//             icon: s.icon || "shield",
//           }))
//           .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
//         if (mounted) {
//           const usable = cleaned.length ? cleaned : fallbackSections;
//           setSections(usable);
//           setActiveSlug(usable[0]?.slug || null);
//         }
//       } catch (e) {
//         if (mounted) {
//           setSections(fallbackSections);
//           setActiveSlug(fallbackSections[0]?.slug || null);
//           setError(String(e?.message || e));
//         }
//       } finally {
//         mounted && setLoading(false);
//       }
//     })();
//     return () => {
//       mounted = false;
//     };
//   }, [apiUrl]);

//   // Keep right image in sync when user scrolls the left side
//   const itemRefs = useRef({});
//   useEffect(() => {
//     const elts = Object.values(itemRefs.current);
//     if (!elts.length) return;
//     const ob = new IntersectionObserver(
//       (entries) => {
//         const visible = entries
//           .filter((e) => e.isIntersecting)
//           .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
//         if (visible?.target?.dataset?.slug) {
//           setActiveSlug(visible.target.dataset.slug);
//         }
//       },
//       { root: null, threshold: [0.25, 0.5, 0.75] }
//     );
//     elts.forEach((el) => ob.observe(el));
//     return () => ob.disconnect();
//   }, [sections.length]);

//   const active = useMemo(() => sections.find((s) => s.slug === activeSlug), [
//     sections,
//     activeSlug,
//   ]);

//   return (
//     <section className="py-14">
//       <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
//         <div className="flex items-end justify-between gap-4">
//           <div>
//             <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
//               Industries (story scroll)
//             </h2>
//             <p className="mt-2 text-gray-700">
//               API-powered sections with left accordion and synced artwork.
//             </p>
//           </div>
//           {error && (
//             <span className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-3 py-1">
//               Fallback in use
//             </span>
//           )}
//         </div>

//         <div className="mt-6 grid grid-cols-1 md:grid-cols-[minmax(0,560px)_minmax(0,1fr)] gap-6">
//           {/* Left: expandable list */}
//           <div className="md:pr-2 md:sticky md:top-24 max-h-[70vh] overflow-auto rounded-2xl border border-gray-100 bg-white p-3">
//             {loading ? (
//               <div className="p-4 text-sm text-gray-600">Loading…</div>
//             ) : (
//               <div className="space-y-3">
//                 {sections.map((s) => (
//                   <div
//                     key={s.slug}
//                     ref={(el) => {
//                       if (el) itemRefs.current[s.slug] = el;
//                     }}
//                     data-slug={s.slug}
//                   >
//                     <SectionRow
//                       section={s}
//                       active={activeSlug === s.slug}
//                       onToggle={(slug) =>
//                         setActiveSlug((prev) => (prev === slug ? prev : slug))
//                       }
//                     />
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Right: image panel */}
//           <div ref={rightRef} className="rounded-2xl overflow-hidden border border-gray-100 bg-white">
//             {active?.image ? (
//               <div className="aspect-[16/10] w-full bg-gray-50">
//                 {/* eslint-disable-next-line @next/next/no-img-element */}
//                 <img
//                   src={active.image}
//                   alt={active.title}
//                   className="w-full h-full object-cover"
//                   loading="eager"
//                 />
//               </div>
//             ) : (
//               <div className="aspect-[16/10] w-full grid place-items-center bg-gray-50 text-gray-500">
//                 <div className="flex items-center gap-2 text-sm">
//                   <ImageOff className="h-4 w-4" /> No artwork available
//                 </div>
//               </div>
//             )}
//             <div className="p-5">
//               <div className="text-lg font-semibold text-gray-900">{active?.title}</div>
//               {active?.summary && (
//                 <p className="mt-1 text-sm text-gray-700">{active.summary}</p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// // --- Your existing small card ---
// const Card = ({ icon: Icon, title, points }) => (
//   <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm reveal-y">
//     <div className="flex items-start gap-3">
//       <Icon className="h-5 w-5 text-gray-800" />
//       <div>
//         <div className="font-semibold text-gray-900">{title}</div>
//         <ul className="mt-2 text-sm text-gray-700 list-disc pl-5 space-y-1">
//           {points.map((p) => (
//             <li key={p}>{p}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   </div>
// );






// export default function Solutions() {
//   return (
//     <div className="min-h-screen bg-white">
//       {/* Hero */}
//       <section className="relative pt-28 pb-10 overflow-hidden">
//         <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1000px_600px_at_30%_-10%,rgba(99,102,241,.22),transparent_60%),radial-gradient(1000px_600px_at_80%_120%,rgba(59,130,246,.18),transparent_60%)]" />
//         <div className="relative mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
//           <h1 className="text-[34px] leading-[1.07] sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 text-balance">
//             Solutions that feel simple
//           </h1>
//           <p className="mt-3 sm:mt-4 max-w-prose text-base sm:text-lg text-gray-700">
//             From engineering to spares—one stack, designed for reliability and calm operations.
//           </p>
//         </div>
//       </section>

//       {/* NEW: Scroll storytelling (can replace gallery above if you prefer) */}
//       <ScrollStory apiUrl="/api/industries/sections" />

//     </div>
//   );
// }
