import { useNavigate } from "react-router-dom";
import Row from "../ui/Row";
import Heading from "../ui/Heading";

export const DashboardPage = () => {
  return (
    <>
      <Row>
        <Heading type="h2" className="font-bold">
          Dashboard page
        </Heading>
      </Row>
    </>
  );
};
