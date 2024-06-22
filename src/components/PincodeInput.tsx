import React, { useState } from "react";
import { BeatLoader } from "react-spinners";

interface PincodeInputProps {
  onPincodeSubmit: (pincode: string) => void;
  onDetectLocation: () => void;
  loading: boolean;
}

const PincodeInput: React.FC<PincodeInputProps> = ({
  onPincodeSubmit,
  onDetectLocation,
  loading,
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
          className="p-2 border rounded w-full"
        />
        <button
          type="submit"
          className="mt-2 p-2 bg-blue-500 text-white rounded w-full flex justify-center items-center"
        >
          {loading ? <BeatLoader size={8} color="#fff" /> : "Search by Pincode"}
        </button>
      </form>
      <button
        onClick={onDetectLocation}
        className="p-2 bg-green-500 text-white rounded w-full flex justify-center items-center"
      >
        {loading ? <BeatLoader size={8} color="#fff" /> : "Detect My Location"}
      </button>
    </div>
  );
};

export default PincodeInput;
