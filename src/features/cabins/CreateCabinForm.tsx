import { useForm } from "react-hook-form";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import { FormRow } from "../../ui/FormRow";
import { Input } from "../../ui/Input";
import TextArea from "../../ui/TextArea";
import { createCabinType } from "./cabins.model";
import { Button } from "../../ui/Button";
import { styled } from "styled-components";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { FormEvent } from "react";

const ErrorMessage = styled.span`
  font-weight: 500;
  font-size: 10px;
  color: var(--color-red-700);
  margin: 0 5px;
`;

export const CreateCabinForm = (props: {
  type: string;
  children?: JSX.Element;
  onShowForm: (value: boolean) => void;
}) => {
  const { type, onShowForm } = props;
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<createCabinType>();

  const queryClient = new QueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
      toast.success("New cabin added!");
      reset();
      onShowForm(false);
    },
    onError: () => {
      toast.error("Adding cabin failed!");
    },
  });
  const onCreateCabin = (formData: createCabinType) => {
    mutate(formData);
  };

  const handleOnCancle = (e: FormEvent) => {
    e.preventDefault();
    onShowForm(false);
  };

  return (
    <>
      <Form type={type} onSubmit={handleSubmit(onCreateCabin)}>
        <FormRow label="Cabin name">
          <Input id="name" type="text" {...register("name")} />
        </FormRow>
        <FormRow label="Maximum capacity">
          <Input
            type="number"
            id="maxCapacity"
            {...register("maxCapacity", { required: true })}
          />
          {errors.maxCapacity && (
            <ErrorMessage>Max capacity is required!</ErrorMessage>
          )}
        </FormRow>
        <FormRow label="Regular price">
          <Input
            type="number"
            id="regularPrice"
            {...register("regularPrice")}
          />
        </FormRow>
        <FormRow label="Discount">
          <Input
            type="number"
            id="discount"
            defaultValue="0"
            {...register("discount", { required: true })}
          />
        </FormRow>
        <FormRow label="Description for website">
          <TextArea
            id="description"
            defaultValue=""
            {...register("description", { required: true })}
          />
        </FormRow>
        <FormRow label="Cabin photo">
          <FileInput type="file" {...register("image", { required: true })} />
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
