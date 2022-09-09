import axios from 'axios';
import { useEffect, useState } from 'react';
import { offerObject } from '../store/offers-slice';

const useSingleOffer = (offerId: string) => {
  const [offer, setOffer] = useState<offerObject | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    axios
      .get(`${process.env.REACT_APP_API_ADRESS}/offer/${offerId}`)
      .then((response) => {
        setLoading(false);
        setOffer(response.data);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  }, [offerId]);
  return { data: offer, loading, error };
};

export default useSingleOffer;
