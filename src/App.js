import { Route, Routes } from "react-router-dom";
import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { uiActions } from "./store/ui-slice";

import MainPage from "./pages/MainPage";
import JobPage from "./pages/JobPage";
import MapPage from "./pages/MapPage";
import Header from "./UI/Header";
import Modal from "./components/modal/Modal";

function App() {
  const isVisible = useSelector((state) => state.ui.visibleSide);
  const dispatch = useDispatch();
  return (
    <Fragment>
      {isVisible && (
        <Modal onClick={() => dispatch(uiActions.changeVisSide())} />
      )}
      <Header onClick={() => dispatch(uiActions.changeVisSide())} />
      <main>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/jobdescr/:jobId" element={<JobPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="*" exact element={<MainPage />} />
        </Routes>
      </main>
    </Fragment>
  );
}

export default App;
