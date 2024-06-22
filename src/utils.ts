export const calculateDistance = (
  loc1: { lat: number; lng: number },
  loc2: { lat: number; lng: number }
) => {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371; // Radius of Earth in km
  const dLat = toRad(loc2.lat - loc1.lat);
  const dLng = toRad(loc2.lng - loc1.lng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(loc1.lat)) *
      Math.cos(toRad(loc2.lat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

export const geocodePincode = async (pincode: string) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${pincode}&key=${process.env.REACT_APP_GOOGLE_MAPS_API}`
  );
  const data = await response.json();
  console.log("data", data);
  if (data.status === "OK") {
    const location = data.results[0].geometry.location;
    return { lat: location.lat, lng: location.lng };
  } else {
    throw new Error("Invalid pincode");
  }
};
