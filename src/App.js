import { Route, Routes } from "react-router-dom";
import { Fragment, useState } from "react";
import MainPage from "./pages/MainPage";
import JobDescription from "./pages/JobDescription";
import Header from "./UI/Header";
import Modal from "./components/modal/Modal";

function App() {
const [modalShown, setModalShown] = useState(false);

  const backdropHandler = () => {
    setModalShown(false);
  };

  const modalHandler = () => {
    setModalShown(true);
  }

  return (
    <Fragment>
      {modalShown && <Modal onClick={backdropHandler} />}
      <Header onClick={modalHandler} />
      <main>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="mainpage" element={<MainPage/>} />
          <Route path="jobdescr" element={<JobDescription />} />
        </Routes>
      </main>
    </Fragment>
  );
}

export default App;
