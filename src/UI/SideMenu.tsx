import Button from "./Button";
import classes from "./SideMenu.module.css";
import { useAppSelector } from '../store/redux-hooks';

const SideMenu = () => {
  const isLogged = useAppSelector(
    (state) => state.ui.isLoggedIn
  );
  return (
    <div className={classes.sideMenu}>
      <h1>MENU</h1>
      {isLogged ? <h2>More</h2> : <h2> Sign in to see more </h2>}
      <Button />
    </div>
  );
};

export default SideMenu;
