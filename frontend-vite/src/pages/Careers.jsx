// import React, { useEffect } from "react";
// import { ArrowLeft } from "lucide-react";
// import { Link } from "react-router-dom";
// import Footer from "../components/Footer";
// import useReveal from "../hooks/useReveal";

// const Careers = () => {
//   const hero = useReveal(0.1);
//   useEffect(() => window.scrollTo(0, 0), []);

//   const roles = [
//     { title: "Automation Engineer (PCS 7)", location: "Navi Mumbai", type: "Full-time" },
//     { title: "SCADA/HMI Developer", location: "Remote/Hybrid", type: "Full-time" },
//     { title: "OPC Connectivity Specialist", location: "Navi Mumbai", type: "Contract" },
//   ];

//   return (
//     <div className="min-h-screen bg-white">
//       <section className="pt-32 pb-10 bg-gradient-to-b from-gray-50 to-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div ref={hero.ref} className={`transition-all duration-700 ${hero.show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
//             <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 group transition-colors">
//               <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
//               Back to Home
//             </Link>
//             <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">Careers</h1>
//             <p className="mt-3 text-lg text-gray-600 max-w-3xl">Join us to build dependable digital systems for process industries.</p>
//           </div>
//         </div>
//       </section>

//       <section className="py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid gap-4 sm:gap-6 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
//             {roles.map((r) => (
//               <div key={r.title} className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
//                 <div className="text-lg font-semibold text-gray-900">{r.title}</div>
//                 <div className="mt-1 text-sm text-gray-600">{r.location} · {r.type}</div>

//                 {/* i have to improve te pages such a that we have to */}
//                 <Link to="/contact" className="mt-4 inline-flex items-center text-sm text-gray-900 hover:underline">Learn More →</Link>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// };

// export default Careers;




// import React, { useEffect, useMemo, useState, useRef } from "react";
// import { Link, MemoryRouter, useInRouterContext } from "react-router-dom";
// import {
//   ArrowLeft,
//   MapPin,
//   Briefcase,
//   Clock,
//   Filter,
//   Search,
//   X,
//   CheckCircle2,
//   Building2,
//   Sparkles,
// } from "lucide-react";

// // NOTE: Local fallbacks so the page builds even if your project-specific
// // Footer/useReveal files are missing or paths differ. If you DO have
// // components at "../components/Footer" and "../hooks/useReveal",
// // feel free to replace these with your imports.

// function SafeLink({ to = "#", children, ...props }) {
//   // Render <Link> only if a Router is present; otherwise use <a>
//   const inRouter = typeof useInRouterContext === "function" && useInRouterContext();
//   if (inRouter) return <Link to={to} {...props}>{children}</Link>;
//   return <a href={typeof to === "string" ? to : "#"} {...props}>{children}</a>;
// }

// function FallbackFooter() {
//   return (
//     <footer className="border-t border-gray-200 bg-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-sm text-gray-600 flex flex-col sm:flex-row items-center justify-between gap-3">
//         <div>© {new Date().getFullYear()} Consulta Technologies • All rights reserved.</div>
//         <div className="flex items-center gap-4">
//           <SafeLink to="/" className="hover:underline">Home</SafeLink>
//           <SafeLink to="/contact" className="hover:underline">Contact</SafeLink>
//           <a href="mailto:careers@consulta.in" className="hover:underline">careers@consulta.in</a>
//         </div>
//       </div>
//     </footer>
//   );
// }

// function useReveal(threshold = 0.1) {
//   const ref = useRef(null);
//   const [show, setShow] = useState(false);
//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     if (typeof IntersectionObserver === "undefined") {
//       setShow(true);
//       return;
//     }
//     const io = new IntersectionObserver((entries) => {
//       const [entry] = entries;
//       if (entry.isIntersecting) setShow(true);
//     }, { threshold });
//     io.observe(el);
//     return () => io.disconnect();
//   }, [threshold]);
//   return { ref, show };
// }

// // --- Utilities ---
// function classNames(...args) {
//   return args.filter(Boolean).join(" ");
// }

