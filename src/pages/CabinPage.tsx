import Row from "../ui/Row";
import Heading from "../ui/Heading";
import { CabinTable } from "../features/cabins/CabinTable";
import { CreateCabinForm } from "../features/cabins/CreateCabinForm";
import { useState } from "react";
import { Modal, Overlay } from "../ui/Modal";
import ButtonIcon from "../ui/ButtonIcon";
import { HiMiniPlusSmall } from "react-icons/hi2";

export const CabinPage = () => {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <Row type="horizontal">
        <Heading type="h1">All cabins</Heading>
        <Row type="horizontal">
          <ButtonIcon onClick={() => setShowForm((prev) => !prev)}>
            <HiMiniPlusSmall />
          </ButtonIcon>
          <p>Filter / Sort</p>
        </Row>
      </Row>
      <Row>
        <CabinTable />
        {showForm && (
          <Overlay>
            <Modal>
              <CreateCabinForm
                type="modal"
                onShowForm={setShowForm}
              ></CreateCabinForm>
            </Modal>
          </Overlay>
        )}
      </Row>
    </>
  );
};
