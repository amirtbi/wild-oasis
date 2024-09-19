import { Route, Routes } from "react-router-dom";
import { ErrorLayout } from "../../ui/Layout/ErrorLayout";
import { Error404 } from "../../features/Error/404";
import { Error500 } from "../../features/Error/500";

export const ErrorPage = () => {
  return (
    <>
      <Routes>
        <Route element={<ErrorLayout />}>
          <Route path="404" element={<Error404 />} />
          <Route path="500" element={<Error500 />} />
          <Route index element={<Error404 />} />
        </Route>
      </Routes>
    </>
  );
};