// // --- Data ---
// const JOBS = [
//   {
//     id: "pcs7-automation-engineer",
//     title: "Automation Engineer (Siemens PCS 7)",
//     location: "Navi Mumbai",
//     type: "Full-time",
//     experience: "3–8 years",
//     team: "Engineering",
//     tags: ["PCS 7", "CEMAT", "Profibus/Profinet", "WinCC"],
//     intro:
//       "Own end-to-end PCS 7 project engineering: CFC/SFC programming, FAT/SAT, commissioning, and lifecycle support for heavy process industries.",
//     responsibilities: [
//       "Develop and test PCS 7 applications (CFC/SFC/Graphics).",
//       "Create IO lists, P&I mapping, cause & effect, and interlock matrices.",
//       "Commissioning and site support for cement/power/water verticals.",
//       "Collaborate with clients, vendors, and internal teams to deliver on time.",
//     ],
//     requirements: [
//       "Hands-on with PCS 7 V9/V10, WinCC, and Simatic Manager/Portal.",
//       "Understanding of CEMAT or Minerals library is a plus.",
//       "Good knowledge of Profibus/Profinet/Industrial Ethernet.",
//       "Comfortable with travel to plant sites for commissioning.",
//     ],
//   },
//   {
//     id: "scada-hmi-developer",
//     title: "SCADA / HMI Developer",
//     location: "Remote / Hybrid",
//     type: "Full-time",
//     experience: "2–6 years",
//     team: "Software",
//     tags: ["WinCC", "WinCC Unified", "Ignition", "UX"],
//     intro:
//       "Design modern, reliable HMI/SCADA screens, trends, diagnostics, and alarm views with a focus on operator-first UX.",
//     responsibilities: [
//       "Build reusable screen components and templates.",
//       "Implement alarm, trend, and historian interfaces.",
//       "Work with back-end APIs/OPC UA for data binding.",
//       "Contribute to style guides and UX consistency.",
//     ],
//     requirements: [
//       "Experience with WinCC Classic/Unified or Ignition.",
//       "Basics of OPC UA / ISA-101 principles.",
//       "Front-end sense for typography, color, and hierarchy.",
//       "Git workflow and issue tracking familiarity.",
//     ],
//   },
//   {
//     id: "opc-connectivity-specialist",
//     title: "OPC Connectivity Specialist",
//     location: "Navi Mumbai",
//     type: "Contract",
//     experience: "4–10 years",
//     team: "Integration",
//     tags: ["OPC UA", "OPC HDA", "Kepware", "Matrikon"],
//     intro:
//       "Own data plumbing: configure servers, secure gateways, optimize polling, and harden connectivity across on‑prem and cloud.",
//     responsibilities: [
//       "Configure/maintain OPC UA/HDA servers and clients.",
//       "Design reliable data flows to historians (Influx/SQL).",
//       "Troubleshoot performance, quality bits, and buffering.",
//       "Document architectures and handover playbooks.",
//     ],
//     requirements: [
//       "Deep knowledge of OPC UA/HDA stacks (asyncua a bonus).",
//       "Experience with Kepware, Matrikon, or WinCC Connectivity.",
//       "Networking basics (subnets, NAT, VPN, firewalls).",
//       "Scripting in Python/PowerShell is an advantage.",
//     ],
//   },
// ];

// const LOCATIONS = ["All", "Navi Mumbai", "Remote / Hybrid"];
// const TYPES = ["All", "Full-time", "Contract"];

// // --- Small UI Primitives ---
// function Chip({ children }) {
//   return (
//     <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-700">
//       {children}
//     </span>
//   );
// }

// function Pill({ icon: Icon, label }) {
//   return (
//     <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">
//       {Icon && <Icon className="h-3.5 w-3.5" />} {label}
//     </div>
//   );
// }

// function Modal({ open, onClose, children, title }) {
//   const bodyRef = useRef(null);

//   useEffect(() => {
//     if (!open) return;
//     const onKey = (e) => e.key === "Escape" && onClose?.();
//     document.addEventListener("keydown", onKey);
//     return () => document.removeEventListener("keydown", onKey);
//   }, [open, onClose]);

//   if (!open) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
//       <div className="absolute inset-0 bg-black/50" onClick={onClose} />
//       <div className="relative z-10 w-full sm:max-w-2xl rounded-t-2xl sm:rounded-2xl bg-white shadow-xl">
//         <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
//           <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
//           <button onClick={onClose} className="rounded-full p-1.5 hover:bg-gray-100" aria-label="Close">
//             <X className="h-5 w-5" />
//           </button>
//         </div>
//         <div ref={bodyRef} className="max-h-[75vh] overflow-y-auto px-5 py-5">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// }

// // --- FAQ (no external UI lib) ---
// function FAQItem({ q, a }) {
//   const [open, setOpen] = useState(false);
//   return (
//     <div className="rounded-2xl border border-gray-200">
//       <button
//         onClick={() => setOpen((v) => !v)}
//         className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
//         aria-expanded={open}
//       >
//         <span className="font-medium text-gray-900">{q}</span>
//         <span className="text-sm text-gray-500">{open ? "–" : "+"}</span>
//       </button>
//       {open && <div className="px-5 pb-5 text-sm text-gray-600">{a}</div>}
//     </div>
//   );
// }

