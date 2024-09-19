import { Link } from "react-router-dom";
import { Button } from "../ui/Button";
import Heading from "../ui/Heading";

export const CheckinPage = () => {
  return (
    <>
      <div>
        <Heading type="h1">Check in -out page</Heading>
        <Heading type="h2">Forms</Heading>
        <div>
          <Link to="/dashboard">Dashboard</Link>
          <Button variant="primary" size="medium" color="secondary">
            Material ui button
          </Button>
          <p className="text-red-700">own text</p>
        </div>
      </div>
    </>
  );
};
