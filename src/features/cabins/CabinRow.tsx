import { styled } from "styled-components";
import { ICabins } from "./cabins.model";
import { formatCurrency } from "../../utils/helper";
import { deleteCabin } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { CreateCabinForm } from "./CreateCabinForm";
import { Button } from "../../ui/Button";
import Modal from "../../ui/Modal";
import { HiMiniPencilSquare, HiMiniTrash } from "react-icons/hi2";
import ConfirmDelete from "../../ui/ConfirmDelete";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

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
    <TableRow>
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
      </div>
    </TableRow>
  );
};
