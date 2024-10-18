import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export const useCreateCabin = () => {

    const queryClient = useQueryClient();
    const { mutate: createCabin, isPending: isCreating } = useMutation({
        mutationFn: createEditCabin,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cabin"],
            });
            toast.success("New cabin added!");
        },
        onError: () => {
            toast.error("Adding cabin failed!");
        },
    });

    return { createCabin, isCreating }
}