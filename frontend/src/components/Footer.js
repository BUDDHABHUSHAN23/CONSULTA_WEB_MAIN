import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { companyInfo } from "../data/mock";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <Link to="/" className="text-2xl font-bold mb-4 block">
                Consulta
              </Link>
              <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
                Leading provider of industrial automation solutions with expertise 
                across multiple industries. Transforming businesses through innovation 
                and technology.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center text-gray-300">
                  <MapPin className="h-5 w-5 mr-3 flex-shrink-0 text-gray-400" />
                  <div className="text-sm">
                    <div>{companyInfo.address.building}, {companyInfo.address.area}</div>
                    <div>{companyInfo.address.location}</div>
                    <div>{companyInfo.address.city}, {companyInfo.address.state} - {companyInfo.address.pincode}</div>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-300">
                  <Phone className="h-5 w-5 mr-3 flex-shrink-0 text-gray-400" />
                  <span className="text-sm">{companyInfo.contact.phone}</span>
                </div>
                
                <div className="flex items-center text-gray-300">
                  <Mail className="h-5 w-5 mr-3 flex-shrink-0 text-gray-400" />
                  <a 
                    href={`mailto:${companyInfo.contact.email}`}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {companyInfo.contact.email}
                  </a>
                </div>
                
                <div className="flex items-center text-gray-300">
                  <Clock className="h-5 w-5 mr-3 flex-shrink-0 text-gray-400" />
                  <span className="text-sm">{companyInfo.contact.hours}</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <div className="space-y-3">
                {[
                  { name: "Home", path: "/" },
                  { name: "Industries", path: "/industries" },
                  { name: "Contact", path: "/contact" },
                  { name: "About Us", path: "/about" }
                ].map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="block text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Industries */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Industries</h3>
              <div className="space-y-3">
                {[
                  "Power",
                  "Cement", 
                  "Steel",
                  "Water",
                  "Chemical",
                  "Food & Beverages"
                ].map((industry) => (
                  <Link
                    key={industry}
                    to="/industries"
                    className="block text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {industry}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} {companyInfo.name}. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6">
              <Link 
                to="/privacy" 
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;