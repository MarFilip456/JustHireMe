import { Route, Routes } from "react-router-dom";
import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { uiActions } from "./store/ui-slice";

import MainPage from "./pages/MainPage";
import JobPage from "./pages/JobPage";
import MapPage from "./pages/MapPage";
import Header from "./UI/Header";
import Modal from "./components/modal/Modal";
import DevLoginPage from "./pages/DevLoginPage";
import DevNewAccPage from "./pages/DevNewAccPage";
import LoginPopup from "./UI/LoginPopup";
import SideMenu from "./UI/SideMenu";

import classes from "./App.module.css";

function App() {
  const sideVisible = useSelector((state) => state.ui.visibleSide);
  const popupVisible = useSelector((state) => state.ui.visiblePopup);
  const dispatch = useDispatch();
  return (
    <Fragment>
      <div className={classes.overallDisp}>
        {sideVisible && (
          <Modal onClick={() => dispatch(uiActions.changeVisSide())}>
            <SideMenu />
          </Modal>
        )}
        {popupVisible && (
          <Modal
            onClick={() => dispatch(uiActions.changeVisPopup())}
            styles={classes.popup_backdrop}
          >
            <LoginPopup />
          </Modal>
        )}
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/jobdescr/:jobId" element={<JobPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/devlogin" element={<DevLoginPage />} />
          <Route path="/devregister" element={<DevNewAccPage />} />
          <Route path="*" exact element={<MainPage />} />
        </Routes>
      </div>
    </Fragment>
  );
}

export default App;
