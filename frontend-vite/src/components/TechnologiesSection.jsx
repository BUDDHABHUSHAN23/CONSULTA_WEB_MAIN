import React, { useRef, useEffect, useState } from "react";
import { Cpu, Network, Database, Cloud } from "lucide-react";
import { technologyStack, companyDetails } from "../data/enhancedContent";

const TechnologiesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
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

  const tabIcons = [Cpu, Network, Database, Cloud];

  return (
    <section ref={sectionRef} className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-600 shadow-sm mb-6">
            Technology Stack
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Cutting-edge
            <br />
            <span className="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
              Technologies
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            We leverage the latest industrial automation technologies and platforms 
            to deliver robust, scalable, and future-ready solutions.
          </p>
        </div>

        {/* Technology Tabs */}
        <div
          className={`transition-all duration-1000 ease-out delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {technologyStack.map((tech, index) => {
              const Icon = tabIcons[index];
              return (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center space-x-3 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === index
                      ? 'bg-gray-900 text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-gray-100 shadow-sm'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="hidden sm:block">{tech.category}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-8 lg:p-12">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-2xl mb-4">
                  {React.createElement(tabIcons[activeTab], { className: "h-8 w-8 text-gray-700" })}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {technologyStack[activeTab].category}
                </h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {technologyStack[activeTab].technologies.map((tech, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 group"
                  >
                    <div className="text-center">
                      <div className="w-8 h-8 bg-white rounded-lg mx-auto mb-2 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                        <div className="w-4 h-4 bg-gray-400 rounded-full" />
                      </div>
                      <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                        {tech}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div
          className={`mt-16 text-center transition-all duration-1000 ease-out delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Certified & Trusted
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {companyDetails.certifications.map((cert, index) => (
              <div
                key={index}
                className="p-4 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <div className="w-4 h-4 bg-green-500 rounded-full" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 text-left">
                    {cert}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologiesSection;
