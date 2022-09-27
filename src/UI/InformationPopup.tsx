import { useAppDispatch, useAppSelector } from '../store/redux-hooks';
import { uiActions } from '../store/ui-slice';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const InformationPopup = () => {
  const dispatch = useAppDispatch();
  const informationString = useAppSelector(
    (state) => state.ui.informationString
  );
  const openSnackBar = useAppSelector((state) => state.ui.visibleInformation);
  const isError = useAppSelector((state) => state.ui.informationError);
  const closeHandler = () => {
    dispatch(uiActions.changeInformationPopup());
    dispatch(uiActions.showInformation(null));
    if (isError) {
      dispatch(uiActions.setInformationError());
    }
  };
  const alertSeverity = isError ? 'error' : 'success';

  return (
    <Snackbar
      open={openSnackBar}
      onClose={closeHandler}
      autoHideDuration={4000}
    >
      <Alert severity={alertSeverity} onClose={closeHandler}>
        {informationString}
      </Alert>
    </Snackbar>
  );
};

export default InformationPopup;