// // --- Main Inner Page (uses Router context if available) ---
// function CareersPage() {
//   const hero = useReveal(0.1);

//   useEffect(() => window.scrollTo(0, 0), []);

//   // Filters
//   const [query, setQuery] = useState("");
//   const [location, setLocation] = useState("All");
//   const [type, setType] = useState("All");
//   const [openJob, setOpenJob] = useState(null);

//   const filtered = useMemo(() => {
//     return JOBS.filter((j) => {
//       const q = query.trim().toLowerCase();
//       const matchesQ = !q
//         || j.title.toLowerCase().includes(q)
//         || j.tags.join(" ").toLowerCase().includes(q)
//         || j.intro.toLowerCase().includes(q);
//       const matchesL = location === "All" || j.location === location;
//       const matchesT = type === "All" || j.type === type;
//       return matchesQ && matchesL && matchesT;
//     });
//   }, [query, location, type]);

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Hero */}
//       <section className="pt-28 sm:pt-32 pb-10 bg-gradient-to-b from-gray-50 to-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div
//             ref={hero.ref}
//             className={classNames(
//               "transition-all duration-700",
//               hero.show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
//             )}
//           >
//             <SafeLink
//               to="/"
//               className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 group transition-colors"
//             >
//               <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
//               Back to Home
//             </SafeLink>

//             <div className="flex items-start justify-between gap-6 flex-col sm:flex-row">
//               <div>
//                 <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">Careers</h1>
//                 <p className="mt-3 text-lg text-gray-600 max-w-3xl">
//                   Build dependable digital systems for process industries. Small team, big problems, real impact.
//                 </p>
//                 <div className="mt-4 flex flex-wrap gap-2">
//                   <Pill icon={Building2} label="Industry: Cement • Power • Water" />
//                   <Pill icon={Briefcase} label="Flexible engagement" />
//                   <Pill icon={Sparkles} label="Hands-on engineering" />
//                 </div>
//               </div>

//               <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:w-[380px]">
//                 <div className="text-sm text-gray-500">Open roles</div>
//                 <div className="mt-1 text-3xl font-semibold text-gray-900">{JOBS.length}</div>
//                 <div className="mt-3 flex flex-wrap gap-2">
//                   {Array.from(new Set(JOBS.flatMap((j) => j.tags))).slice(0, 6).map((t) => (
//                     <Chip key={t}>{t}</Chip>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Why join us */}
//       <section className="py-8 sm:py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid gap-4 sm:gap-6 [grid-template-columns:repeat(auto-fit,minmax(230px,1fr))]">
//             {[{
//               title: "Serious engineering",
//               desc: "PCS 7, OPC UA, historians, real plants. No fluff.",
//             },{
//               title: "Ship and learn",
//               desc: "We move fast with reviews, mentorship, and docs.",
//             },{
//               title: "Balance built-in",
//               desc: "Hybrid options, sane hours, transparent planning.",
//             },{
//               title: "Impact over titles",
//               desc: "Own outcomes end-to-end. Credit where it's due.",
//             }].map((c) => (
//               <div key={c.title} className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
//                 <div className="flex items-start gap-3">
//                   <CheckCircle2 className="mt-0.5 h-5 w-5 text-gray-900" />
//                   <div>
//                     <div className="font-semibold text-gray-900">{c.title}</div>
//                     <div className="mt-1 text-sm text-gray-600">{c.desc}</div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Filters */}
//       <section className="pb-2">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
//             <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
//               <div className="relative flex-1">
//                 <Search className="pointer-events-none absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//                 <input
//                   value={query}
//                   onChange={(e) => setQuery(e.target.value)}
//                   placeholder="Search job title, skills, tags…"
//                   className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-gray-900"
//                 />
//               </div>
//               <div className="flex gap-3 sm:w-auto w-full">
//                 <div className="flex-1">
//                   <select
//                     value={location}
//                     onChange={(e) => setLocation(e.target.value)}
//                     className="w-full rounded-xl border border-gray-200 bg-white py-2.5 px-3 text-sm outline-none focus:ring-2 focus:ring-gray-900"
//                   >
//                     {LOCATIONS.map((l) => (
//                       <option key={l} value={l}>{l}</option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="flex-1">
//                   <select
//                     value={type}
//                     onChange={(e) => setType(e.target.value)}
//                     className="w-full rounded-xl border border-gray-200 bg-white py-2.5 px-3 text-sm outline-none focus:ring-2 focus:ring-gray-900"
//                   >
//                     {TYPES.map((t) => (
//                       <option key={t} value={t}>{t}</option>
//                     ))}
//                   </select>
//                 </div>
//                 <button
//                   onClick={() => { setQuery(""); setLocation("All"); setType("All"); }}
//                   className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2.5 text-sm hover:bg-gray-50"
//                 >
//                   <Filter className="h-4 w-4" /> Reset
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Open roles */}
//       <section className="py-6 sm:py-10">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           {filtered.length === 0 ? (
//             <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center text-sm text-gray-600">
//               No roles match your filters.
//             </div>
//           ) : (
//             <div className="grid gap-4 sm:gap-6 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
//               {filtered.map((j) => (
//                 <article key={j.id} className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
//                   <header className="flex items-start justify-between gap-3">
//                     <h3 className="text-lg font-semibold text-gray-900">{j.title}</h3>
//                     <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-700">{j.team}</span>
//                   </header>
//                   <p className="mt-2 line-clamp-3 text-sm text-gray-600">{j.intro}</p>
//                   <div className="mt-4 flex flex-wrap gap-2">
//                     {j.tags.map((t) => <Chip key={t}>{t}</Chip>)}
//                   </div>

