import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import App from "../App";
import { ErrorPage } from "../pages/ErrorPage/ErrorPage";
import { useState } from "react";
import { PrivateRoutes } from "./PrivateRoutes";
import { AuthPage } from "../pages/AuthPage";
import { Error404 } from "../features/Error/404";
import GlobalStyles from "../styles/GlobalStyles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});
const AppRoutes = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
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
        <Toaster
          position="top-right"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
              fontSize: "16px",
              padding: "16px 24px",
            },
          }}
        />
      </QueryClientProvider>
    </>
  );
};
export { AppRoutes };
