import React, { useState } from "react";

interface PincodeInputProps {
  onPincodeSubmit: (pincode: string) => void;
  onDetectLocation: () => void;
}

const PincodeInput: React.FC<PincodeInputProps> = ({
  onPincodeSubmit,
  onDetectLocation,
}) => {
  const [pincode, setPincode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPincodeSubmit(pincode);
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          placeholder="Enter pincode"
          className="p-2 border rounded"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Submit
        </button>
        <button
          type="button"
          onClick={onDetectLocation}
          className="p-2 bg-green-500 text-white rounded"
        >
          Use My Location
        </button>
      </form>
    </div>
  );
};

export default PincodeInput;
