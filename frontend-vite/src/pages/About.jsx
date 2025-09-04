import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ShieldCheck,
  Award,
  ExternalLink,
  FileDown,
  CheckCircle2,
  BadgeCheck,
} from "lucide-react";
import Footer from "../components/Footer";
import { certifications, solutionPartner, policies } from "../data/mock";

/* ---------- small hooks & bits ---------- */

const useReveal = (threshold = 0.2) => {
  const [show, setShow] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setShow(true),
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, show };
};

const Pill = ({ children }) => (
  <span className="pill whitespace-nowrap">{children}</span>
);

const SectionShell = ({ children, className = "" }) => (
  <section className={`py-10 sm:py-14 ${className}`}>
    <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  </section>
);

/* ---------- certification card ---------- */

const CertificationCard = ({ c }) => {
  const isImg =
    typeof c.file === "string" && /\.(png|jpe?g|webp|gif|svg)$/i.test(c.file || "");
  return (
    <article className="glass-card shine p-5 sm:p-6 h-full flex flex-col justify-between transition-transform duration-300 hover:-translate-y-0.5">
      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
        <div className="h-11 w-11 sm:h-12 sm:w-12 grid place-items-center rounded-2xl border border-gray-200 bg-white shrink-0">
          <img
            src={c.badge}
            alt={`${c.title} badge`}
            className="h-6 sm:h-7 w-auto opacity-90"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        </div>
        <div className="min-w-0">
          <div className="text-sm sm:text-[15px] font-semibold text-gray-900 truncate">
            {c.title}
          </div>
          <div className="text-xs sm:text-sm text-gray-600 truncate">{c.subtitle}</div>
        </div>
        {c.issuerLogo && (
          <div className="ml-auto h-5 sm:h-6 w-auto opacity-70 hidden xs:block">
            <img
              src={c.issuerLogo}
              alt="Issuer"
              className="h-full w-auto"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>
        )}
      </div>

      <dl className="mt-4 grid gap-1.5 text-[13px] sm:text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <dt className="text-gray-500 w-24 sm:w-28 shrink-0">Body</dt>
          <dd className="min-w-0">{c.body}</dd>
        </div>
        {c.certificateNo && (
          <div className="flex items-center gap-2">
            <dt className="text-gray-500 w-24 sm:w-28 shrink-0">Certificate #</dt>
            <dd className="min-w-0">{c.certificateNo}</dd>
          </div>
        )}
        {c.issuedOn && (
          <div className="flex items-center gap-2">
            <dt className="text-gray-500 w-24 sm:w-28 shrink-0">Issued</dt>
            <dd className="min-w-0">{c.issuedOn}</dd>
          </div>
        )}
        {c.validTill && (
          <div className="flex items-center gap-2">
            <dt className="text-gray-500 w-24 sm:w-28 shrink-0">Valid until</dt>
            <dd className="min-w-0">{c.validTill}</dd>
          </div>
        )}
      </dl>

      {isImg && (
        <a
          href={c.file}
          target="_blank"
          rel="noreferrer"
          className="mt-4 block overflow-hidden rounded-lg border border-gray-200 bg-white"
        >
          <img
            src={c.file}
            alt={`${c.title} certificate`}
            className="w-full aspect-[4/3] object-contain"
          />
        </a>
      )}

      <div className="mt-4 sm:mt-5 flex items-center justify-between">
        <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500">
          <CheckCircle2 className="h-4 w-4" />
          Verified credential
        </div>
        {c.file && (
          <a
            href={c.file}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-200"
          >
            <FileDown className="h-4 w-4" />
            View certificate
          </a>
        )}
      </div>

      {c.note && <p className="mt-3 text-xs leading-relaxed text-gray-500">{c.note}</p>}
    </article>
  );
};

/* ---------- page ---------- */

