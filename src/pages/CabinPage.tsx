import Row from "../ui/Row";
import Heading from "../ui/Heading";
import { CabinTable } from "../features/cabins/CabinTable";

export const CabinPage = () => {
  return (
    <>
      <Row type="horizontal">
        <Heading type="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>
      <Row>
        <CabinTable />
      </Row>
    </>
  );
};
