import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DashboardPage } from "./pages/DashboardPage";
import { CheckinPage } from "./pages/CheckinPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<DashboardPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/checkin" element={<CheckinPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
