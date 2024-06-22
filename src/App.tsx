import React, { useState } from "react";
import PincodeInput from "./components/PincodeInput";
import MapDisplay from "./components/MapDisplay";
import { fetchClinics } from "./api";
import { calculateDistance, geocodePincode } from "./utils";

const App: React.FC = () => {
  const [clinics, setClinics] = useState<any[]>([]);
  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  });
  const [error, setError] = useState<string | null>(null);

  const handlePincodeSubmit = async (pincode: string) => {
    try {
      const location = await geocodePincode(pincode);
      const clinics: any = await fetchClinics(location);
      setCenter(location);
      setClinics(
        clinics.sort(
          (a: any, b: any) =>
            calculateDistance(location, a.location) -
            calculateDistance(location, b.location)
        )
      );
      setError(null);
    } catch (err) {
      setError(err as string);
    }
  };

  const handleDetectLocation = async () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          const clinics: any = await fetchClinics(location);
          setCenter(location);
          setClinics(
            clinics.sort(
              (a: any, b: any) =>
                calculateDistance(location, a.location) -
                calculateDistance(location, b.location)
            )
          );
          setError(null);
        } catch (err) {
          setError(err as string);
        }
      },
      (err) => {
        setError("Failed to detect location");
      }
    );
  };

  return (
    <div className="flex flex-col items-center p-4">
      <PincodeInput
        onPincodeSubmit={handlePincodeSubmit}
        onDetectLocation={handleDetectLocation}
      />
      {error && <p className="text-red-500">{error}</p>}
      <MapDisplay clinics={clinics} center={center} />
      <ul className="mt-4 w-full">
        {clinics.map((clinic, index) => (
          <li key={index} className="p-2 border-b">
            <h2 className="font-bold">{clinic.name}</h2>
            <p>{clinic.address}</p>
            <p>
              {calculateDistance(center, clinic.location).toFixed(2)} km away
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
