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
      let zoom = 14;
      if (clinics.length > 1) {
        zoom = 12;
      }

      const map: google.maps.Map = new google.maps.Map(mapRef.current, {
        center,
        zoom,
      });

      const infoWindow = new google.maps.InfoWindow();

      clinics.forEach((clinic) => {
        const marker = new google.maps.Marker({
          position: clinic.location,
          map,
          title: clinic.name,
        });

        marker.addListener("click", () => {
          const content = `
            <div>
              <h3 style="font-weight: bold; margin-bottom: 5px;">${clinic.name}</h3>
              <p>${clinic.address}</p>
            </div>
          `;
          infoWindow.setContent(content);
          infoWindow.open(map, marker);
        });
      });

      if (userLocation) {
        const userMarker = new google.maps.Marker({
          position: userLocation,
          map,
          title: "Your Location",
          icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          },
        });

        userMarker.addListener("click", () => {
          const content = `
            <div>
              <h3 style="font-weight: bold; margin-bottom: 5px;">Your Location</h3>
            </div>
          `;
          infoWindow.setContent(content);
          infoWindow.open(map, userMarker);
        });
      }

      if (clinics.length > 0 || userLocation) {
        const bounds = new google.maps.LatLngBounds();
        clinics.forEach((clinic) => bounds.extend(clinic.location));
        if (userLocation) bounds.extend(userLocation);
        map.fitBounds(bounds);

        const listener = google.maps.event.addListener(
          map,
          "idle",
          function () {
            const currentZoom = map.getZoom();
            if (currentZoom !== undefined && currentZoom > 15) {
              map.setZoom(15);
            }
            google.maps.event.removeListener(listener);
          }
        );
      }
    }
  }, [clinics, center, userLocation]);

  return <div id="map" ref={mapRef} className="w-full h-full"></div>;
};

export default MapDisplay;
