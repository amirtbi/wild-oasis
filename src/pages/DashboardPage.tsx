import { useNavigate } from "react-router-dom";
import Row from "../ui/Row";
import Heading from "../ui/Heading";
import Select, { SelectComponent } from "../ui/Select";

export const DashboardPage = () => {
  return (
    <>
      <Row>
        <Heading type="h2" className="font-bold">
          Dashboard page
        </Heading>
        <SelectComponent />

        <Select>
          <Select.Parent>
            <Select.Option optionVal="1" />
            <Select.Option optionVal="2" />
            <Select.Option optionVal="3" />
            <Select.Option optionVal="4" />
          </Select.Parent>
        </Select>
      </Row>
    </>
  );
};
