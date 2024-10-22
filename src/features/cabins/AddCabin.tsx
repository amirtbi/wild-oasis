import { useState } from "react";
import { CreateCabinForm } from "./CreateCabinForm";
import { Button } from "../../ui/Button";
import { Modal } from "../../ui/Modal";

export const AddCabin = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <div>
        {show && (
          <Modal onClose={() => setShow(false)}>
            <CreateCabinForm onShow={() => setShow(false)} />
          </Modal>
        )}
        <Button size="medium" onClick={() => setShow((show) => !show)}>
          Add Cabin
        </Button>
      </div>
    </>
  );
};
