import { styled } from "styled-components";
import { ICabins } from "./cabins.model";
import { formatCurrency } from "../../utils/helper";
import { deleteCabin } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

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

export const CabinRow = (props: { cabin: ICabins }) => {
  const { cabin } = props;
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
    },
    onError: () => {
      alert("Deletion process failed!");
    },
  });

  return (
    <>
      <div>
        <TableRow>
          <Img src={cabin.image}></Img>
          <Cabin>{cabin.name}</Cabin>
          <div>fits up {cabin.maxCapacity} guests</div>
          <Price>{formatCurrency(cabin.regularPrice)}</Price>
          <Discount>{formatCurrency(cabin.discount)}</Discount>
          <button disabled={isPending} onClick={() => mutate(cabin.id)}>
            Delete
          </button>
        </TableRow>
      </div>
    </>
  );
};
