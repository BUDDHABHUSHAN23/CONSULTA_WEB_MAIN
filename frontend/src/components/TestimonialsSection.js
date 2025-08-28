import React, { useRef, useEffect, useState } from "react";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import api from "../services/api";

const TestimonialsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentStory, setCurrentStory] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [successStories, setSuccessStories] = useState([]);
  const [loading, setLoading] = useState(true);
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

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [testimonialsData, successStoriesData] = await Promise.all([
          api.testimonials.getAll(),
          api.successStories.getAll()
        ]);
        
        setTestimonials(testimonialsData);
        setSuccessStories(successStoriesData);
      } catch (error) {
        console.error('Error fetching testimonials/success stories:', error);
        // Fallback to mock data
        try {
          const { testimonials: mockTestimonials } = await import('../data/mock');
          const { successStories: mockSuccessStories } = await import('../data/enhancedContent');
          setTestimonials(mockTestimonials);
          setSuccessStories(mockSuccessStories);
        } catch (mockError) {
          console.error('Error loading mock data:', mockError);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    if (testimonials.length > 0) {
      const timer = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [testimonials.length]);

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % successStories.length);
  };

  const prevStory = () => {
    setCurrentStory((prev) => (prev - 1 + successStories.length) % successStories.length);
  };

  return (
    <section ref={sectionRef} className="py-24 bg-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.1),transparent_50%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Testimonials Section */}
        <div
          className={`transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full text-sm font-medium text-gray-300 mb-6">
              Client Testimonials
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              What our clients
              <br />
              <span className="text-gray-300">say about us</span>
            </h2>
          </div>

          {/* Testimonial Carousel */}
          <div className="max-w-4xl mx-auto mb-20">
            {loading ? (
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-white/20 animate-pulse">
                <div className="h-12 w-12 bg-white/20 rounded-lg mb-6" />
                <div className="space-y-3 mb-8">
                  <div className="h-6 bg-white/20 rounded w-full" />
                  <div className="h-6 bg-white/20 rounded w-3/4" />
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full" />
                  <div className="space-y-2">
                    <div className="h-4 bg-white/20 rounded w-32" />
                    <div className="h-3 bg-white/20 rounded w-48" />
                  </div>
                </div>
              </div>
            ) : testimonials.length > 0 ? (
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-white/20">
                  <Quote className="h-12 w-12 text-white/60 mb-6" />
                  
                  <blockquote className="text-xl lg:text-2xl text-white leading-relaxed font-light mb-8">
                    "{testimonials[currentTestimonial]?.message}"
                  </blockquote>
                  
                  <div className="flex items-center space-x-4">
                    <img
                      src={testimonials[currentTestimonial]?.image}
                      alt={testimonials[currentTestimonial]?.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-white/20"
                    />
                    <div>
                      <div className="font-semibold text-white text-lg">
                        {testimonials[currentTestimonial]?.name}
                      </div>
                      <div className="text-gray-300 text-sm">
                        {testimonials[currentTestimonial]?.position}, {testimonials[currentTestimonial]?.company}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Testimonial Indicators */}
                <div className="flex justify-center space-x-2 mt-6">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        currentTestimonial === index 
                          ? 'bg-white' 
                          : 'bg-white/30 hover:bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center text-white/60 py-12">
                No testimonials available
              </div>
            )}
          </div>
        </div>

        {/* Success Stories Section */}
        <div
          className={`transition-all duration-1000 ease-out delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Success Stories
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Real results from real clients across different industries
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            {loading ? (
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="bg-white rounded-3xl p-8 lg:p-10 animate-pulse">
                  <div className="flex justify-between mb-6">
                    <div className="h-6 bg-gray-200 rounded w-16" />
                    <div className="h-6 bg-gray-200 rounded w-20" />
                  </div>
                  <div className="space-y-4">
                    <div className="h-8 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                    <div className="h-20 bg-gray-200 rounded" />
                  </div>
                </div>
                <div className="space-y-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-12 bg-white/10 rounded-xl" />
                  ))}
                </div>
              </div>
            ) : successStories.length > 0 ? (
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                {/* Story Content */}
                <div className="bg-white rounded-3xl p-8 lg:p-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {successStories[currentStory]?.year}
                    </div>
                    <div className="text-sm text-gray-500">
                      {successStories[currentStory]?.timeline}
                    </div>
                  </div>
                  
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">
                    {successStories[currentStory]?.title}
                  </h4>
                  
                  <p className="text-gray-600 mb-4">
                    {successStories[currentStory]?.client}
                  </p>
                  
                  <div className="mb-6">
                    <h5 className="font-semibold text-gray-900 mb-2">Challenge:</h5>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {successStories[currentStory]?.challenge}
                    </p>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">Solution:</h5>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {successStories[currentStory]?.solution}
                    </p>
                  </div>
                </div>

                {/* Results */}
                <div className="space-y-4">
                  <h5 className="text-xl font-bold text-white mb-6">Key Results:</h5>
                  {successStories[currentStory]?.results?.map((result, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
                    >
                      <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
                      <span className="text-white text-sm leading-relaxed">{result}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center text-white/60 py-12">
                No success stories available
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-center space-x-4 mt-8">
              <button
                onClick={prevStory}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-full border border-white/20 transition-all duration-300 group"
              >
                <ChevronLeft className="h-5 w-5 text-white group-hover:text-gray-200" />
              </button>
              <button
                onClick={nextStory}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-full border border-white/20 transition-all duration-300 group"
              >
                <ChevronRight className="h-5 w-5 text-white group-hover:text-gray-200" />
              </button>
            </div>

            {/* Story Indicators */}
            <div className="flex justify-center space-x-2 mt-6">
              {successStories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStory(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentStory === index 
                      ? 'bg-white' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;