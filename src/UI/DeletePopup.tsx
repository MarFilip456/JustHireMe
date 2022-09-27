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
      <h3>Do you really want to delete this offer?</h3>
      <p>There is no coming back</p>
      <Button styles={classes.delete_card__button} onClick={declineHandler}>
        No
      </Button>
      <Button styles={classes.delete_card__button} onClick={confirmHandler}>
        Yes
      </Button>
    </Card>
  );
};

export default DeletePopup;
