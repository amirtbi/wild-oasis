import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import Spinner from "../../ui/Spinner";
import { CabinRow } from "./CabinRow";
import { Table } from "../../ui/Table";

export const CabinTable = () => {
  const { isLoading, data: cabins } = useQuery({
    queryKey: ["cabin"],
    queryFn: getCabins,
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <>
          <Table.Header>
            <div></div>
            <div>Cabin</div>
            <div>CAPACITY</div>
            <div>PRICE</div>
            <div>DISCOUNT</div>
            <div>Action</div>
          </Table.Header>
          <Table.Body
            data={cabins}
            render={(cabin) => (
              <>
                <CabinRow cabin={cabin} key={cabin.id} />
              </>
            )}
          />
        </>
      </Table>
    </>
  );
};
