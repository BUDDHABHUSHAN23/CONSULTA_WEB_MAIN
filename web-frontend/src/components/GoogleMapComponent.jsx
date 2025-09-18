import React from "react";
import { APIProvider, Map } from '@vis.gl/react-google-maps';

const GoogleMapComponent = () => {
  // Company coordinates for Navi Mumbai (approximate location)
  const companyLocation = {
    lat: 19.0176147,  // Belapur area coordinates
    lng: 73.0365315
  };

  const apiKey = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "").trim();

  if (!apiKey) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
        <div className="text-center p-8">
          <div className="text-4xl mb-4">🗺️</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Interactive Map</h3>
          <p className="text-sm text-gray-600 mb-4">
            Set VITE_GOOGLE_MAPS_API_KEY in your frontend .env to enable Google Maps.
          </p>
          <div className="text-xs text-gray-500 bg-white p-3 rounded-lg border">
            <div className="font-medium mb-1">Location:</div>
            <div>Tower 5, K-Block, International Technology Park</div>
            <div>Belapur Railway Station Building</div>
            <div>Navi Mumbai, Maharashtra - 400 614</div>
          </div>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${companyLocation.lat},${companyLocation.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Open in Google Maps
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full relative h-[360px]"> {/* explicit height */}
      <APIProvider apiKey={apiKey}>
        <Map
          defaultCenter={companyLocation}
          defaultZoom={15}
          gestureHandling="greedy"
          disableDefaultUI={false}
          style={{ width: "100%", height: "100%", borderRadius: "0.5rem" }}
        />
      </APIProvider>
    </div>
  );
};

export default GoogleMapComponent;

