import Row from "../ui/Row";
import Heading from "../ui/Heading";
import { CabinTable } from "../features/cabins/CabinTable";
import { CreateCabinForm } from "../features/cabins/CreateCabinForm";

export const CabinPage = () => {
  return (
    <>
      <Row type="horizontal">
        <Heading type="h1">All cabins</Heading>
        <Row type="horizontal">
          <p>Filter / Sort</p>
        </Row>
      </Row>
      <Row>
        <CabinTable />
        <CreateCabinForm></CreateCabinForm>
      </Row>
    </>
  );
};
