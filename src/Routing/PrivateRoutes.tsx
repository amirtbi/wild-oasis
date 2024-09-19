import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "../ui/Layout/AppLayout";
import { CheckinPage } from "../pages/CheckinPage";
import { CabinPage } from "../pages/CabinPage";
import { UsersPage } from "../pages/UsersPage";
import { SettingsPage } from "../pages/SettingsPage";
import { AccountPage } from "../pages/AccountPage";
import { DashboardPage } from "../pages/DashboardPage";
import { BookingsPage } from "../pages/BookingsPage";

export const PrivateRoutes = () => {
  return (
    <>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="auth/*" element={<Navigate to="dashboard" />}></Route>
          <Route path="dashboard" element={<DashboardPage />}></Route>
          <Route path="check-in" element={<CheckinPage />} />
          <Route path="cabins" element={<CabinPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="bookings" element={<BookingsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="account" element={<AccountPage />} />
          <Route path="*" element={<Navigate to="/error/404" />} />
        </Route>
      </Routes>
    </>
  );
};
