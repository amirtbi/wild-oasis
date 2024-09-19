import { Link } from "react-router-dom";
import Heading from "../../ui/Heading";

export const Error404 = () => {
  return (
    <>
      <Heading type="h1">Error 404</Heading>
      <Link to="/dashboard">Go to dashboard page</Link>
    </>
  );
};
