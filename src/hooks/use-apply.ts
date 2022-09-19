import axios from 'axios';
import { useAppDispatch } from '../store/redux-hooks';
import { uiActions } from '../store/ui-slice';

const useApply = (jobId: string) => {
  const dispatch = useAppDispatch();
  const actualApply = () => {
    const token = localStorage.getItem('justHireMeToken');
    const url = process.env.REACT_APP_API_ADRESS;
    const continueUrl = `/offer/apply/${jobId}`;
    axios
      .patch(
        url!.concat(continueUrl),
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      .then((response) => {
        if (response.status === 200) {
          dispatch(uiActions.changeInformationPopup());
          dispatch(
            uiActions.showInformation(
              `You applied for position ${response.data.jobPosition} at ${response.data.companyName}`
            )
          );
        }
      })
      .catch((error) => {
        dispatch(uiActions.changeInformationPopup());
        dispatch(uiActions.setInformationError());
        dispatch(uiActions.showInformation(`Error occured: ${error.message}.`));
      });
  };
  return actualApply;
};

export default useApply;
