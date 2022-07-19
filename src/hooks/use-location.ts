import { useCallback, useEffect, useState } from "react";

const useLocation = (address: string) => {
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);

  const getNumbers = useCallback(async () => {
    setLoading(true);
    try {
      const myAPIKey = process.env.REACT_APP_MAP_KEY;
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${myAPIKey}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const responseData = await response.json();
      setLat(responseData.results[0].geometry.location.lat);
      setLng(responseData.results[0].geometry.location.lng);
    } catch (errorMes) {
      setError(true);
      console.log(errorMes);
    }
    setLoading(false);
  }, [address]);

useEffect(()=>{
    getNumbers();
}, [getNumbers])

return {error, loading, lat, lng}

};

export default useLocation;
