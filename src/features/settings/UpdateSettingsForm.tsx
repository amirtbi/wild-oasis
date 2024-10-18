import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import { FormRow } from "../../ui/FormRow";
import { Input } from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSettings } from "./useUpdateSettings";
import { updateSettingType } from "./settings.model";
import { useEffect } from "react";
import { Button } from "../../ui/Button";
import { ErrorMessage } from "../../ui/ErrorMessage";

export const UpdateSettings = () => {
  const { data, isLoading } = useSettings();
  const {
    handleSubmit,
    register,
    reset,
    getValues,
    formState: { errors },
  } = useForm<updateSettingType>({
    defaultValues: {
      minBookingLength: data?.minBookingLength,
      maxBookingLength: data?.maxBookingLength,
      maxGuestsPerBooking: data?.maxGuestsPerBooking,
      breakfastPrice: data?.breakfastPrice,
    },
  });
  const { onUpdateSetting } = useUpdateSettings();

  useEffect(() => {
    reset();
  }, [reset]);

  if (isLoading) {
    return <Spinner />;
  }

  const onUpdateForm = () => {
    onUpdateSetting({ settings: getValues() });
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onUpdateForm)}>
        <FormRow label="Minimum nights/bookings">
          <Input
            type="number"
            id="min-nights"
            {...register("minBookingLength", { required: "field is required" })}
          />
          {errors.minBookingLength && (
            <ErrorMessage>{errors.minBookingLength?.message}</ErrorMessage>
          )}
        </FormRow>
        <FormRow label="Maximum nights/bookings">
          <Input
            type="number"
            id="max-nights"
            {...register("maxBookingLength", { required: "Field is required" })}
          />
          {errors.maxBookingLength && (
            <ErrorMessage>{errors.maxBookingLength.message}</ErrorMessage>
          )}
        </FormRow>
        <FormRow label="Maximum guests/bookings">
          <Input
            type="number"
            id="max-guests"
            {...register("maxGuestsPerBooking", {
              required: "field is required",
            })}
          />
          {errors.maxBookingLength && (
            <ErrorMessage>{errors.maxGuestsPerBooking?.message}</ErrorMessage>
          )}
        </FormRow>
        <FormRow label="Breakfast price">
          <Input
            {...register("breakfastPrice", { required: "field is required" })}
            type="number"
            id="breakfast-price"
          />
          {errors.breakfastPrice && (
            <ErrorMessage>{errors.breakfastPrice?.message}</ErrorMessage>
          )}
        </FormRow>
        <Button type="submit" size="medium">
          Update
        </Button>
      </Form>
    </>
  );
};
