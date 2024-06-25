import React, { useState, useEffect } from "react";
import PincodeInput from "./components/PincodeInput";
import MapDisplay from "./components/MapDisplay";
import { fetchClinics } from "./api";
import { calculateDistance, geocodePincode } from "./utils";
import { BeatLoader } from "react-spinners";

const App: React.FC = () => {
  const [clinics, setClinics] = useState<any[]>([]);
  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  });
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [loading] = useState<boolean>(false);
  const [pincodeLoading, setPincodeLoading] = useState<boolean>(false);
  const [locationLoading, setLocationLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setCenter({ lat: 0, lng: 0 });
  }, []);

  const handlePincodeSubmit = async (pincode: string) => {
    setPincodeLoading(true);
    try {
      console.log("Submitting pincode:", pincode);
      const location = await geocodePincode(pincode);
      console.log("Geocoded location:", location);
      const clinics: any = await fetchClinics(location);
      console.log("Fetched clinics:", clinics);
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
      console.error("Error:", err);
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setPincodeLoading(false);
    }
  };

  const handleDetectLocation = async () => {
    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(location);
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
          console.error("Error:", err);
          setError((err as Error).message);
        } finally {
          setLocationLoading(false);
        }
      },
      (err) => {
        console.error("Geolocation error:", err);
        setError("Failed to detect location");
        setLocationLoading(false);
      }
    );
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/3 p-4 flex flex-col">
        <PincodeInput
          onPincodeSubmit={handlePincodeSubmit}
          onDetectLocation={handleDetectLocation}
          pincodeLoading={pincodeLoading}
          locationLoading={locationLoading}
        />
        {error && <p className="text-red-500">{error}</p>}
        {clinics.length === 0 && !pincodeLoading && !locationLoading && (
          <p className="text-gray-500 mt-4">
            Enter a pincode or use location detection to find clinics.
          </p>
        )}
        <ul className="mt-4 overflow-y-auto flex-grow">
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
      <div className="w-2/3 h-full">
        {loading ? (
          <BeatLoader size={15} color="#123abc" loading={loading} />
        ) : (
          <MapDisplay
            clinics={clinics}
            center={center}
            userLocation={userLocation}
          />
        )}
      </div>
    </div>
  );
};

export default App;
