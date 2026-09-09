import { doc, updateDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";

const useLocation = () => {
  const [location, setLocation] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const watch = () => {
      navigator.geolocation.getCurrentPosition(
        position => {
          setLocation({
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
            latitudeDelta: 0.009,
            longitudeDelta: 0.009,
          });
        },
        // eslint-disable-next-line no-shadow
        errorr => {
          setError(errorr);
        },
        {}
      );
    };
    watch();
  }, []);
  return { location, error };
};

export default useLocation;