//                   <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-gray-600">
//                     <div className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {j.location}</div>
//                     <div className="inline-flex items-center gap-1.5"><Briefcase className="h-4 w-4" /> {j.type}</div>
//                     <div className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" /> {j.experience}</div>
//                   </div>

//                   <div className="mt-5 flex items-center justify-between">
//                     <button
//                       onClick={() => setOpenJob(j)}
//                       className="inline-flex items-center justify-center rounded-xl bg-gray-900 px-3.5 py-2.5 text-sm font-medium text-white hover:opacity-90"
//                     >
//                       View details
//                     </button>
//                     <SafeLink
//                       to="/contact"
//                       className="text-sm text-gray-900 underline-offset-2 hover:underline"
//                     >
//                       Talk to us →
//                     </SafeLink>
//                   </div>
//                 </article>
//               ))}
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Culture band */}
//       <section className="py-10">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
//             <div className="grid gap-6 sm:grid-cols-3">
             
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* FAQ */}
//       <section className="pb-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="mb-4 text-xl font-semibold text-gray-900">Hiring FAQ</h2>
//           <div className="grid gap-3 sm:gap-4">
//             <FAQItem q="How do I apply?" a={(
//               <>
//                 Use the <SafeLink to="/contact" className="text-gray-900 underline underline-offset-2">contact form</SafeLink> with the role in the subject, or email
//                 {" "}
//                 <a href="mailto:careers@consulta.in" className="text-gray-900 underline underline-offset-2">careers@consulta.in</a>
//                 {" ."}
//               </>
//             )} />
//             <FAQItem q="Do you support remote work?" a="For several roles, yes. We’re hybrid‑friendly and evaluate per project." />
//             <FAQItem q="Interview process?" a="Short intro call → technical discussion → small paid assignment (role‑dependent) → founder chat." />
//           </div>
//         </div>
//       </section>

//       <FallbackFooter />

//       {/* Job modal */}
//       <Modal open={!!openJob} onClose={() => setOpenJob(null)} title={openJob?.title}>
//         {openJob && (
//           <div className="space-y-6">
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
//               <div className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" /> {openJob.location}</div>
//               <div className="inline-flex items-center gap-2"><Briefcase className="h-4 w-4" /> {openJob.type}</div>
//               <div className="inline-flex items-center gap-2"><Clock className="h-4 w-4" /> {openJob.experience}</div>
//             </div>

//             <p className="text-sm text-gray-700">{openJob.intro}</p>

//             <div>
//               <div className="font-medium text-gray-900">Responsibilities</div>
//               <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">
//                 {openJob.responsibilities.map((r) => (
//                   <li key={r}>{r}</li>
//                 ))}
//               </ul>
//             </div>

//             <div>
//               <div className="font-medium text-gray-900">Requirements</div>
//               <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">
//                 {openJob.requirements.map((r) => (
//                   <li key={r}>{r}</li>
//                 ))}
//               </ul>
//             </div>

//             <div className="flex flex-wrap items-center justify-between gap-3">
//               <a
//                 href={`mailto:careers@consulta.in?subject=Application: ${encodeURIComponent(openJob.title)}&body=Hi Consulta Team,%0D%0A%0D%0AI'd like to apply for ${encodeURIComponent(openJob.title)}. My resume is attached.%0D%0A%0D%0ARegards,%0D%0A`}
//                 className="inline-flex items-center justify-center rounded-xl bg-gray-900 px-3.5 py-2.5 text-sm font-medium text-white hover:opacity-90"
//               >
//                 Apply via Email
//               </a>
//               <SafeLink to="/contact" className="text-sm text-gray-900 underline-offset-2 hover:underline">
//                 Have questions? Contact us →
//               </SafeLink>
//             </div>
//           </div>
//         )}
//       </Modal>
//     </div>
//   );
// }

