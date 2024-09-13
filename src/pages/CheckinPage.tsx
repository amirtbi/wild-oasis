import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../ui/Button";

const H1 = styled.h1`
  font-size: 20px;
  font-family: "poppins";
  padding: 1rem;
`;
export const CheckinPage = () => {
  return (
    <>
      <div>
        <H1>Check in -out page</H1>
        <div>
          <Link to="/dashboard">Dashboard</Link>
          <Button color="secondary">Material ui button</Button>
          <p className="text-red-700">own text</p>
        </div>
      </div>
    </>
  );
};
