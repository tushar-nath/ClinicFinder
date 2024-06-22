export const fetchClinics = async (location: { lat: number; lng: number }) => {
  return new Promise((resolve, reject) => {
    const service = new google.maps.places.PlacesService(
      document.createElement("div")
    );
    const request = {
      query: "Clinic",
      location,
      radius: 5000,
    };

    service.textSearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        const clinics = results
          .map((place) => {
            if (place.geometry && place.geometry.location) {
              return {
                name: place.name,
                address: place.formatted_address,
                location: {
                  lat: place.geometry.location.lat(),
                  lng: place.geometry.location.lng(),
                },
              };
            } else {
              return null;
            }
          })
          .filter((clinic) => clinic !== null);
        resolve(clinics);
      } else {
        reject("No clinics found");
      }
    });
  });
};
