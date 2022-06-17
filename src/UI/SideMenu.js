import ReusableButton from "./ReusableButton";
import classes from "./SideMenu.module.css";

const SideMenu = () => {
    return (
<div className={classes.sideMenu} >
    <h1>MENU</h1>
    <h2> Sign in to see more </h2>
    <ReusableButton/>
</div>
    );
};

export default SideMenu;