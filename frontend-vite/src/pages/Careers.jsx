import React, { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import useReveal from "../hooks/useReveal";

const Careers = () => {
  const hero = useReveal(0.1);
  useEffect(() => window.scrollTo(0, 0), []);

  const roles = [
    { title: "Automation Engineer (PCS 7)", location: "Navi Mumbai", type: "Full-time" },
    { title: "SCADA/HMI Developer", location: "Remote/Hybrid", type: "Full-time" },
    { title: "OPC Connectivity Specialist", location: "Navi Mumbai", type: "Contract" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="pt-32 pb-10 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={hero.ref} className={`transition-all duration-700 ${hero.show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
            <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 group transition-colors">
              <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
              Back to Home
            </Link>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">Careers</h1>
            <p className="mt-3 text-lg text-gray-600 max-w-3xl">Join us to build dependable digital systems for process industries.</p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:gap-6 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
            {roles.map((r) => (
              <div key={r.title} className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
                <div className="text-lg font-semibold text-gray-900">{r.title}</div>
                <div className="mt-1 text-sm text-gray-600">{r.location} · {r.type}</div>
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

export default Careers;