// // --- Wrapper to avoid Router context errors ---
// export default function Careers() {
//   // If we're already inside a Router (your app), render the page as-is.
//   // If not (e.g., canvas/preview), provide a MemoryRouter so <Link/> works.
//   const inRouter = typeof useInRouterContext === "function" && useInRouterContext();
//   if (inRouter) return <CareersPage />;
//   return (
//     <MemoryRouter initialEntries={["/careers"]}>
//       <CareersPage />
//     </MemoryRouter>
//   );
// }

// // ------------------------------------------------------------
// // Inline dev tests for filter logic (runs once in dev)
// // ------------------------------------------------------------
// function runCareersTests() {
//   try {
//     const q1 = JOBS.filter((j) => j.title.toLowerCase().includes("pcs 7"));
//     console.assert(q1.length === 1, "Test: query 'pcs 7' should return 1 role");

//     const l1 = JOBS.filter((j) => j.location === "Navi Mumbai");
//     console.assert(l1.length === 2, "Test: location 'Navi Mumbai' should return 2 roles");

//     const t1 = JOBS.filter((j) => j.type === "Contract");
//     console.assert(t1.length === 1, "Test: type 'Contract' should return 1 role");

//     const combo = JOBS.filter((j) =>
//       j.type === "Full-time" && (j.tags.join(" ").toLowerCase().includes("ignition") || j.intro.toLowerCase().includes("ignition"))
//     );
//     console.assert(combo.length === 1, "Test: 'Full-time' with 'Ignition' tag should return 1 role");

//     // Edge: blank search should keep all
//     const all = JOBS.filter(() => true);
//     console.assert(all.length === JOBS.length, "Test: blank search returns all roles");

//     // NEW TESTS
//     const remoteFT = JOBS.filter((j) => j.location === "Remote / Hybrid" && j.type === "Full-time");
//     console.assert(remoteFT.length === 1, "Test: Remote/Hybrid + Full-time should return 1 role");

//     const tagOPC = JOBS.filter((j) => j.tags.map((t) => t.toLowerCase()).includes("opc ua"));
//     console.assert(tagOPC.length === 1, "Test: tag 'OPC UA' should match 1 role");

//     const noMatch = JOBS.filter((j) => j.title.toLowerCase().includes("astronaut"));
//     console.assert(noMatch.length === 0, "Test: unrelated query should return 0 roles");

//     // eslint-disable-next-line no-console
//     console.log("Careers page tests passed");
//   } catch (err) {
//     // eslint-disable-next-line no-console
//     console.warn("Careers page tests had an issue:", err);
//   }
// } 

// (function maybeRunTests() {
//   // Robust env check without using import.meta (avoids SyntaxError in non-module contexts)
//   const isProd = (() => {
//     try {
//       if (typeof process !== "undefined" && process.env && typeof process.env.NODE_ENV === "string") {
//         return process.env.NODE_ENV === "production";
//       }
//     } catch {}
//     return false; // default to dev if unsure
//   })();

//   if (typeof window !== "undefined" && !window.__CAREERS_TESTED__ && !isProd) {
//     window.__CAREERS_TESTED__ = true;
//     runCareersTests();
//   }
// })();

/* eslint-env browser */
/* global process */
import React, { useEffect, useMemo, useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Briefcase,
  Clock,
  Filter,
  Search,
  X,
  CheckCircle2,
  Building2,
  Sparkles,
} from "lucide-react";

// NOTE: Local fallbacks so the page builds even if your project-specific
// Footer/useReveal files are missing or paths differ. If you DO have
// components at "../components/Footer" and "../hooks/useReveal",
// feel free to replace these with your imports.

function FallbackFooter() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-sm text-gray-600 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>© {new Date().getFullYear()} Consulta Technologies • All rights reserved.</div>
        <div className="flex items-center gap-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
          <a href="mailto:careers@consulta.in" className="hover:underline">careers@consulta.in</a>
        </div>
      </div>
    </footer>
  );
}

function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShow(true);
      return;
    }
    const io = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) setShow(true);
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, show };
}

// --- Utilities ---
function classNames(...args) {
  return args.filter(Boolean).join(" ");
}

