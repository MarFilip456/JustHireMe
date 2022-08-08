import Button from "./Button";
import classes from "./SideMenu.module.css";
import { useAppSelector, useAppDispatch } from "../store/redux-hooks";
import { useNavigate } from "react-router-dom";
import { uiActions } from "../store/ui-slice";

const SideMenu = () => {
  const isLogged = useAppSelector((state) => state.ui.isLoggedIn);
  const isDev = useAppSelector((state) => state.ui.isDev);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const navigateHandler = () => {
    if (isDev) {
      navigate("/dev/profile");
    } else {
      navigate("/empl/profile");
    }

    dispatch(uiActions.changeVisSide());
  };

  const navigateToFormHandler = () =>{
    navigate("/empl/addOffer");
    dispatch(uiActions.changeVisSide());
  }

  return (
    <div className={classes.sideMenu}>
      <h1>MENU</h1>
      {isLogged ? (
        <div>
          <Button onClick={navigateHandler}>
            {isDev ? "User Profile" : "Employer panel"}
          </Button>
          {!isDev && <Button onClick={navigateToFormHandler} >Add Offer</Button>}
        </div>
      ) : (
        <h2> Sign in to see more </h2>
      )}
    </div>
  );
};

export default SideMenu;
