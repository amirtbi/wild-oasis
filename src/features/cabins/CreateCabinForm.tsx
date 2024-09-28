import { useForm } from "react-hook-form";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import { FormRow } from "../../ui/FormRow";
import { Input } from "../../ui/Input";
import TextArea from "../../ui/TextArea";
import { createCabinType } from "./cabins.model";
import { Button } from "../../ui/Button";
import { styled } from "styled-components";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { FormEvent } from "react";

const ErrorMessage = styled.span`
  font-weight: 500;
  font-size: 10px;
  color: var(--color-red-700);
  margin: 0 1rem;
`;

export const CreateCabinForm = () => {
  const {
    handleSubmit,
    register,
    reset,
    getValues,
    formState: { errors },
  } = useForm<createCabinType>();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createCabin,
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
  const onCreateCabin = (formData: createCabinType) => {
    mutate({ ...formData, image: formData.image[0] });
  };

  const handleOnCancle = (e: FormEvent) => {
    e.preventDefault();
  };

  const onError = (errors: any) => {
    toast.error("Error happened during form submiting");
    console.log("errors", errors);
  };
  return (
    <>
      <Form onSubmit={handleSubmit(onCreateCabin, onError)}>
        <FormRow label="Cabin name">
          <Input
            id="name"
            disabled={isPending}
            type="text"
            {...register("name", { required: "Field is required!" })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </FormRow>
        <FormRow label="Maximum capacity">
          <Input
            type="number"
            id="maxCapacity"
            disabled={isPending}
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
            disabled={isPending}
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
            disabled={isPending}
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
            disabled={isPending}
            {...register("description", { required: "field is required" })}
          />
          {errors.description && (
            <ErrorMessage>{errors.description.message}</ErrorMessage>
          )}
        </FormRow>
        <FormRow label="Cabin photo">
          <FileInput
            accept="image/*"
            {...register("image", { required: true })}
          />
        </FormRow>

        <FormRow>
          <Button
            variant="secondary"
            size="medium"
            type="reset"
            onClick={handleOnCancle}
          >
            Cancel
          </Button>
          <Button
            disabled={isPending}
            variant="primary"
            size="medium"
            type="submit"
          >
            Add cabin
          </Button>
        </FormRow>
      </Form>
    </>
  );
};
