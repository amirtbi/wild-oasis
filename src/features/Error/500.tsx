import { Link } from "react-router-dom";
import Heading from "../../ui/Heading";

export const Error500 = () => {
  return (
    <>
      <Heading type="h1">Error 500</Heading>
      <Link to="/dashbaord">Go to dashboard page</Link>
    </>
  );
};
