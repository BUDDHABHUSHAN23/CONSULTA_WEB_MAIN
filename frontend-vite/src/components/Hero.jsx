import React, { useEffect, useMemo, useState, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import DotTextBanner from "./DotTextBanner";

const VideoModal = lazy(() => import("./VideoModal"));

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [vw, setVw] = useState(typeof window !== "undefined" ? window.innerWidth : 1280);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => setIsVisible(true), []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY || 0);
    const onResize = () => setVw(window.innerWidth || 1280);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const setRM = () => setPrefersReduced(!!mq?.matches);
    setRM();
    mq?.addEventListener?.("change", setRM);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      mq?.removeEventListener?.("change", setRM);
    };
  }, []);

  const bannerStyle = useMemo(() => {
    if (prefersReduced) {
      return { transform: "translate3d(0,0,0) scale(1)", opacity: 0.12, willChange: "auto" };
    }
    const vh = typeof window !== "undefined" ? window.innerHeight : 800;
    const p = Math.min(scrollY / (vh * 0.9), 1);
    const scale = 1 + p * 1.2;
    const translateY = p * 20;
    const opacity = 0.22 - p * 0.14;
    return {
      transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
      opacity,
      willChange: "transform, opacity",
    };
  }, [scrollY, prefersReduced]);

  // Responsive banner font size so it never dominates on phones
  const bannerFont = vw < 420 ? 110 : vw < 640 ? 140 : vw < 1024 ? 200 : 240;

  const logos = [
    { src: "/logos/siemens.svg", alt: "Siemens" },
    { src: "/logos/dell.svg", alt: "Dell Technologies" },
    { src: "/logos/Cytiva.svg", alt: "Cytiva" },
  ];

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* soft radial glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.10),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(120,119,198,0.08),transparent_50%)] pointer-events-none" />

      {/* big dotted word — hidden on very small screens */}
      <DotTextBanner
        text="-INOVATION-"
        className="hidden sm:block absolute inset-0 z-[8] pointer-events-none"
        color="#111111"
        fontSize={bannerFont}
        opacity={0.1}
        vertical={false}
        style={{
          ...bannerStyle,
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)",
          maskImage:
            "linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <div className="text-center">
          <div
            className={`transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight tracking-tight">
              Automation
              <br />
              <span className="bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 bg-clip-text text-transparent">
                Reimagined
              </span>
            </h1>
          </div>

          <div
            className={`transition-all duration-700 ease-out delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
              We are an experienced &amp; affordable automation company delivering
              cutting-edge solutions across industries with precision and innovation.
            </p>
          </div>

          <div
            className={`transition-all duration-700 ease-out delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link
                to="/contact"
                className="group relative overflow-hidden px-6 sm:px-8 py-3.5 sm:py-4 bg-gray-900 text-white rounded-full font-medium text-base sm:text-lg hover:bg-gray-800 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] flex items-center gap-2 sm:gap-3 w-full sm:w-auto"
              >
                Get Started
                <ArrowRight className="h-5 w-5 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>

              <button
                type="button"
                onClick={() => setShowVideo(true)}
                className="group flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 text-gray-700 hover:text-gray-900 transition-all duration-300 font-medium text-base sm:text-lg w-full sm:w-auto"
                aria-haspopup="dialog"
                aria-controls="demo-video"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg flex items-center justify-center group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <Play className="h-5 w-5 ml-1 text-gray-800" />
                </div>
                Watch Demo
              </button>
            </div>
          </div>

          {/* Logos */}
          <div
            className={`transition-all duration-700 ease-out delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="mt-14 sm:mt-16">
              <p className="text-xs sm:text-sm text-gray-500 font-medium tracking-wide uppercase mb-5 sm:mb-8">
                Trusted by industry leaders
              </p>

              <div className="logo-marquee opacity-80" aria-label="Partner logos">
                <div className="logo-track gap-x-10 sm:gap-x-12 py-2">
                  {[...logos, ...logos].map((logo, i) => (
                    <img
                      key={i}
                      src={logo.src}
                      alt={logo.alt}
                      loading="lazy"
                      className="logo-img grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 hover:scale-105"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator (hide on very short viewports) */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce [@media_(max-height:640px)]:hidden">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse" />
        </div>
      </div>

      {/* Video Modal */}
      <Suspense fallback={null}>
        {showVideo && (
          <VideoModal
            open={showVideo}
            onClose={() => setShowVideo(false)}
            src="/media/demo.mp4"
            poster="/media/demo-poster.jpg"
            title="Consulta Demo"
            id="demo-video"
          />
        )}
      </Suspense>
    </section>
  );
};

export default Hero;
