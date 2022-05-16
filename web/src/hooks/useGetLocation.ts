import { useState, useEffect } from "react";

const defaultCoords = [-23.55052, -46.633308];

export function useGetLocation() {
  const [coords, setCoords] = useState<number[] | null>(null);

  function onSucces(position: GeolocationPosition) {
    setCoords([position.coords.latitude, position.coords.longitude]);
  }

  function onError() {
    setCoords(defaultCoords);
  }

  useEffect(() => {
    try {
      navigator.geolocation.getCurrentPosition(onSucces, onError);
    } catch (error) {
      console.error("error on get location");
      setCoords(defaultCoords);
    }
  }, []);

  return { coords };
}
