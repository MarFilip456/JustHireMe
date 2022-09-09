import Card from './Card';
import Button from './Button';
import { useAppDispatch } from '../store/redux-hooks';
import { uiActions } from '../store/ui-slice';
import useDeleteOffer from '../hooks/use-deleteOffer';
import { useParams, useNavigate } from 'react-router-dom';

import classes from './DeletePopup.module.css';

const DeletePopup = () => {
  const dispatch = useAppDispatch();
  const params = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const deleteOffer = useDeleteOffer(params.jobId!);
  const declineHandler = () => {
    dispatch(uiActions.changeDeletePopup());
  };
  const confirmHandler = () => {
    deleteOffer();
    dispatch(uiActions.changeDeletePopup());
    navigate('/');
  };

  return (
    <Card styles={classes.delete_card}>
      <p>Do you want to delete this offer?</p>
      <Button onClick={declineHandler}>No</Button>
      <Button onClick={confirmHandler}>Yes</Button>
    </Card>
  );
};

export default DeletePopup;
