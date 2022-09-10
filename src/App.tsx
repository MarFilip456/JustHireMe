import { Route, Routes } from 'react-router-dom';
import { uiActions } from './store/ui-slice';
import { useAppDispatch, useAppSelector } from './store/redux-hooks';
import { useEffect } from 'react';
import MainPage from './pages/MainPage';
import JobPage from './pages/JobPage';
import DevPage from './pages/DevPage';
import EmplPage from './pages/EmplPage';
import AddOfferPage from './pages/AddOfferPage';
import Header from './UI/Header';
import Modal from './components/modal/Modal';
import LoginPage from './pages/LoginPage';
import EmplNewAccPage from './pages/EmplNewAccPage';
import DevNewAccPage from './pages/DevNewAccPage';
import LoginPopup from './UI/LoginPopup';
import InformationPopup from './UI/InformationPopup';
import SideMenu from './UI/SideMenu';

import classes from './App.module.css';

function App () {
  const sideVisible = useAppSelector((state) => state.ui.visibleSide);
  const popupVisible = useAppSelector((state) => state.ui.visiblePopup);
  const informationVisible = useAppSelector((state) => state.ui.visibleInformation);
  const isLoggedIn = useAppSelector((state) => state.ui.isLoggedIn);
  const isDev = useAppSelector((state) => state.ui.isDev);
  const dispatch = useAppDispatch();
  const appClasses = informationVisible ? classes.hiddenScroll : classes.overallDisp;
  const sideMenuClasses = sideVisible ? '' : classes.hideSideMenu;
  useEffect(() => {
    if (informationVisible) {
      window.scrollTo(0, 0);
    }
  }, [informationVisible])
  return (
    <>
      <div className={appClasses}>
        {sideVisible && <Modal onClick={() => dispatch(uiActions.changeVisSide())} />}
         <SideMenu styles={sideMenuClasses} />
        {popupVisible && (
          <Modal
            onClick={() => dispatch(uiActions.changeVisPopup())}
            styles={classes.popup_backdrop}
          >
            <LoginPopup />
          </Modal>
        )}
        {informationVisible && (
            <InformationPopup />
        )}
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/jobdescr/:jobId" element={<JobPage />} />
          {!isLoggedIn && <Route path="/login" element={<LoginPage />} />}
          {!isLoggedIn && (
            <Route path="/devregister" element={<DevNewAccPage />} />
          )}
          {!isLoggedIn && (
            <Route path="/emplregister" element={<EmplNewAccPage />} />
          )}
          {isDev && (
            <Route
              path="/dev/profile"
              element={isLoggedIn ? <DevPage /> : <LoginPage />}
            />
          )}
          {!isDev && (
            <Route
              path="/empl/profile"
              element={isLoggedIn ? <EmplPage /> : <LoginPage />}
            />
          )}
          {!isDev && (
            <Route
              path="/empl/addOffer"
              element={isLoggedIn ? <AddOfferPage /> : <LoginPage />}
            />
          )}
          <Route path="*" element={<MainPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
