import React, { useEffect, useRef } from "react";

interface Clinic {
  name: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
}

interface MapDisplayProps {
  clinics: Clinic[];
  center: {
    lat: number;
    lng: number;
  };
  userLocation: {
    lat: number;
    lng: number;
  } | null;
}

const MapDisplay: React.FC<MapDisplayProps> = ({
  clinics,
  center,
  userLocation,
}) => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (mapRef.current) {
      const map = new google.maps.Map(mapRef.current, {
        center,
        zoom: 15,
      });

      // Add markers for clinics
      clinics.forEach((clinic) => {
        new google.maps.Marker({
          position: clinic.location,
          map,
          title: clinic.name,
        });
      });

      // Add a distinct marker for user's location if available
      if (userLocation) {
        new google.maps.Marker({
          position: userLocation,
          map,
          title: "Your Location",
          icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          },
        });
      }
    }
  }, [clinics, center, userLocation]);

  return <div id="map" ref={mapRef} className="w-full h-full"></div>;
};

export default MapDisplay;