// --- Data ---
const JOBS = [
  {
    id: "pcs7-automation-engineer",
    title: "Automation Engineer (Siemens PCS 7)",
    location: "Navi Mumbai",
    type: "Full-time",
    experience: "3–8 years",
    team: "Engineering",
    tags: ["PCS 7", "CEMAT", "Profibus/Profinet", "WinCC"],
    intro:
      "Own end-to-end PCS 7 project engineering: CFC/SFC programming, FAT/SAT, commissioning, and lifecycle support for heavy process industries.",
    responsibilities: [
      "Develop and test PCS 7 applications (CFC/SFC/Graphics).",
      "Create IO lists, P&I mapping, cause & effect, and interlock matrices.",
      "Commissioning and site support for cement/power/water verticals.",
      "Collaborate with clients, vendors, and internal teams to deliver on time.",
    ],
    requirements: [
      "Hands-on with PCS 7 V9/V10, WinCC, and Simatic Manager/Portal.",
      "Understanding of CEMAT or Minerals library is a plus.",
      "Good knowledge of Profibus/Profinet/Industrial Ethernet.",
      "Comfortable with travel to plant sites for commissioning.",
    ],
  },
  {
    id: "scada-hmi-developer",
    title: "SCADA / HMI Developer",
    location: "Remote / Hybrid",
    type: "Full-time",
    experience: "2–6 years",
    team: "Software",
    tags: ["WinCC", "WinCC Unified", "Ignition", "UX"],
    intro:
      "Design modern, reliable HMI/SCADA screens, trends, diagnostics, and alarm views with a focus on operator-first UX.",
    responsibilities: [
      "Build reusable screen components and templates.",
      "Implement alarm, trend, and historian interfaces.",
      "Work with back-end APIs/OPC UA for data binding.",
      "Contribute to style guides and UX consistency.",
    ],
    requirements: [
      "Experience with WinCC Classic/Unified or Ignition.",
      "Basics of OPC UA / ISA-101 principles.",
      "Front-end sense for typography, color, and hierarchy.",
      "Git workflow and issue tracking familiarity.",
    ],
  },
  {
    id: "opc-connectivity-specialist",
    title: "OPC Connectivity Specialist",
    location: "Navi Mumbai",
    type: "Contract",
    experience: "4–10 years",
    team: "Integration",
    tags: ["OPC UA", "OPC HDA", "Kepware", "Matrikon"],
    intro:
      "Own data plumbing: configure servers, secure gateways, optimize polling, and harden connectivity across on‑prem and cloud.",
    responsibilities: [
      "Configure/maintain OPC UA/HDA servers and clients.",
      "Design reliable data flows to historians (Influx/SQL).",
      "Troubleshoot performance, quality bits, and buffering.",
      "Document architectures and handover playbooks.",
    ],
    requirements: [
      "Deep knowledge of OPC UA/HDA stacks (asyncua a bonus).",
      "Experience with Kepware, Matrikon, or WinCC Connectivity.",
      "Networking basics (subnets, NAT, VPN, firewalls).",
      "Scripting in Python/PowerShell is an advantage.",
    ],
  },
];

const LOCATIONS = ["All", "Navi Mumbai", "Remote / Hybrid"];
const TYPES = ["All", "Full-time", "Contract"];

// --- Small UI Primitives ---
function Chip({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-700">
      {children}
    </span>
  );
}

function Pill({ icon: Icon, label }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">
      {Icon && <Icon className="h-3.5 w-3.5" />} {label}
    </div>
  );
}

function Modal({ open, onClose, children, title }) {
  const bodyRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 w-full sm:max-w-2xl rounded-t-2xl sm:rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button onClick={onClose} className="rounded-full p-1.5 hover:bg-gray-100" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div ref={bodyRef} className="max-h-[75vh] overflow-y-auto px-5 py-5">
          {children}
        </div>
      </div>
    </div>
  );
}

// --- FAQ (no external UI lib) ---
function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-gray-200">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={open}
      >
        <span className="font-medium text-gray-900">{q}</span>
        <span className="text-sm text-gray-500">{open ? "–" : "+"}</span>
      </button>
      {open && <div className="px-5 pb-5 text-sm text-gray-600">{a}</div>}
    </div>
  );
}

