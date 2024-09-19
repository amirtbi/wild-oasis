import { Route, Routes } from "react-router-dom";
import { AuthLayout } from "../ui/Layout/AuthLayout";
import { LoginPage } from "./LoginPage";

export const AuthPage = () => {
  return (
    <>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />}></Route>
          <Route path="forget-password" element={<LoginPage />}></Route>
          <Route path="registration" element={<LoginPage />}></Route>
        </Route>
      </Routes>
    </>
  );
};
