import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";
import { createCabinType } from "./cabins.model";

export const useEditCabin = () => {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isPending: isEditing } = useMutation({
    mutationFn: (data: { newCabin: createCabinType; id: number }) =>
      createEditCabin(data.newCabin, data.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
      toast.success("Cabin successfully edited");
    },
    onError: () => {
      toast.error("Editing failed!");
    },
  });

  return { editCabin, isEditing };
};
