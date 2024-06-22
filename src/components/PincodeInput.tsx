import React, { useState } from "react";
import { BeatLoader } from "react-spinners";

interface PincodeInputProps {
  onPincodeSubmit: (pincode: string) => void;
  onDetectLocation: () => void;
  pincodeLoading: boolean;
  locationLoading: boolean;
}

const PincodeInput: React.FC<PincodeInputProps> = ({
  onPincodeSubmit,
  onDetectLocation,
  pincodeLoading,
  locationLoading,
}) => {
  const [pincode, setPincode] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPincodeSubmit(pincode);
  };

  return (
    <div className="mb-4">
      <form onSubmit={handleSubmit} className="mb-2">
        <input
          type="text"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          placeholder="Enter pincode"
          className="p-2 border rounded w-full mb-2"
        />
        <div className="flex space-x-2">
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded flex-1 flex justify-center items-center h-10"
            disabled={pincodeLoading}
          >
            {pincodeLoading ? (
              <BeatLoader size={8} color="#fff" />
            ) : (
              "Search by Pincode"
            )}
          </button>
          <button
            type="button"
            onClick={onDetectLocation}
            className="p-2 bg-green-500 text-white rounded flex-1 flex justify-center items-center h-10"
            disabled={locationLoading}
          >
            {locationLoading ? (
              <BeatLoader size={8} color="#fff" />
            ) : (
              "Detect My Location"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PincodeInput;
