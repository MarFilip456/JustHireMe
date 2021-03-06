import { Route, Routes } from "react-router-dom";
import { Fragment } from "react";
import { uiActions } from "./store/ui-slice";
import { useAppDispatch, useAppSelector } from "./store/redux-hooks";

import MainPage from "./pages/MainPage";
import JobPage from "./pages/JobPage";
import MapPage from "./pages/MapPage";
import DevPage from "./pages/DevPage";
import EmplPage from "./pages/EmplPage";
import Header from "./UI/Header";
import Modal from "./components/modal/Modal";
import DevLoginPage from "./pages/DevLoginPage";
import DevNewAccPage from "./pages/DevNewAccPage";
import EmplLoginPage from "./pages/EmplLoginPage";
import EmplNewAccPage from "./pages/EmplNewAccPage";
import LoginPopup from "./UI/LoginPopup";
import SideMenu from "./UI/SideMenu";

import classes from "./App.module.css";

function App() {
  const sideVisible = useAppSelector((state) => state.ui.visibleSide);
  const popupVisible = useAppSelector((state) => state.ui.visiblePopup);
  const isLoggedIn = useAppSelector((state) => state.ui.isLoggedIn);
  const isDev = useAppSelector((state) => state.ui.isDev);
  const dispatch = useAppDispatch();
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
          <Route path="/empllogin" element={<EmplLoginPage />} />
          <Route path="/emplregister" element={<EmplNewAccPage />} />
          {isDev && (
            <Route
              path="/dev/profile"
              element={isLoggedIn ? <DevPage /> : <DevLoginPage />}
            />
          )}
          {!isDev && (
            <Route
              path="/empl/profile"
              element={isLoggedIn ? <EmplPage /> : <EmplLoginPage />}
            />
          )}
          <Route path="*" element={<MainPage />} />
        </Routes>
      </div>
    </Fragment>
  );
}

export default App;
