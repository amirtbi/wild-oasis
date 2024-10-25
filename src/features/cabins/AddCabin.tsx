import { CreateCabinForm } from "./CreateCabinForm";
import { Button } from "../../ui/Button";
import Modal from "../../ui/Modal";
import { CabinTable } from "./CabinTable";

// export const AddCabin = () => {
//   const [show, setShow] = useState(false);
//   return (
//     <>
//       <div>
//         {show && (
//           <Modal onClose={() => setShow(false)}>
//             <CreateCabinForm onShow={() => setShow(false)} />
//           </Modal>
//         )}
//         <Button size="medium" onClick={() => setShow((show) => !show)}>
//           Add Cabin
//         </Button>
//       </div>
//     </>
//   );
// };

export const AddCabin = () => {
  return (
    <>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button size="medium">Add Cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
      <Modal>
        <Modal.Open opens="table">
          <Button size="medium">Show table</Button>
        </Modal.Open>
        <Modal.Window name="table">
          <CabinTable />
        </Modal.Window>
      </Modal>
    </>
  );
};
