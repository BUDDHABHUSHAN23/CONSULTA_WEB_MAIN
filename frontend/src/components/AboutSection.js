import React, { useRef, useEffect, useState } from "react";
import { CheckCircle, Award, Shield, Zap } from "lucide-react";

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <Award className="h-8 w-8" />,
      title: "Industry Expertise",
      description: "Deep knowledge across 8+ industrial sectors with proven track record"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Reliable Solutions", 
      description: "99% uptime guarantee with comprehensive support and maintenance"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Cutting-edge Technology",
      description: "Latest automation technologies and IoT integration for future-ready solutions"
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div
            className={`transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="inline-flex items-center px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-600 shadow-sm mb-8">
              <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
              Trusted by Industry Leaders
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Automation that
              <br />
              <span className="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                drives progress
              </span>
            </h2>

            <p className="text-xl text-gray-600 leading-relaxed mb-8 font-light">
              With over 15 years of experience, we specialize in delivering innovative 
              automation solutions that transform industries and enhance operational efficiency 
              across the globe.
            </p>

            <div className="space-y-4">
              {["500+ Successful Projects", "50+ Expert Engineers", "24/7 Technical Support"].map((item, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Features */}
          <div
            className={`transition-all duration-1000 ease-out delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="space-y-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 hover:scale-105 border border-gray-100"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center text-gray-700 group-hover:bg-gray-900 group-hover:text-white transition-all duration-300">
                        {feature.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;