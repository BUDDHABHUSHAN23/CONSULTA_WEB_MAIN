import React, { useRef, useEffect, useState } from "react";
import { ArrowRight, Settings, BarChart3, Shield, Smartphone } from "lucide-react";
import { companyDetails } from "../data/enhancedContent";

const ServicesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeService, setActiveService] = useState(0);
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

  const icons = [Settings, BarChart3, Shield, Smartphone];

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center  mb-20 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-600 mb-6">
            Our Capabilities
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Comprehensive
            <br />
            <span className="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
              Automation Solutions
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            From system integration to digital transformation, we provide end-to-end 
            automation services that drive operational excellence.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {companyDetails.capabilities.map((service, index) => {
            const Icon = icons[index];
            return (
              <div
                key={index}
                className={`group transition-all duration-1000 ease-out ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
                onMouseEnter={() => setActiveService(index)}
              >
                <div className="relative p-8 bg-gray-50 rounded-3xl hover:bg-white hover:shadow-2xl border border-gray-100 hover:border-gray-200 transition-all duration-500 h-full">
                  {/* Icon */}
                  <div className="mb-6">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                      activeService === index 
                        ? 'bg-gray-900 text-white scale-110' 
                        : 'bg-white text-gray-700 group-hover:bg-gray-900 group-hover:text-white'
                    }`}>
                      <Icon className="h-8 w-8" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                    {service.category}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3 flex-shrink-0 group-hover:bg-gray-900 transition-colors" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* Learn More Button */}
                  <div className="flex items-center text-gray-700 group-hover:text-gray-900 transition-colors font-medium group cursor-pointer">
                    <span className="text-sm">Learn More</span>
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>

                  {/* Hover Background Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
              </div>
            );
          })}
        </div>

        
        {/* Why Choose Us */}
        <div
          className={`mt-20 transition-all duration-1000 ease-out delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex justify-center">
            <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-600 mb-6">
            Why We're Different
            </div>
          </div>

          <h3 className=" text-3xl font-bold text-gray-900 text-center mb-12">
            Why Choose Consulta Technologies?
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {companyDetails.whyChooseUs.map((reason, index) => (
              <div key={index} className="group">
                <div
                  className="relative h-full p-6 bg-gray-50 rounded-3xl
                            border border-gray-100 transition-all duration-500
                            hover:bg-white hover:shadow-2xl hover:border-gray-200"
                >
                  {/* same subtle sheen as services */}
                  <div className="pointer-events-none absolute inset-0 rounded-3xl
                                  bg-gradient-to-br from-gray-900/5 to-transparent
                                  opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Icon pill */}
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center
                              bg-white text-gray-700 border border-gray-200
                              transition-all duration-500
                              group-hover:bg-gray-900 group-hover:text-white group-hover:scale-110"
                  >
                    <span className="text-2xl leading-none">{reason.icon}</span>
                  </div>

                  {/* Copy */}
                  <h4 className="mt-4 font-semibold text-gray-900 text-sm sm:text-base">
                    {reason.title}
                  </h4>
                  <p className="mt-2 text-xs text-gray-600 leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
