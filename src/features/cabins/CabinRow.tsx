import { styled } from "styled-components";
import { ICabins } from "./cabins.model";
import { formatCurrency } from "../../utils/helper";
import { deleteCabin } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { CreateCabinForm } from "./CreateCabinForm";
import { Button } from "../../ui/Button";
import Modal from "../../ui/Modal";
import { HiMiniPencil, HiMiniPencilSquare, HiMiniTrash } from "react-icons/hi2";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { Table } from "../../ui/Table";
import Menus from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

export const CabinRow = ({ cabin }: { cabin: ICabins }) => {
  const queryClient = useQueryClient();
  const { mutate: deleteCabinReq, isPending } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      toast.success("Deleted successfully!");
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
    },
    onError: () => {
      toast.error("Deletion process failed!");
    },
  });

  return (
    <Table.Row>
      <Img src={cabin.image} alt="cabin"></Img>
      <Cabin>{cabin.name}</Cabin>
      <div>fits up {cabin.maxCapacity} guests</div>
      <Price>{formatCurrency(cabin.regularPrice)}</Price>
      <Discount>{formatCurrency(cabin.discount)}</Discount>
      <div>
        <Modal>
          <Modal.Open opens="edit-cabin-form">
            <Button variant="secondary">
              <HiMiniPencilSquare />
            </Button>
          </Modal.Open>
          <Modal.Window name="edit-cabin-form">
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>
        </Modal>
        <Modal>
          <Modal.Open opens="remove-cabin">
            <Button variant="secondary" disabled={isPending}>
              <HiMiniTrash />
            </Button>
          </Modal.Open>
          <Modal.Window name="remove-cabin">
            <ConfirmDelete
              resourceName="cabins"
              onConfirm={() => deleteCabinReq(cabin.id)}
              disabled={isPending}
            />
          </Modal.Window>
        </Modal>
        <Menus.Menu>
          <Menus.Toggle id={cabin.id.toString()} />
          <Menus.List id={cabin.id.toString()}>
            <Menus.Button
              icon={<HiMiniPencil />}
              onClick={() => console.log("asa")}
            >
              Duplicate
            </Menus.Button>
            <Menus.Button
              icon={<HiMiniPencil />}
              onClick={() => console.log("asa")}
            >
              Edit
            </Menus.Button>
            <Menus.Button
              icon={<HiMiniPencil />}
              onClick={() => console.log("asa")}
            >
              Delete
            </Menus.Button>
          </Menus.List>
        </Menus.Menu>
      </div>
    </Table.Row>
  );
};