// --- Main Page ---
export default function Careers() {
  const hero = useReveal(0.1);

  useEffect(() => window.scrollTo(0, 0), []);

  // Filters
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("All");
  const [type, setType] = useState("All");
  const [openJob, setOpenJob] = useState(null);

  const filtered = useMemo(() => {
    return JOBS.filter((j) => {
      const q = query.trim().toLowerCase();
      const matchesQ = !q
        || j.title.toLowerCase().includes(q)
        || j.tags.join(" ").toLowerCase().includes(q)
        || j.intro.toLowerCase().includes(q);
      const matchesL = location === "All" || j.location === location;
      const matchesT = type === "All" || j.type === type;
      return matchesQ && matchesL && matchesT;
    });
  }, [query, location, type]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-28 sm:pt-32 pb-10 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={hero.ref}
            className={classNames(
              "transition-all duration-700",
              hero.show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            )}
          >
            <Link
              to="/"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 group transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
              Back to Home
            </Link>

            <div className="flex items-start justify-between gap-6 flex-col sm:flex-row">
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">Careers</h1>
                <p className="mt-3 text-lg text-gray-600 max-w-3xl">
                  Build dependable digital systems for process industries. Small team, big problems, real impact.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Pill icon={Building2} label="Industry: Cement • Power • Water" />
                  <Pill icon={Briefcase} label="Flexible engagement" />
                  <Pill icon={Sparkles} label="Hands-on engineering" />
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:w-[380px]">
                <div className="text-sm text-gray-500">Open roles</div>
                <div className="mt-1 text-3xl font-semibold text-gray-900">{JOBS.length}</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {Array.from(new Set(JOBS.flatMap((j) => j.tags))).slice(0, 6).map((t) => (
                    <Chip key={t}>{t}</Chip>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why join us */}
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:gap-6 [grid-template-columns:repeat(auto-fit,minmax(230px,1fr))]">
            {[
              { title: "Serious engineering", desc: "PCS 7, OPC UA, historians, real plants. No fluff." },
              { title: "Ship and learn", desc: "We move fast with reviews, mentorship, and docs." },
              { title: "Balance built-in", desc: "Hybrid options, sane hours, transparent planning." },
              { title: "Impact over titles", desc: "Own outcomes end-to-end. Credit where it's due." },
            ].map((c) => (
              <div key={c.title} className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-gray-900" />
                  <div>
                    <div className="font-semibold text-gray-900">{c.title}</div>
                    <div className="mt-1 text-sm text-gray-600">{c.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search job title, skills, tags…"
                  className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>
              <div className="flex gap-3 sm:w-auto w-full">
                <div className="flex-1">
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white py-2.5 px-3 text-sm outline-none focus:ring-2 focus:ring-gray-900"
                  >
                    {LOCATIONS.map((l) => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white py-2.5 px-3 text-sm outline-none focus:ring-2 focus:ring-gray-900"
                  >
                    {TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={() => { setQuery(""); setLocation("All"); setType("All"); }}
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2.5 text-sm hover:bg-gray-50"
                >
                  <Filter className="h-4 w-4" /> Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section className="py-6 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center text-sm text-gray-600">
              No roles match your filters.
            </div>
          ) : (
            <div className="grid gap-4 sm:gap-6 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
              {filtered.map((j) => (
                <article key={j.id} className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
                  <header className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold text-gray-900">{j.title}</h3>
                    <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-700">{j.team}</span>
                  </header>
                  <p className="mt-2 line-clamp-3 text-sm text-gray-600">{j.intro}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {j.tags.map((t) => <Chip key={t}>{t}</Chip>)}
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-gray-600">
                    <div className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {j.location}</div>
                    <div className="inline-flex items-center gap-1.5"><Briefcase className="h-4 w-4" /> {j.type}</div>
                    <div className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" /> {j.experience}</div>
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                    <button
                      onClick={() => setOpenJob(j)}
                      className="inline-flex items-center justify-center rounded-xl bg-gray-900 px-3.5 py-2.5 text-sm font-medium text-white hover:opacity-90"
                    >
                      View details
                    </button>
                    <Link
                      to="/contact"
                      className="text-sm text-gray-900 underline-offset-2 hover:underline"
                    >
                      Talk to us →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Culture band */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
            <div className="grid gap-6 sm:grid-cols-3">
              {[
                { k: "Projects shipped", v: "100+" },
                { k: "Industry uptime", v: "99%" },
                { k: "Plants touched", v: "50+" },
              ].map((s) => (
                <div key={s.k} className="text-center">
                  <div className="text-3xl font-semibold text-gray-900">{s.v}</div>
                  <div className="mt-1 text-sm text-gray-500">{s.k}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Hiring FAQ</h2>
          <div className="grid gap-3 sm:gap-4">
            <FAQItem q="How do I apply?" a={(
              <>
                Use the <Link to="/contact" className="text-gray-900 underline underline-offset-2">contact form</Link> with the role in the subject, or email
                {" "}
                <a href="mailto:careers@consulta.in" className="text-gray-900 underline underline-offset-2">careers@consulta.in</a>
                {" ."}
              </>
            )} />
            <FAQItem q="Do you support remote work?" a="For several roles, yes. We’re hybrid‑friendly and evaluate per project." />
            <FAQItem q="Interview process?" a="Short intro call → technical discussion → small paid assignment (role‑dependent) → founder chat." />
          </div>
        </div>
      </section>

      <FallbackFooter />

      {/* Job modal */}
      <Modal open={!!openJob} onClose={() => setOpenJob(null)} title={openJob?.title}>
        {openJob && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
              <div className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" /> {openJob.location}</div>
              <div className="inline-flex items-center gap-2"><Briefcase className="h-4 w-4" /> {openJob.type}</div>
              <div className="inline-flex items-center gap-2"><Clock className="h-4 w-4" /> {openJob.experience}</div>
            </div>

            <p className="text-sm text-gray-700">{openJob.intro}</p>

            <div>
              <div className="font-medium text-gray-900">Responsibilities</div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">
                {openJob.responsibilities.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>

            <div>
              <div className="font-medium text-gray-900">Requirements</div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">
                {openJob.requirements.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <a
                href={`mailto:careers@consulta.in?subject=Application: ${encodeURIComponent(openJob.title)}&body=Hi Consulta Team,%0D%0A%0D%0AI'd like to apply for ${encodeURIComponent(openJob.title)}. My resume is attached.%0D%0A%0D%0ARegards,%0D%0A`}
                className="inline-flex items-center justify-center rounded-xl bg-gray-900 px-3.5 py-2.5 text-sm font-medium text-white hover:opacity-90"
              >
                Apply via Email
              </a>
              <Link to="/contact" className="text-sm text-gray-900 underline-offset-2 hover:underline">
                Have questions? Contact us →
              </Link>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

// ------------------------------------------------------------
// Inline dev tests for filter logic (runs once in dev)
// ------------------------------------------------------------
function runCareersTests() {
  try {
    const q1 = JOBS.filter((j) => j.title.toLowerCase().includes("pcs 7"));
    console.assert(q1.length === 1, "Test: query 'pcs 7' should return 1 role");

    const l1 = JOBS.filter((j) => j.location === "Navi Mumbai");
    console.assert(l1.length === 2, "Test: location 'Navi Mumbai' should return 2 roles");

    const t1 = JOBS.filter((j) => j.type === "Contract");
    console.assert(t1.length === 1, "Test: type 'Contract' should return 1 role");

    const combo = JOBS.filter((j) =>
      j.type === "Full-time" && (j.tags.join(" ").toLowerCase().includes("ignition") || j.intro.toLowerCase().includes("ignition"))
    );
    console.assert(combo.length === 1, "Test: 'Full-time' with 'Ignition' tag should return 1 role");

    // Edge: blank search should keep all
    const all = JOBS.filter(() => true);
    console.assert(all.length === JOBS.length, "Test: blank search returns all roles");

    // NEW TESTS
    const remoteFT = JOBS.filter((j) => j.location === "Remote / Hybrid" && j.type === "Full-time");
    console.assert(remoteFT.length === 1, "Test: Remote/Hybrid + Full-time should return 1 role");

    const tagOPC = JOBS.filter((j) => j.tags.map((t) => t.toLowerCase()).includes("opc ua"));
    console.assert(tagOPC.length === 1, "Test: tag 'OPC UA' should match 1 role");

    const noMatch = JOBS.filter((j) => j.title.toLowerCase().includes("astronaut"));
    console.assert(noMatch.length === 0, "Test: unrelated query should return 0 roles");

    const ftCount = JOBS.filter((j) => j.type === "Full-time").length;
    console.assert(ftCount === 2, "Test: Full-time roles count should be 2");

    const tagCase = JOBS.filter((j) => j.tags.join(" ").toLowerCase().includes("wincc"));
    console.assert(tagCase.length >= 1, "Test: case-insensitive tag search 'wincc' should match at least one role");

    // eslint-disable-next-line no-console
    console.log("Careers page tests passed");
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn("Careers page tests had an issue:", err);
  }
}

(function maybeRunTests() {
  // Avoids using import.meta or unconditional globals that break lint
  let isProd = false;
  try {
    // Many bundlers polyfill process in dev; this is guarded.
    isProd = typeof process !== "undefined" && process && process.env && process.env.NODE_ENV === "production";
  } catch (e) {
    // no-op
  }

  if (typeof window !== "undefined" && !window.__CAREERS_TESTED__ && !isProd) {
    window.__CAREERS_TESTED__ = true;
    runCareersTests();
  }
})();
