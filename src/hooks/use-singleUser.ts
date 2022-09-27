import axios from 'axios';
import { useEffect, useState } from 'react';
import { devType } from '../store/updateDev-slice';

const useSingleUser = () => {
  const [user, setUser] = useState<devType | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const token = localStorage.getItem('justHireMeToken');
  useEffect(() => {
    setLoading(true);
    setError(false);
    axios
      .get(
        `${process.env.REACT_APP_API_ADRESS}/auth`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      .then((response) => {
        setLoading(false);
        setUser(response.data);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  }, [token]);
  return { data: user, isLoading, isError };
};

export default useSingleUser;
