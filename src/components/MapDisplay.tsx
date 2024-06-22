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
}

const MapDisplay: React.FC<MapDisplayProps> = ({ clinics, center }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (mapRef.current && center.lat && center.lng) {
      const map = new google.maps.Map(mapRef.current, {
        center,
        zoom: 12,
      });

      clinics.forEach((clinic) => {
        new google.maps.Marker({
          position: clinic.location,
          map,
          title: clinic.name,
        });
      });
    }
  }, [clinics, center]);

  return <div id="map" ref={mapRef} className="w-full h-96"></div>;
};

export default MapDisplay;
