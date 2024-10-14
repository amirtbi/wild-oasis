import { useForm } from "react-hook-form";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import { FormRow } from "../../ui/FormRow";
import { Input } from "../../ui/Input";
import TextArea from "../../ui/TextArea";
import { createCabinType } from "./cabins.model";
import { Button } from "../../ui/Button";
import { styled } from "styled-components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { FormEvent } from "react";
const ErrorMessage = styled.span`
  font-weight: 500;
  font-size: 10px;
  color: var(--color-red-700);
  margin: 0 1rem;
`;

export const CreateCabinForm = ({
  onShow,
  cabinToEdit,
}: {
  onShow?: (value: boolean) => void;
  cabinToEdit?: createCabinType;
}) => {
  const isEditionSession = Boolean(cabinToEdit?.id);
  const {
    handleSubmit,
    register,
    reset,
    getValues,
    formState: { errors },
  } = useForm<createCabinType>({
    defaultValues: isEditionSession ? cabinToEdit : {},
  });

  const queryClient = useQueryClient();

  const { mutate: createCabin, isPending: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
      toast.success("New cabin added!");
      reset();
    },
    onError: () => {
      toast.error("Adding cabin failed!");
    },
  });

  const { mutate: editCabin, isPending: isEditing } = useMutation({
    mutationFn: (data: { newCabin: createCabinType; id: number }) =>
      createEditCabin(data.newCabin, data.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
      toast.success("Cabin successfully edited");

      onShow?.(true);
      reset();
    },
    onError: () => {
      toast.error("Editing failed!");
    },
  });

  const onCreateEditCabin = (formData: createCabinType) => {
    if (isEditionSession) {
      editCabin({
        newCabin: { ...formData, image: formData.image },
        id: (cabinToEdit as createCabinType).id as number,
      });
    } else {
      createCabin({ ...formData, image: formData.image[0] });
    }
  };

  const handleOnCancle = (e: FormEvent) => {
    e.preventDefault();
    onShow?.(false);
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onCreateEditCabin)}>
        <FormRow label="Cabin name">
          <Input
            id="name"
            disabled={isEditionSession ? isEditing : isCreating}
            type="text"
            {...register("name", { required: "Field is required!" })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </FormRow>
        <FormRow label="Maximum capacity">
          <Input
            type="number"
            id="maxCapacity"
            disabled={isEditionSession ? isEditing : isCreating}
            {...register("maxCapacity", {
              required: "Field is required",
              min: {
                value: 1,
                message: "Minimum value of capacity is 1",
              },
            })}
          />
          {errors.maxCapacity && (
            <ErrorMessage>{errors.maxCapacity.message}</ErrorMessage>
          )}
        </FormRow>
        <FormRow label="Regular price">
          <Input
            type="number"
            id="regularPrice"
            disabled={isEditionSession ? isEditing : isCreating}
            {...register("regularPrice", {
              required: "Field is required!",
              min: {
                value: 1,
                message: "Minimum value of regular price must be 1",
              },
            })}
          />
          {errors.regularPrice && (
            <ErrorMessage>{errors.regularPrice.message}</ErrorMessage>
          )}
        </FormRow>
        <FormRow label="Discount">
          <Input
            type="number"
            id="discount"
            disabled={isEditionSession ? isEditing : isCreating}
            defaultValue={0}
            {...register("discount", {
              required: "Field is required",
              validate: (value) => {
                return (
                  value <= +getValues().regularPrice ||
                  "Discount value must be less than regular price"
                );
              },
            })}
          />
          {errors.discount && (
            <ErrorMessage>{errors.discount.message}</ErrorMessage>
          )}
        </FormRow>
        <FormRow label="Description for website">
          <TextArea
            id="description"
            defaultValue=""
            disabled={isEditionSession ? isEditing : isCreating}
            {...register("description", { required: "field is required" })}
          />
          {errors.description && (
            <ErrorMessage>{errors.description.message}</ErrorMessage>
          )}
        </FormRow>
        <FormRow label="Cabin photo">
          <FileInput
            accept="image/*"
            {...register("image", {
              required: isEditionSession ? false : "Image file is required",
            })}
          />
        </FormRow>

        <FormRow>
          <Button variant="secondary" size="medium" onClick={handleOnCancle}>
            Cancel
          </Button>
          <Button
            disabled={isEditionSession ? isEditing : isCreating}
            variant="primary"
            size="medium"
            type="submit"
          >
            {isEditionSession ? "Edit cabin" : "Add cabin"}
          </Button>
        </FormRow>
      </Form>
    </>
  );
};
