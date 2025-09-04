import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  Sparkles,
  Globe,
  LineChart,
  Cpu,
  ShieldCheck,
  Users2,
  Layers,
  Wrench,
  Handshake,
} from "lucide-react";

import Footer from "../components/Footer";

// Local placeholder content — swap to CMS/JSON later if you wish
const hero = {
  titleTop: "Engineering Digital Futures",
  titleBottom: "for Process Industries",
  sub:
    "Consulta Technologies is a Siemens-centric solution partner bridging OT and IT for Cement, Power, Steel, Water, Pharma, and more.",
};

const pillars = [
  {
    icon: <Cpu className="h-5 w-5" />,
    title: "PCS 7 Expertise",
    blurb:
      "Design, commissioning, and lifecycle services for PCS 7 (CEMAT/Mining standards included).",
  },
  {
    icon: <Globe className="h-5 w-5" />,
    title: "OPC Connectivity",
    blurb:
      "OPC UA/HDA integrations, on-prem gateways, and secure cloud data pipelines.",
  },
  {
    icon: <LineChart className="h-5 w-5" />,
    title: "Analytics & Reporting",
    blurb:
      "InfluxDB/Grafana dashboards, scheduled KPIs, and long-term historian strategies.",
  },
  {
    icon: <Wrench className="h-5 w-5" />,
    title: "Optimization",
    blurb:
      "Process tuning and optimization with a safety-first approach for measurable gains.",
  },
];

const values = [
  { icon: <ShieldCheck className="h-5 w-5" />, title: "Safety First" },
  { icon: <Handshake className="h-5 w-5" />, title: "Partnership" },
  { icon: <Sparkles className="h-5 w-5" />, title: "Practical Innovation" },
  { icon: <Layers className="h-5 w-5" />, title: "Reliability" },
  { icon: <Users2 className="h-5 w-5" />, title: "Human in the Loop" },
];

const milestones = [
  { year: "2016", text: "Roots in industrial automation & PCS 7 delivery." },
  { year: "2019", text: "Expanded into OPC UA/HDA integrations and gateways." },
  { year: "2022", text: "Launched cloud logging with InfluxDB + Grafana." },
  { year: "2024", text: "Scaled multi-plant deployments and reporting engine." },
  { year: "2025", text: "Building full SaaS OPC monitoring & alerting stack." },
];

// Logo strip (re-uses your markup style)
const marqueeLogos = [
  { src: "/logos/siemens.svg", alt: "Siemens" },
  { src: "/logos/abb.svg", alt: "ABB" },
  { src: "/logos/loesche.svg", alt: "Loesche" },
  { src: "/logos/kepware.svg", alt: "Kepware" },
  { src: "/logos/matrikon.svg", alt: "Matrikon" },
  { src: "/logos/dell.svg", alt: "Dell" },
];

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  const duplicatedLogos = useMemo(
    () => [...marqueeLogos, ...marqueeLogos],
    []
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-28 sm:pt-32 pb-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={`transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            <Link
              to="/"
              className="group mb-8 inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to Home
            </Link>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
              {hero.titleTop}
              <br />
              <span className="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                {hero.titleBottom}
              </span>
            </h1>

            <p className="mt-5 max-w-3xl text-lg sm:text-xl text-gray-600 leading-relaxed">
              {hero.sub}
            </p>

            {/* Hero CTA */}
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/associates"
                className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm text-white transition hover:bg-gray-800"
              >
                Explore Associates <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 hover:bg-gray-50"
              >
                Get in Touch
              </Link>
            </div>

            {/* Logo marquee */}
            <div
              className={`transition-all duration-1000 ease-out delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <div className="mt-12">
                <div className="logo-marquee bg-white/60">
                  <div className="logo-track">
                    {duplicatedLogos.map((logo, i) => (
                      <img
                        key={i}
                        src={logo.src}
                        alt={logo.alt}
                        className="logo-img grayscale opacity-70 transition-all duration-300 hover:grayscale-0 hover:opacity-100 hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.replaceWith(
                            Object.assign(document.createElement("div"), {
                              className:
                                "px-4 py-2 text-xs text-gray-500 border border-gray-200 rounded-lg bg-white",
                              innerText: "Logo",
                            })
                          );
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div
              className={`transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"
              }`}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Our <span className="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">Story</span>
              </h2>
              <p className="mt-4 text-gray-700 leading-relaxed">
                We started with a simple bias: plants should be simpler to run and
                smarter to scale. Over the years, we’ve delivered PCS 7 projects,
                stitched legacy islands with OPC UA/HDA, and built a clean data path
                to the cloud. We don’t chase shiny toys; we ship reliable systems.
              </p>
              <ul className="mt-6 space-y-3 text-gray-700">
                {[
                  "End-to-end PCS 7 projects with CEMAT familiarity",
                  "OPC UA/HDA connectivity: on-prem to cloud pipelines",
                  "Historian strategies: long-term storage, clean retrieval",
                  "Grafana dashboards & scheduled reporting for the floor",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-gray-800" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Milestones */}
            <div
              className={`transition-all duration-1000 delay-150 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-3"
              }`}
            >
              <div className="relative rounded-3xl border border-gray-200 bg-white p-6">
                <h3 className="text-xl font-semibold text-gray-900">Milestones</h3>
                <div className="mt-5">
                  <ol className="relative ms-4 timeline-line">
                    {milestones.map((m, idx) => (
                      <li key={idx} className="mb-6 ms-6">
                        <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 bg-white text-[11px] font-semibold text-gray-700">
                          {m.year.slice(2)}{/* small circle label */}
                        </span>
                        <p className="text-gray-700">{m.text}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="py-14 bg-gradient-to-b from-white to-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            What <span className="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">We Do</span>
          </h2>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md hover:ring-1 hover:ring-gray-200"
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-white">
                  {p.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{p.blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Our <span className="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">Values</span>
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md hover:ring-1 hover:ring-gray-200"
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-white">
                  {v.icon}
                </div>
                <h3 className="text-base font-semibold text-gray-900">{v.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Snapshot (optional faces later) */}
      <section className="py-14 bg-gradient-to-b from-white to-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-8">
            <div className="flex-1">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                The <span className="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">Team</span>
              </h2>
              <p className="mt-4 text-gray-700 leading-relaxed">
                Real plants, real constraints, real wins. We keep teams small and senior,
                loop in specialists when needed, and stay hands-on from PLC to cloud.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {["PCS 7 / CEMAT", "OPC UA/HDA", "Historian + Dashboards", "Process Optimization"].map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-800"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="aspect-[16/10] w-full rounded-2xl bg-gradient-to-br from-gray-100 to-white grid place-items-center">
                  <Building2 className="h-12 w-12 text-gray-500" />
                </div>
                <p className="mt-4 text-sm text-gray-600">
                  Drop team photos here later or a subtle video loop of your lab/commissioning shots.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-gray-200 bg-white p-8 lg:p-12 shadow-sm text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Ready to make your plant simpler to run?
            </h3>
            <p className="mt-3 text-gray-600">
              Explore our associates or start a conversation — we’ll meet you where you are.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Link
                to="/associates"
                className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm text-white transition hover:bg-gray-800"
              >
                View Associates
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 hover:bg-gray-50"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
