import React, { useState, useEffect } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { industries } from "../data/mock";

const Industries = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Link
              to="/"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 group transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
              Back to Home
            </Link>

            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Industries We
              <br />
              <span className="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                Transform
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl leading-relaxed font-light">
              Delivering cutting-edge automation solutions across diverse industries 
              to enhance efficiency, reduce costs, and drive innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12">
            {industries.map((industry, index) => (
              <div
                key={industry.id}
                className={`transition-all duration-1000 ease-out ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="bg-white rounded-3xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-500 hover:scale-[1.02]">
                  <div className="grid lg:grid-cols-2 gap-0">
                    {/* Image */}
                    <div className="relative h-80 lg:h-96">
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${industry.image})` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/40" />
                      </div>
                      <div className="absolute top-6 left-6">
                        <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                          {industry.icon}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                        {industry.title}
                      </h2>
                      
                      <p className="text-gray-600 text-lg leading-relaxed mb-8">
                        {industry.description}
                      </p>

                      <div className="space-y-3 mb-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Key Solutions:
                        </h3>
                        {industry.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center">
                            <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <Link
                        to="/contact"
                        className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-all duration-300 hover:shadow-lg w-fit group"
                      >
                        Get Solution
                        <ArrowLeft className="h-5 w-5 ml-2 rotate-180 group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Industries;
