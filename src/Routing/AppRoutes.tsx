import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import App from "../App";
import { ErrorPage } from "../pages/ErrorPage/ErrorPage";
import { useState } from "react";
import { PrivateRoutes } from "./PrivateRoutes";
import { AuthPage } from "../pages/AuthPage";
import { Error404 } from "../features/Error/404";
import GlobalStyles from "../styles/GlobalStyles";

const AppRoutes = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <>
      <GlobalStyles />

      <BrowserRouter basename="/">
        <Routes>
          <Route element={<App />}>
            <Route path="error/*" element={<ErrorPage />} />
            <Route path="logout" element={<div>Logout page</div>}></Route>
            {isLoggedIn ? (
              <>
                <Route path="/*" element={<PrivateRoutes />} />
                <Route index element={<Navigate to="/dashboard" />} />
              </>
            ) : (
              <>
                <Route path="auth/*" element={<AuthPage />} />
                <Route path="*" element={<Navigate to="/auth" />} />
              </>
            )}
            <Route path="*" element={<Error404 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
export { AppRoutes };
