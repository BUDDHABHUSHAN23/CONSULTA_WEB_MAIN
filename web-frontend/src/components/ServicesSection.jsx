import React, { useRef, useEffect, useState } from "react";
import { ArrowRight, Settings, BarChart3, Shield, Smartphone, CheckCircle ,Award , Zap} from "lucide-react";
import { companyAPI } from "../services/api";

const ServicesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [capabilities, setCapabilities] = useState([]);
  const [whyChooseUs, setWhyChooseUs] = useState([]);
  const sectionRef = useRef(null);



  const WHY_ICONS = [Shield, Settings, BarChart3, Smartphone, Award, Zap];

  // Tailwind utility for the draw effect (applies to all <path> children)

  

  // fetch company info for capabilities/whyChooseUs
  useEffect(() => {
    companyAPI
      .getInfo()
      .then((d) => {
        const caps = Array.isArray(d?.capabilities) ? d.capabilities : [];
        const values = Array.isArray(d?.values)
          ? d.values.map((v) => ({
              title: v.title,
              description: v.description,
              icon: "✔",
            }))
          : [];
        setCapabilities(caps);
        setWhyChooseUs(values);
      })
      .catch(() => {
        setCapabilities([]);
        setWhyChooseUs([]);
      });

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          obs.unobserve(entry.target); // run once
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const icons = [Settings, BarChart3, Shield, Smartphone];

  return (
    <section ref={sectionRef} className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-12 sm:mb-16 lg:mb-20 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-sm font-medium text-gray-700 leading-none mb-6">
            <CheckCircle className="h-4 w-4 text-green-600 shrink-0" aria-hidden="true" />
            <span>Our Capabilities</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            Comprehensive
            <br />
            <span className="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
              Automation Solutions
            </span>
          </h2>

          <p className="mx-auto max-w-3xl text-gray-600 font-light leading-relaxed text-base sm:text-lg">
            From system integration to digital transformation, we provide end-to-end automation
            services that drive operational excellence.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
          {capabilities.map((service, index) => {
            const Icon = icons[index % icons.length] || Settings; // safe fallback
            return (
              <div
                key={index}
                className={`group h-full transition-all duration-1000 ease-out ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onMouseEnter={() => setActiveService(index)}
              >
                <div className="relative flex h-full flex-col rounded-3xl border border-gray-100 bg-gray-50 p-6 sm:p-8 transition-all duration-500 hover:border-gray-200 hover:bg-white hover:shadow-2xl">
                  {/* Icon */}
                  <div className="mb-5 sm:mb-6">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-500 sm:h-16 sm:w-16 ${
                        activeService === index
                          ? "bg-gray-900 text-white scale-110"
                          : "bg-white text-gray-700 group-hover:bg-gray-900 group-hover:text-white"
                      }`}
                    >
                      <Icon className="h-7 w-7 sm:h-8 sm:w-8" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-gray-800 transition-colors">
                    {service.category}
                  </h3>

                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-5 sm:mb-6">
                    {service.description}
                  </p>

                  {/* Features */}
                  {!!(service.features || []).length && (
                    <div className="mb-6 space-y-2">
                      {(service.features || []).map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-600">
                          <span className="mr-3 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400 transition-colors group-hover:bg-gray-900" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* CTA */}
                  <div className="mt-auto flex items-center cursor-pointer font-medium text-gray-700 transition-colors group-hover:text-gray-900">
                    <span className="text-sm">Learn More</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>

                  {/* Hover sheen */}
                  <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-gray-900/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Why Choose Us */}
        <div
          className={`mt-16 sm:mt-20 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-sm font-medium text-gray-700 leading-none mb-6">
              <CheckCircle className="h-4 w-4 text-green-600 shrink-0" aria-hidden="true" />
              <span>Why Choose Us</span>
            </div>
          </div>

          <h3 className="text-center text-2xl sm:text-3xl font-bold text-gray-900 mb-8 sm:mb-12">
            Why Choose Consulta Technologies?
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {whyChooseUs.map((reason, index) => (
              <div key={index} className="group h-full">
                <div className="relative h-full rounded-3xl border border-gray-100 bg-gray-50 p-5 sm:p-6 transition-all duration-500 hover:border-gray-200 hover:bg-white hover:shadow-2xl overflow-hidden">
                  <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-gray-900/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Icon pill */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-700 transition-transform duration-500 group-hover:scale-110 group-hover:bg-gray-900 group-hover:text-white motion-reduce:group-hover:scale-100">
                    {(() => {
                      const IconCmp = WHY_ICONS[index % WHY_ICONS.length] || Shield;
                      return (
                        <IconCmp
                          className="lucide-draw w-6 h-6 stroke-current"
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                      );
                    })()}
                  </div>

                  {/* Copy */}
                  <h4 className="mt-4 text-sm sm:text-base font-semibold text-gray-900">
                    {reason.title}
                  </h4>
                  <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed">
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
