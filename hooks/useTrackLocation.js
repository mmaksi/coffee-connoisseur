import { useState, useContext } from "react";
import { StoreContext } from "../store/coffeeStores.context";
import ACTION_TYPES from "../store/coffeeStores.types";

export const useTrackLocation = () => {
  const [locationErrorMsg, setLocationErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useContext(StoreContext);

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    dispatch({
      type: ACTION_TYPES.SET_COORDS,
      payload: `${latitude}%2C${longitude}`,
    });
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
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return {
    isLoading,
    locationErrorMsg,
    handleTrackLocation,
  };
};
