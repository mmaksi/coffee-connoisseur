const { useState } = require("react");

export const useTrackLocation = () => {
  const [locationErrorMsg, setLocationErrorMsg] = useState("");
  const [coords, setCoords] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    setCoords(`${latitude}%2C${longitude}`);
    setLocationErrorMsg("");
    setIsLoading(false);
  }

  const error = () => {
    setIsLoading(false);
    setLocationErrorMsg("Unable to retrieve your location");
  };

  const handleTrackLocation = () => {
    setIsLoading(true);

    if (!navigator.geolocation) {
      setLocationErrorMsg("Geolocation is not supported by your browser");
      setIsLoading(false);
    } else {
      //   status.textContent = "Locating…";
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return {
    coords,
    isLoading,
    locationErrorMsg,
    handleTrackLocation,
  };
};
