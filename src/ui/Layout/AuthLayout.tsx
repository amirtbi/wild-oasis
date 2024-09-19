import { Outlet } from "react-router-dom";
import Row from "../Row";
import Heading from "../Heading";

export const AuthLayout = () => {
  return (
    <>
      <Row type="vertical">
        <Row>
          <Heading type="h1">Auth layout</Heading>
        </Row>
        <Outlet />
      </Row>
    </>
  );
};
