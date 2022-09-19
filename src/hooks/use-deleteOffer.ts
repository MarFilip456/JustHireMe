import axios from 'axios';
import { useAppDispatch } from '../store/redux-hooks';
import { uiActions } from '../store/ui-slice';
import { useQueryClient } from 'react-query';

const useDeleteOffer = (offerId: string) => {
  const useQuery = useQueryClient();
  const dispatch = useAppDispatch();
  const token = localStorage.getItem('justHireMeToken');
  const url = process.env.REACT_APP_API_ADRESS;
  const wholeUrl = url?.concat(`/offer/${offerId}`);
  const deletingOffer = () => {
    axios
      .delete(wholeUrl!, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        if (response.status === 200) {
          dispatch(uiActions.changeInformationPopup());
          dispatch(uiActions.showInformation('Offer deleted!'));
        }
        useQuery.invalidateQueries(['offers']);
      })
      .catch((error) => {
        dispatch(uiActions.changeInformationPopup());
        dispatch(uiActions.showInformation(`Error occured: ${error.message}.`));
      });
  };
  return deletingOffer;
};

export default useDeleteOffer;
