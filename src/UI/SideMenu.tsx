import Button from "./Button";
import classes from "./SideMenu.module.css";
import { useAppSelector, useAppDispatch } from "../store/redux-hooks";
import { useNavigate } from "react-router-dom";
import { uiActions } from "../store/ui-slice";

const SideMenu = () => {
  const isLogged = useAppSelector((state) => state.ui.isLoggedIn);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const navigateHandler = () => {
    navigate("/dev/profile");
    dispatch(uiActions.changeVisSide());
  };

  return (
    <div className={classes.sideMenu}>
      <h1>MENU</h1>
      {isLogged ? (
        <Button onClick={navigateHandler}>User Profile</Button>
      ) : (
        <h2> Sign in to see more </h2>
      )}
      <Button />
    </div>
  );
};

export default SideMenu;
