import axios from 'axios';
import { useQueryClient } from 'react-query';
import { useAppSelector, useAppDispatch } from '../store/redux-hooks';
import { uiActions } from '../store/ui-slice';

const useAddOffer = () => {
  const useQuery = useQueryClient();
  const dispatch = useAppDispatch();
  const token = localStorage.getItem('justHireMeToken');
  const url = process.env.REACT_APP_API_ADRESS;
  const offer = useAppSelector((state) => state.offers.addingOffer);
  const addOffer = () => {
    const date = new Date();
    axios
      .post(
        url!.concat('/offer'),
        {
          ...offer,
          date: {
            day: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear()
          }
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      ).then((response) => {
        useQuery.invalidateQueries(['offers']);
        if (response.status === 201) {
          dispatch(uiActions.changeInformationPopup());
          dispatch(uiActions.showInformation('Offer added!'));
        }
      })
      .catch((error) => {
        dispatch(uiActions.changeInformationPopup());
        dispatch(uiActions.setInformationError());
        dispatch(uiActions.showInformation(`Error occured: ${error.message}.`));
      });
  };
  return addOffer;
};

export default useAddOffer;
