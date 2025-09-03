import React, { useEffect, useMemo, useState, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import DotTextBanner from "./DotTextBanner";

const VideoModal = lazy(() => import("./VideoModal"));

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => { setIsVisible(true); }, []);
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY || 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const bannerStyle = useMemo(() => {
    const vh = typeof window !== "undefined" ? window.innerHeight : 800;
    const p = Math.min(scrollY / (vh * 0.9), 1);
    const scale = 1 + p * 1.28;
    const translateY = p * 24;
    const opacity = 0.28 - p * 0.18;
    return {
      transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
      opacity,
      willChange: "transform, opacity",
    };
  }, [scrollY]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(120,119,198,0.08),transparent_50%)] pointer-events-none" />

      <DotTextBanner
        text="-INOVATION-"
        className="absolute top-10 inset-0 z-[8] pointer-events-none"
        color="#111111"
        fontSize={240}
        opacity={0.1}
        vertical={false}
        style={{
          ...bannerStyle,
          WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)",
          maskImage: "linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center">
          <div className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight tracking-tight">
              Automation
              <br />
              <span className="bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 bg-clip-text text-transparent">
                Reimagined
              </span>
            </h1>
          </div>

          <div className={`transition-all duration-1000 ease-out delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <p className="mt-8 text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
              We are an experienced & affordable automation company delivering
              cutting-edge solutions across industries with precision and innovation.
            </p>
          </div>

          <div className={`transition-all duration-1000 ease-out delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <Link
                to="/contact"
                className="group relative overflow-hidden px-8 py-4 bg-gray-900 text-white rounded-full font-medium text-lg hover:bg-gray-800 transition-all duration-300 hover:shadow-2xl hover:scale-105 flex items-center gap-3"
              >
                Get Started
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>

              <button
                type="button"
                onClick={() => setShowVideo(true)}
                className="group flex items-center gap-3 px-8 py-4 text-gray-700 hover:text-gray-900 transition-all duration-300 font-medium text-lg"
                aria-haspopup="dialog"
                aria-controls="demo-video"
              >
                <div className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <Play className="h-5 w-5 ml-1 text-gray-800" />
                </div>
                Watch Demo
              </button>
            </div>
          </div>

          <div className={`transition-all duration-1000 ease-out delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="mt-20">
              <p className="text-sm text-gray-500 font-medium tracking-wide uppercase mb-8">
                Trusted by industry leaders
              </p>
              <div className="logo-marquee opacity-80">
                <div className="logo-marquee opacity-80">
                  <div className="logo-track gap-x-12 py-2">
                    {[
                      { src: "/logos/siemens.svg", alt: "Siemens" },
                      { src: "/logos/dell.svg", alt: "Dell Technologies" },
                      { src: "/logos/Cytiva.svg", alt: "Cytiva" },
                    ].map((logo, i) => (
                      <img
                        key={i}
                        src={logo.src}
                        alt={logo.alt}
                        className="logo-img grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 hover:scale-105"
                      />
                    ))}
                    {[
                      { src: "/logos/siemens.svg", alt: "Siemens" },
                      { src: "/logos/dell.svg", alt: "Dell Technologies" },
                      { src: "/logos/Cytiva.svg", alt: "Cytiva" },
                    ].map((logo, i) => (
                      <img
                        key={`dup-${i}`}
                        src={logo.src}
                        alt={logo.alt}
                        className="logo-img grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 hover:scale-105"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center ">
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