const About = () => {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY || 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const inkStyle = useMemo(() => {
    const p = Math.min(scrollY / 300, 1);
    return {
      transform: `translateY(${p * 14}px) scale(${1 + p * 0.02})`,
      opacity: 0.35 - p * 0.2,
    };
  }, [scrollY]);

  const hero = useReveal(0.1);
  const story = useReveal(0.2);
  const partner = useReveal(0.2);
  const certs = useReveal(0.2);

  useEffect(() => window.scrollTo(0, 0), []);

  

  return (
    <div className="min-h-screen bg-white">
      {/* ===== Hero header with soft ink ===== */}
      <section className="relative pt-24 sm:pt-28 lg:pt-32 pb-8 overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(120,119,198,0.14),transparent_48%)]"
          style={inkStyle}
        />
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div
            ref={hero.ref}
            className={`transition-all duration-700 ${
              hero.show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            <Link
              to="/"
              className="group mb-5 sm:mb-6 inline-flex items-center text-gray-600 transition-colors hover:text-gray-900"
            >
              <ArrowLeft className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to Home
            </Link>

            <h1 className="text-[28px] leading-[1.15] sm:text-5xl lg:text-6xl font-bold text-gray-900 text-balance">
              Engineering digital systems
              <br className="hidden sm:block" />
              <span className="sm:whitespace-nowrap">that feel simple</span>
            </h1>

            <p className="mt-3 sm:mt-4 max-w-prose text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
              Consulta bridges OT and IT for process industries—Siemens-centric delivery
              across Cement, Power, Steel, Water, Pharma and more.
            </p>

            {/* quick stats row */}
            <div className="mt-5 sm:mt-6 grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4">
              {[
                ["10+ yrs", "PCS 7 expertise"],
                ["6+", "Core industries"],
                ["24×7", "Support window"],
                ["ISO", "9001 certified"],
              ].map(([big, small]) => (
                <div key={big} className="glass-card p-3 sm:p-4 text-center">
                  <div className="text-xl sm:text-2xl font-semibold text-gray-900">{big}</div>
                  <div className="text-[11px] sm:text-xs text-gray-600">{small}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Our story — Apple-ish split block ===== */}
      <SectionShell>
        <div
          ref={story.ref}
          className={`rounded-[28px] sm:rounded-[32px] bg-gray-50/80 border border-gray-200/70 overflow-hidden transition-all duration-700 ${
            story.show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          <div className="grid lg:grid-cols-2">
            {/* Left: copy + chips */}
            <div className="p-6 sm:p-10 lg:p-14">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Our story</h2>
              <p className="mt-3 text-gray-700 leading-relaxed max-w-[62ch]">
                We’re biased toward clarity: plants should be simpler to run and smarter to scale.
                We deliver PCS 7 projects, stitch legacy islands via OPC UA/HDA, and build clean
                data paths to the cloud. No theatrics—just dependable systems.
              </p>

              <div className="mt-4 -m-1.5 flex flex-wrap">
                {[
                  "PCS 7 + CEMAT familiarity",
                  "OPC UA/HDA connectivity & gateways",
                  "Historian strategy + clean retrieval",
                  "Grafana dashboards & scheduled reporting",
                ].map((t) => (
                  <div key={t} className="m-1.5">
                    <Pill>{t}</Pill>
                  </div>
                ))}
              </div>

              {/* mini feature tiles */}
              <div className="mt-6 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
                {[
                  ["Lifecycle delivery", "PCS 7 execution, FAT/SAT, upgrades"],
                  ["Data foundations", "Tags, historians, tidy APIs"],
                  ["Reliability", "24×7 window, clear SLAs"],
                ].map(([h, d]) => (
                  <div
                    key={h}
                    className="group relative p-5 rounded-2xl border border-gray-200 bg-white hover:shadow-2xl hover:border-gray-200 transition-all duration-500"
                  >
                    <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="text-sm font-semibold text-gray-900">{h}</div>
                    <div className="mt-1 text-sm text-gray-600">{d}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: big Siemens partner logo panel */}
            <div className="relative bg-white">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(17,17,17,0.04),transparent_55%)]" />
              <div className="p-8 sm:p-12 lg:p-14 flex items-center justify-center">
                <div className="w-full max-w-[520px] rounded-3xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                  <div className="p-6 sm:p-8">
                    <img
                      src={solutionPartner.logo || "/logos/siemens.svg"}
                      alt="Siemens Solution Partner"
                      className="w-full max-w-[420px] mx-auto"
                    />
                    <div className="mt-3 text-center text-xs text-gray-600">
                      <BadgeCheck className="inline-block h-4 w-4 mr-1 align-[-2px]" />
                      {solutionPartner.validNote || "Certified partner"}
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionShell>

     

      {/* ===== Solution Partner facts & actions ===== */}
      <SectionShell className="pt-0">
        <div
          ref={partner.ref}
          className={`transition-all duration-700 ${
            partner.show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-gray-700">
                <ShieldCheck className="h-4 w-4" />
                Official Partner
              </div>

              <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                {solutionPartner.name}
              </h2>
              <p className="mt-2 sm:mt-3 text-gray-700">
                Tier: <span className="font-medium">{solutionPartner.tier}</span> · Since{" "}
                {solutionPartner.since}
              </p>

              <div className="mt-4 grid gap-2 sm:gap-3 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
                {solutionPartner.highlights.map((h) => (
                  <div key={h} className="rounded-2xl border border-gray-200 bg-white p-3 sm:p-4 text-sm text-gray-700">
                    {h}
                  </div>
                ))}
              </div>

              {solutionPartner.scope?.length > 0 && (
                <div className="mt-4 -m-1.5 flex flex-wrap">
                  {solutionPartner.scope.map((s) => (
                    <div key={s} className="m-1.5">
                      <Pill>{s}</Pill>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-5 flex flex-wrap gap-3">
                {solutionPartner.link && (
                  <a
                    href={solutionPartner.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 hover:bg-gray-50"
                  >
                    Verify Partner Page <ExternalLink className="h-4 w-4" />
                  </a>
                )}
                {solutionPartner.certificatePdf && (
                  <a
                    href={solutionPartner.certificatePdf}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 hover:bg-gray-50"
                  >
                    View Certificate (PDF) <FileDown className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>

            <div className="flex-1 w-full">
              {/* top info strip */}
              <div className="rounded-3xl border border-gray-200 bg-white p-3 sm:p-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <div className="flex-1 text-[12px] sm:text-sm text-gray-700">
                    <span className="text-gray-600">Portfolio Module:&nbsp;</span>
                    <span className="font-medium text-gray-900">{solutionPartner.certificateId}</span>
                  </div>
                  <div className="text-[12px] sm:text-sm text-gray-700 inline-flex items-center gap-2">
                    <BadgeCheck className="h-4 w-4 text-gray-700" />
                    {solutionPartner.validNote}
                  </div>
                </div>
              </div>

              {/* policies */}
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-gray-200 bg-white p-4">
                  <div className="text-sm font-semibold text-gray-900">Quality Policy</div>
                  <p className="mt-1 text-sm text-gray-700 leading-relaxed">{policies.quality}</p>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white p-4">
                  <div className="text-sm font-semibold text-gray-900">Safety Policy</div>
                  <p className="mt-1 text-sm text-gray-700 leading-relaxed">{policies.safety}</p>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-4 text-xs text-gray-500">
            Logos and trademarks belong to their respective owners and are used for identification only.
          </p>
        </div>
      </SectionShell>

      {/* ===== Certifications ===== */}
      <SectionShell className="pt-0">
        <div
          ref={certs.ref}
          className={`transition-all duration-700 ${
            certs.show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-gray-800" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
              Certifications &amp; Accreditations
            </h2>
          </div>

          <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

          <div className="mt-5 sm:mt-6 -m-1.5 flex flex-wrap">
            {["ISO 9001:2015", "ISO 14001:2015", "ISO 45001:2018", "BNF Channel Partner"].map(
              (t) => (
                <div key={t} className="m-1.5">
                  <Pill>{t}</Pill>
                </div>
              )
            )}
          </div>

          <div className="mt-6 sm:mt-8 grid gap-4 sm:gap-6 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
            {certifications.map((c) => (
              <CertificationCard key={c.id} c={c} />
            ))}
          </div>
        </div>
      </SectionShell>

      <Footer />
    </div>
  );
};

export default About;
