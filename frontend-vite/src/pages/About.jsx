// src/pages/About.jsx
import React, { useEffect, useState } from "react";
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

/* ---------- tiny shared bits ---------- */

const Pill = ({ children }) => (
  <span className="pill whitespace-nowrap">{children}</span>
);

// Card keeps a consistent visual rhythm on all widths
const CertificationCard = ({ c }) => {
  const isImg =
    typeof c.file === "string" &&
    /\.(png|jpe?g|webp|gif|svg)$/i.test(c.file || "");

  return (
    <article
      className="glass-card shine p-5 sm:p-6 h-full flex flex-col justify-between transition-transform duration-300 hover:-translate-y-0.5"
      role="region"
      aria-label={c.title}
    >
      {/* header */}
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
          <div className="text-xs sm:text-sm text-gray-600 truncate">
            {c.subtitle}
          </div>
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

      {/* details */}
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
            <dt className="text-gray-500 w-24 sm:w-28 shrink-0">Valid till</dt>
            <dd className="min-w-0">{c.validTill}</dd>
          </div>
        )}
      </dl>

      {/* responsive preview (only when file is an image) */}
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

      {/* footer */}
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

      {c.note && (
        <p className="mt-3 text-xs leading-relaxed text-gray-500">{c.note}</p>
      )}
    </article>
  );
};

/* ---------- page ---------- */

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <section className="bg-gradient-to-b from-gray-50 to-white pt-24 sm:pt-28 lg:pt-32 pb-6 sm:pb-8">
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div
            className={`transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2"
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
              Consulta Technologies bridges OT and IT for process industries—Siemens-centric
              delivery across Cement, Power, Steel, Water, Pharma and more. Less noise, more reliability.
            </p>

            {/* stats strip */}
            <div className="mt-5 sm:mt-6 grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4">
              {[
                ["10+ yrs", "PCS 7 expertise"],
                ["6+", "Core industries"],
                ["24×7", "Support window"],
                ["ISO", "9001 certified"],
              ].map(([big, small]) => (
                <div key={big} className="glass-card p-3 sm:p-4 text-center">
                  <div className="text-xl sm:text-2xl font-semibold text-gray-900">
                    {big}
                  </div>
                  <div className="text-[11px] sm:text-xs text-gray-600">
                    {small}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 sm:mt-6 flex flex-wrap gap-3">
              <Link
                to="/associates"
                className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-3.5 py-2 text-sm text-white transition hover:bg-gray-800"
              >
                View Associates
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-3.5 py-2 text-sm text-gray-900 hover:bg-gray-50"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="py-10 sm:py-12 lg:py-14">
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div
            className={`grid gap-6 sm:gap-10 md:grid-cols-[260px_1fr] lg:grid-cols-[280px_1fr] transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2"
            }`}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Our story
            </h2>

            <div>
              <p className="text-gray-700 leading-relaxed max-w-[68ch]">
                We started with a bias for clarity: plants should be simpler to run and
                smarter to scale. We deliver PCS 7 projects, stitch legacy islands via OPC UA/HDA,
                and build clean data paths to the cloud. No theatrics—just dependable systems.
              </p>

              <div className="mt-4 -m-1.5 flex flex-wrap">
                {[
                  "PCS 7 delivery with CEMAT familiarity",
                  "OPC UA/HDA connectivity & gateways",
                  "Historian strategy + clean retrieval",
                  "Grafana dashboards & scheduled reporting",
                ].map((tag) => (
                  <div key={tag} className="m-1.5">
                    <Pill>{tag}</Pill>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOLUTION PARTNER */}
      <section className="py-10 sm:py-12 lg:py-14 bg-gradient-to-b from-white to-gray-50">
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div
            className={`transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2"
            }`}
          >
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
              {/* left */}
              <div className="flex-1 w-full">
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
                    <div
                      key={h}
                      className="rounded-2xl border border-gray-200 bg-white p-3 sm:p-4 text-sm text-gray-700"
                    >
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

                {solutionPartner.validNote && (
                  <div className="mt-2 flex items-center gap-2 text-xs text-gray-600">
                    <BadgeCheck className="h-4 w-4" />
                    {solutionPartner.validNote}
                  </div>
                )}
              </div>

              {/* right */}
              <div className="flex-1 w-full">
                <div className="glass-card p-5 sm:p-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={solutionPartner.logo || "/logos/siemens.svg"}
                      alt="Solution Partner Logo"
                      className="h-9 sm:h-10 w-auto opacity-90"
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                    <div className="ml-auto text-[11px] sm:text-xs text-gray-600">
                      Portfolio Module:{" "}
                      <span className="font-medium">
                        {solutionPartner.certificateId}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-2 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
                    {solutionPartner.highlights.map((h) => (
                      <div
                        key={`h-${h}`}
                        className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700"
                      >
                        {h}
                      </div>
                    ))}
                  </div>

                  {solutionPartner.scope?.length > 0 && (
                    <div className="mt-4 -m-1.5 flex flex-wrap">
                      {solutionPartner.scope.map((s) => (
                        <div key={`s-${s}`} className="m-1.5">
                          <Pill>{s}</Pill>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* policies */}
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="glass-card p-4">
                    <div className="text-sm font-semibold text-gray-900">
                      Quality Policy
                    </div>
                    <p className="mt-1 text-sm text-gray-700">{policies.quality}</p>
                  </div>
                  <div className="glass-card p-4">
                    <div className="text-sm font-semibold text-gray-900">
                      Safety Policy
                    </div>
                    <p className="mt-1 text-sm text-gray-700">{policies.safety}</p>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-4 text-xs text-gray-500">
              Logos and trademarks belong to their respective owners and are used for
              identification only.
            </p>
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="py-12 sm:py-14">
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div
            className={`transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2"
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

            {/* auto-fit keeps nice columns from phone → ultrawide */}
            <div className="mt-6 sm:mt-8 grid gap-4 sm:gap-6 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
              {certifications.map((c) => (
                <CertificationCard key={c.id} c={c} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
