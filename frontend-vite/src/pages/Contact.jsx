import React, { useState, useEffect } from "react";
import { ArrowLeft, Mail, Phone, MapPin, Clock, Send, Navigation } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { useToast } from "../hooks/use-toast";
import { companyInfo } from "../data/mock";
import GoogleMapComponent from "../components/GoogleMapComponent";

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    industry: "",
    company : "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Import API service
      const { contactAPI } = await import('../services/api');
      
      // Submit contact form
      await contactAPI.create(formData);
      
      toast({
        title: "Message Sent!",
        description: "Thank you for your inquiry. We'll get back to you soon.",
      });
      
      // Reset form
      setFormData({ name: "", email: "", phone: "", message: "",industry: "",company : "" });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
              Get in
              <br />
              <span className="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                Touch
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl leading-relaxed font-light">
            Ready to transform your operations with cutting-edge automation? We're here to partner with you every step of the way.
            <span className="font-semibold text-gray-900"> Let's explore how our solutions </span>can help you achieve your specific <span className="font-semibold text-gray-900"> goals </span> and drive meaningful results for your business.
            </p> 
            {/* <p className="text-xl text-gray-600 max-w-3xl leading-relaxed font-light">
            Ready to transform your operations with 
            <span className="font-semibold text-gray-900"> cutting-edge automation</span>? 
            We're here to partner with you every step of the way. 
            Let's explore how our solutions can help you achieve 
            <span className="text-indigo-600 font-medium"> your specific goals</span> 
            and drive 
            <span className="underline decoration-indigo-500"> meaningful results</span> 
            for your business.
          </p> */}

          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Contact Information */}
            <div
              className={`transition-all duration-1000 ease-out ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              <div className="sticky top-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Corporate Office
                </h2>

                <div className="space-y-8">
                  {/* Address */}
                  <div className="group">
                    <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all duration-300 hover:shadow-md">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300">
                          <MapPin className="h-6 w-6 text-gray-700" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Address</h3>
                        <div className="text-gray-600 leading-relaxed">
                          <div>{companyInfo.address.building}, {companyInfo.address.area}</div>
                          <div>{companyInfo.address.location}</div>
                          <div>{companyInfo.address.city}, {companyInfo.address.state} - {companyInfo.address.pincode}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="group">
                    <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all duration-300 hover:shadow-md">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300">
                          <Phone className="h-6 w-6 text-gray-700" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
                        <a 
                          href={`tel:${companyInfo.contact.phone}`}
                          className="text-gray-600 hover:text-gray-900 transition-colors"
                        >
                          {companyInfo.contact.phone}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="group">
                    <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all duration-300 hover:shadow-md">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300">
                          <Mail className="h-6 w-6 text-gray-700" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                        <a 
                          href={`mailto:${companyInfo.contact.email}`}
                          className="text-gray-600 hover:text-gray-900 transition-colors"
                        >
                          {companyInfo.contact.email}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Also i want to impliement the more functionality of the website  */}
                  {/* Hours */}
                  <div className="group">
                    <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all duration-300 hover:shadow-md">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300">
                          <Clock className="h-6 w-6 text-gray-700" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Business Hours</h3>
                        <div className="text-gray-600">
                          {companyInfo.contact.hours}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div
              className={`transition-all duration-1000 ease-out delay-300 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
            >
              <div className="bg-gray-50 rounded-3xl p-8 lg:p-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Send Message
                </h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-200 focus:border-gray-400 transition-all duration-300"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-200 focus:border-gray-400 transition-all duration-300"
                      placeholder="your@email.com"
                    />
                  </div>


                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Industry *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.industry}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-200 focus:border-gray-400 transition-all duration-300"
                      placeholder="e.g., IT, Manufacturing, Healthcare"
                    />
                  </div>


                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Company *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.industry}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-200 focus:border-gray-400 transition-all duration-300"
                      placeholder="e.g., Google, Infosys, Reliance"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-200 focus:border-gray-400 transition-all duration-300"
                      placeholder="+91 98**** *210"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-200 focus:border-gray-400 transition-all duration-300 resize-none"
                      placeholder="Tell us about your automation needs..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-4 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        Send Message
                        <Send className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    )}
                  </Button>
                </form>
              </div>
            </div>

            {/* Google Maps */}
            <div
              className={`transition-all duration-1000 ease-out delay-500 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
            >
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-100">
                  <div className="flex items-center space-x-3 mb-2">
                    <Navigation className="h-6 w-6 text-gray-700" />
                    <h3 className="text-xl font-semibold text-gray-900">Find Us</h3>
                  </div>
                  <p className="text-gray-600">
                    Visit our office for consultations and demonstrations
                  </p>
                </div>
                
                <div className="h-80">
                  <GoogleMapComponent />
                </div>

                <div className="p-6 bg-gray-50">
                  <div className="text-sm text-gray-600 leading-relaxed">
                    <div className="font-medium text-gray-900 mb-1">Directions:</div>
                    <div>Located near Belapur Railway Station</div>
                    <div>Easily accessible by local trains and buses</div>
                    <div>Parking available on premises</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;

