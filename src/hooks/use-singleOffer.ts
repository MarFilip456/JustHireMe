import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../store/redux-hooks';
import { offerObject } from '../store/offers-slice';

const useSingleOffer = (offerId: string) => {
  const [offer, setOffer] = useState<offerObject | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const previewOffer = useAppSelector((state) => state.offers.addingOffer);

  useEffect(() => {
    setLoading(true);
    setError(false);
    if (offerId === 'preview') {
      setOffer(previewOffer);
    } else {
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
    }
  }, [offerId]);
  return { data: offer, loading, error };
};

export default useSingleOffer;
