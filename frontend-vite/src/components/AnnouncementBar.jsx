import React, { useState } from "react";
import { X, ExternalLink } from "lucide-react";

const AnnouncementBar = ({ item, onDismiss }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleDismiss = () => {
    if (!item.dismissible) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setIsVisible(false);
      onDismiss(item.id);
    }, 300);
  };

  const getVariantStyles = (variant) => {
    const baseStyles = "px-4 py-3 text-sm font-medium transition-all duration-300 glass-effect";
    
    switch (variant) {
      case "success":
        return `${baseStyles} bg-green-50/80 text-green-800 border-b border-green-200/50`;
      case "warning":
        return `${baseStyles} bg-yellow-50/80 text-yellow-800 border-b border-yellow-200/50`;
      case "error":
        return `${baseStyles} bg-red-50/80 text-red-800 border-b border-red-200/50`;
      case "info":
      default:
        return `${baseStyles} bg-blue-50/80 text-blue-800 border-b border-blue-200/50`;
    }
  };

  const getCTAButtonStyles = (variant) => {
    const baseStyles = "ml-3 px-4 py-2 text-xs font-semibold rounded-full apple-button shadow-sm";
    
    switch (variant) {
      case "success":
        return `${baseStyles} bg-green-600 text-white hover:bg-green-700 shadow-green-200`;
      case "warning":
        return `${baseStyles} bg-yellow-600 text-white hover:bg-yellow-700 shadow-yellow-200`;
      case "error":
        return `${baseStyles} bg-red-600 text-white hover:bg-red-700 shadow-red-200`;
      case "info":
      default:
        return `${baseStyles} bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200`;
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className={`${getVariantStyles(item.variant)} ${
        isAnimating ? "announcement-exit" : "announcement-enter"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center flex-1 min-w-0">
          {item.title && (
            <span className="font-semibold mr-2 flex-shrink-0">
              {item.title}:
            </span>
          )}
          <span className="truncate">{item.message}</span>
        </div>
        
        <div className="flex items-center space-x-2 flex-shrink-0">
          {item.cta_text && item.cta_href && (
            <a
              href={item.cta_href}
              target="_blank"
              rel="noopener noreferrer"
              className={getCTAButtonStyles(item.variant)}
            >
              {item.cta_text}
              <ExternalLink className="inline-block ml-1 w-3 h-3" />
            </a>
          )}
          
          {item.dismissible && (
            <button
              onClick={handleDismiss}
              className="ml-2 p-1.5 rounded-full hover:bg-gray-200/50 transition-colors duration-200"
              aria-label="Dismiss announcement"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;