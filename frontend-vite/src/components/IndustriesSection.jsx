import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import api from "../services/api";

const IndustriesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Fetch industries from API
  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        setLoading(true);
        const data = await api.industries.getAll();
        setIndustries(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching industries:', err);
        setError(err.message);
        // Fallback to mock data if API fails
        const { industries: mockIndustries } = await import('../data/mock');
        setIndustries(mockIndustries);
      } finally {
        setLoading(false);
      }
    };

    fetchIndustries();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-20 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-600 mb-6">
            Industries We Serve
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Automation solutions for
            <br />
            <span className="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
              every industry
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            From power generation to food processing, we deliver tailored automation 
            solutions that drive efficiency and innovation across diverse sectors.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="h-80 bg-gray-200 rounded-2xl animate-pulse" />
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12">
            <div className="text-red-500 mb-2">Failed to load industries</div>
            <div className="text-gray-600 text-sm">{error}</div>
          </div>
        )}

        {/* Industries Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((industry, index) => (
            <div
              key={industry.id}
              className={`group relative transition-all duration-1000 ease-out ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredCard(industry.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative h-80 bg-white rounded-2xl shadow-sm hover:shadow-2xl border border-gray-100 overflow-hidden transition-all duration-500 hover:scale-105 hover:-translate-y-2">
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${industry.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col justify-end p-6">
                  <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                    {industry.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gray-100 transition-colors">
                    {industry.title}
                  </h3>
                  
                  <p className="text-gray-200 text-sm leading-relaxed mb-4 line-clamp-3">
                    {industry.description}
                  </p>

                  {/* Hover Features */}
                  <div
                    className={`absolute inset-0 bg-gray-900/95 backdrop-blur-sm p-6 flex flex-col justify-center transition-all duration-500 ${
                      hoveredCard === industry.id
                        ? "opacity-100 visible"
                        : "opacity-0 invisible"
                    }`}
                  >
                    <div className="text-3xl mb-4">{industry.icon}</div>
                    <h3 className="text-xl font-bold text-white mb-4">{industry.title}</h3>
                    
                    <div className="space-y-2 mb-6">
                      {industry.features.slice(0, 3).map((feature, idx) => (
                        <div key={idx} className="flex items-center text-gray-300 text-sm">
                          <div className="w-1.5 h-1.5 bg-white rounded-full mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    <Link
                      to="/industries"
                      className="inline-flex items-center text-white hover:text-gray-200 transition-colors group/link"
                    >
                      <span className="text-sm font-medium">Learn More</span>
                      <ExternalLink className="h-4 w-4 ml-2 group-hover/link:translate-x-1 transition-transform duration-200" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        )}

        {/* CTA */}
        <div
          className={`text-center mt-16 transition-all duration-1000 ease-out delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Link
            to="/industries"
            className="inline-flex items-center px-8 py-4 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-all duration-300 hover:shadow-lg hover:scale-105 group"
          >
            View All Industries
            <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
