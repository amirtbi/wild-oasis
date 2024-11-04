import { CreateCabinForm } from "./CreateCabinForm";
import { Button } from "../../ui/Button";
import Modal from "../../ui/Modal";

export const AddCabin = () => {
  return (
    <>
      <div>
        <Modal>
          <Modal.Open opens="cabin-form">
            <Button size="medium">Add Cabin</Button>
          </Modal.Open>
          <Modal.Window name="cabin-form">
            <CreateCabinForm />
          </Modal.Window>
        </Modal>
      </div>
    </>
  );
};
