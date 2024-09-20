import { useEffect, useState } from "react";
import Row from "../ui/Row";
import { getCabins } from "../services/apiCabins";
import { ICabins } from "../features/cabins/cabins.model";
import Heading from "../ui/Heading";

export const CabinPage = () => {
  const [cabins, setCabins] = useState<ICabins[]>([]);
  useEffect(() => {
    async function fetchCabins() {
      const data = await getCabins();
      if (data.length) {
        setCabins(data);
      }
    }

    fetchCabins();
  }, []);
  return (
    <>
      <Row>
        <h1>Cabin page</h1>
        <div>
          {cabins.map((cabin, index) => (
            <>
              <img key={index} src={cabin.image} />
              <Row>
                <Heading type="h2">{cabin.name}</Heading>
                <Heading type="h3">{cabin.description}</Heading>
                <Row type="horizontal">
                  <div>
                    <span>Capacity:</span>
                    {cabin.maxCapacity}
                  </div>

                  <div>
                    <span>Discount:</span>
                    {cabin.discount}
                  </div>
                </Row>
              </Row>
            </>
          ))}
        </div>
      </Row>
    </>
  );
};
