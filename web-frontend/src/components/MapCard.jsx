import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Consulta Technologies location in CBD Belapur, Navi Mumbai
// Adjusted coordinates for more precise positioning
const center = [19.01917, 73.04005];

export default function MapCard({ showHeader = true }) {
  const [isClient, setIsClient] = useState(false);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    setIsClient(true);
    console.log('MapCard: Client-side rendering enabled');
  }, []);
  if (!isClient) {
    return (
      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        {showHeader && (
          <div className="p-6">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-foreground" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <h3 className="text-lg font-semibold text-foreground">Find Us</h3>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Visit our office for consultations and demonstrations
            </p>
          </div>
        )}
        <div className="h-80 bg-gray-100 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400 mx-auto mb-2"></div>
            Loading map...
          </div>
        </div>
        <div className="p-6 pt-4">
          <h4 className="font-semibold text-foreground mb-2">Directions:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Located near Belapur Railway Station</li>
            <li>• Easily accessible by local trains and buses</li>
            <li>• Parking available on premises</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
      {showHeader && (
        <div className="p-6">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-foreground" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <h3 className="text-lg font-semibold text-foreground">Find Us</h3>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Visit our office for consultations and demonstrations
          </p>
        </div>
      )}

      <div className="relative">
        {mapError ? (
          <div className="h-80 bg-gray-100 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="text-4xl mb-2">🗺️</div>
              <div className="font-medium">Map temporarily unavailable</div>
              <div className="text-sm mt-1">
                <a 
                  href="https://maps.google.com/?q=19.0176147,73.0365315" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  View on Google Maps instead
                </a>
              </div>
            </div>
          </div>
        ) : (
          <MapContainer 
            center={center} 
            zoom={15} 
            className="w-full h-80 z-0" 
            zoomControl={false} 
            scrollWheelZoom={true}
            style={{ height: '320px', width: '100%', zIndex: 0 }}
            whenReady={() => console.log('Map is ready')}
            onError={() => {
              console.error('Map failed to load');
              setMapError(true);
            }}
          >
            <TileLayer 
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors'
              onError={() => {
                console.error('Tile layer failed to load');
                setMapError(true);
              }}
            />
            <Marker position={center}>
              <Popup>
                <div className="text-center">
                  <strong>Consulta Technologies Pvt. Ltd.</strong>
                  <br />
                  Sector 11, CBD Belapur
                  <br />
                  Navi Mumbai, Maharashtra 400614
                  <br />
                  <div className="mt-2">
                    <a 
                      href="https://www.google.com/maps/place/Consulta+Technologies+Pvt.+Ltd./@19.0191127,73.0394054,279m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3be7c3ad4e159a4b:0xf4d662aa150db6a2!8m2!3d19.0191114!4d73.0400491!16s%2Fg%2F1hdzxc4f_?entry=ttu&g_ep=EgoyMDI1MDkxMC4wIKXMDSoASAFQAw%3D%3D" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      View on Google Maps
                    </a>
                  </div>
                </div>
              </Popup>
            </Marker>
            <ZoomControl position="bottomright" />
          </MapContainer>
        )}
      </div>
    </div>
  );
}


