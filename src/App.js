import { Route, Routes } from "react-router-dom";
import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { changeVisSide } from "./store/ui-slice";

import MainPage from "./pages/MainPage";
import JobPage from "./pages/JobPage";
import Header from "./UI/Header";
import Modal from "./components/modal/Modal";

function App() {
  const isVisible = useSelector((state) => state.ui.visibleSide);
  const dispatch = useDispatch();

  return (
    <Fragment>
      {isVisible && <Modal onClick={() => dispatch(changeVisSide())} />}
      <Header onClick={() => dispatch(changeVisSide())} />
      <main>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="mainpage" element={<MainPage />} />
          <Route path="mainpage/jobdescr/:jobId" element={<JobPage />} />
          <Route path="*" exact element={<MainPage />} />
        </Routes>
      </main>
    </Fragment>
  );
}

export default App;
