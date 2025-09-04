// import React, { useRef, useEffect, useState } from "react";
// import { companyAPI } from "../services/api";

// const StatsSection = () => {
//   const [isVisible, setIsVisible] = useState(false);
//   const [stats, setStats] = useState([]);
//   const [animatedStats, setAnimatedStats] = useState([]);
//   const sectionRef = useRef(null);

//   useEffect(() => {
//     companyAPI.getInfo().then((d) => {
//       const s = [
//         { number: `${d?.stats?.years_experience || 0}+`, label: "Years of Experience", description: "Delivering automation solutions" },
//         { number: `${d?.stats?.projects_completed || 0}+`, label: "Projects Completed", description: "Across various industries" },
//         { number: `${d?.stats?.expert_engineers || 0}+`, label: "Expert Engineers", description: "Skilled automation specialists" },
//         { number: `${d?.stats?.client_satisfaction || 0}%`, label: "Client Satisfaction", description: "Proven track record" },
//       ];
//       setStats(s);
//       setAnimatedStats(s.map(() => 0));
//     }).catch(() => setStats([]));

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//           // Trigger animation once stats are loaded
//           setTimeout(() => animateNumbers(), 0);
//         }
//       },
//       { threshold: 0.5 }
//     );

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }

//     return () => observer.disconnect();
//   // Intentionally no animateNumbers in deps; we run it on intersection once.
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const animateNumbers = () => {
//     stats.forEach((stat, index) => {
//       const target = parseInt(stat.number.replace(/\D/g, ""));
//       const duration = 2000;
//       const increment = target / (duration / 16);
//       let current = 0;

//       const timer = setInterval(() => {
//         current += increment;
//         if (current >= target) {
//           current = target;
//           clearInterval(timer);
//         }

//         setAnimatedStats(prev => {
//           const newStats = [...prev];
//           newStats[index] = Math.floor(current);
//           return newStats;
//         });
//       }, 16);
//     });
//   };

//   const formatNumber = (num, original) => {
//     if (original.includes("+")) return `${num}+`;
//     if (original.includes("%")) return `${num}%`;
//     return num.toString();
//   };

//   return (
//     <section ref={sectionRef} className="py-20 bg-gray-900 relative overflow-hidden">
//       {/* Background Pattern */}
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.1),transparent_50%)] pointer-events-none" />
      
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
//         <div
//           className={`transition-all duration-1000 ease-out ${
//             isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
//           }`}
//         >
//           <div className="text-center mb-16">
//             <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
//               Trusted by the industry
//             </h2>
//             <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light">
//               Our numbers speak for themselves. Years of dedication to excellence 
//               in automation solutions.
//             </p>
//           </div>

//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
//             {stats.map((stat, index) => (
//               <div
//                 key={index}
//                 className={`text-center transition-all duration-1000 ease-out delay-${index * 100} ${
//                   isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
//                 }`}
//               >
//                 <div className="relative group">
//                   <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent rounded-2xl blur-xl group-hover:from-white/10 transition-all duration-500" />
//                   <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-500 group-hover:scale-105">
//                     <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
//                       {isVisible ? formatNumber(animatedStats[index], stat.number) : "0"}
//                     </div>
//                     <div className="text-lg font-semibold text-gray-200 mb-2">
//                       {stat.label}
//                     </div>
//                     <div className="text-sm text-gray-400">
//                       {stat.description}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default StatsSection;
import React, { useRef, useEffect, useMemo, useState } from "react";
import { companyAPI } from "../services/api";

const clampInt = (v, min = 0, max = Number.MAX_SAFE_INTEGER) => {
  const n = Number.parseInt(v ?? 0, 10);
  if (!Number.isFinite(n)) return min;
  return Math.min(Math.max(n, min), max);
};

const buildStats = (d) => {
  const years = clampInt(d?.stats?.years_experience, 0);
  const projects = clampInt(d?.stats?.projects_completed, 0);
  const engineers = clampInt(d?.stats?.expert_engineers, 0);
  const satisfaction = clampInt(d?.stats?.client_satisfaction, 0, 100);

  return [
    { number: `${years}+`, raw: years, label: "Years of Experience", description: "Delivering automation solutions" },
    { number: `${projects}+`, raw: projects, label: "Projects Completed", description: "Across various industries" },
    { number: `${engineers}+`, raw: engineers, label: "Expert Engineers", description: "Skilled automation specialists" },
    { number: `${satisfaction}%`, raw: satisfaction, label: "Client Satisfaction", description: "Proven track record" },
  ];
};

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [stats, setStats] = useState([]);          // [{ number, raw, label, description }]
  const [animated, setAnimated] = useState([]);    // [0,0,0,0]
  const timersRef = useRef([]);                    // store intervals to clean up
  const sectionRef = useRef(null);

  // Fetch company info
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const d = await companyAPI.getInfo(); // ensure this returns { stats: {...} }
        if (!mounted) return;
        const s = buildStats(d);
        setStats(s);
        setAnimated(new Array(s.length).fill(0));
      } catch (err) {
        console.error("Stats fetch failed:", err);
        if (!mounted) return;
        const s = buildStats({ stats: {} }); // all zeros fallback
        setStats(s);
        setAnimated(new Array(s.length).fill(0));
      }
    })();
    return () => { mounted = false; };
  }, []);

  // Observe section visibility
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          obs.unobserve(el); // run once
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Animate when BOTH visible and stats loaded
  useEffect(() => {
    if (!isVisible || stats.length === 0) return;

    // clear any existing timers before starting
    timersRef.current.forEach((t) => clearInterval(t));
    timersRef.current = [];

    stats.forEach((s, index) => {
      const target = clampInt(s.raw, 0);
      if (target === 0) {
        setAnimated((prev) => {
          const next = [...prev];
          next[index] = 0;
          return next;
        });
        return;
      }

      const duration = 1200; // ms
      const fps = 16;        // ~60fps
      const steps = Math.max(1, Math.floor(duration / fps));
      const stepVal = Math.max(1, Math.floor(target / steps));
      let current = 0;

      const timer = setInterval(() => {
        current += stepVal;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setAnimated((prev) => {
          const next = [...prev];
          next[index] = current;
          return next;
        });
      }, fps);

      timersRef.current.push(timer);
    });

    // cleanup on unmount or re-run
    return () => {
      timersRef.current.forEach((t) => clearInterval(t));
      timersRef.current = [];
    };
  }, [isVisible, stats]);

  const renderNumber = (idx) => {
    const original = stats[idx]?.number ?? "0";
    const val = animated[idx] ?? 0;
    if (original.includes("%")) return `${val}%`;
    if (original.includes("+")) return `${val}+`;
    return String(val);
  };

  // Optional: small skeleton while loading
  const loading = useMemo(() => stats.length === 0, [stats]);

  return (
    <section ref={sectionRef} className="py-20 bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.1),transparent_50%)] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Trusted by the industry</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light">
              Our numbers speak for themselves. Years of dedication to excellence in automation solutions.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {(loading ? new Array(4).fill(null) : stats).map((stat, index) => (
              <div key={index} className={`text-center transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent rounded-2xl blur-xl group-hover:from-white/10 transition-all duration-500" />
                  <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-500 group-hover:scale-105">
                    <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                      {loading ? "0" : renderNumber(index)}
                    </div>
                    <div className="text-lg font-semibold text-gray-200 mb-2">
                      {loading ? "—" : stat.label}
                    </div>
                    <div className="text-sm text-gray-400">
                      {loading ? " " : stat.description}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default StatsSection;
