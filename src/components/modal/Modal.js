import { Fragment } from "react/cjs/react.production.min";
import SideMenu from "../../UI/SideMenu";
import Backdrop from "./Backdrop";

const Modal = (props) => {
    return (
        <Fragment>
            <Backdrop onClick={props.onClick} />
            <SideMenu />
        </Fragment>
    )
}

export default Modal;