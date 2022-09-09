import axios from 'axios';
import { useEffect, useState } from 'react';
import { devType } from '../store/updateDev-slice';

const useSingleUser = (devId: string) => {
  const [offer, setOffer] = useState<devType | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    axios
      .get(`${process.env.REACT_APP_API_ADRESS}/auth/${devId}`)
      .then((response) => {
        setLoading(false);
        setOffer(response.data);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  }, [devId]);
  return { data: offer, isLoading, isError };
};

export default useSingleUser;
