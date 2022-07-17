import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailsPage from "./pages/DetailsPage";
import UploadFile from "./components/organisms/UploadFile";
import { DETAILS_ROUTE, HOME_ROUTE } from "./routes";

function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/">
        <Routes>
          <Route exact path={HOME_ROUTE} element={<UploadFile />} />
          <Route exact path={DETAILS_ROUTE} element={<DetailsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
