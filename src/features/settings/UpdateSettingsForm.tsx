import Form from "../../ui/Form";
import { FormRow } from "../../ui/FormRow";
import { Input } from "../../ui/Input";
import { useSettings } from "./useSettings";

export const UpdateSettingsForm = () => {
  const { isLoading, settings } = useSettings();
  return (
    <>
      <Form>
        <FormRow label="Minimum nights/bookings">
          <Input
            type="number"
            id="min-nights"
            defaultValue={settings?.minBookingLength}
          />
        </FormRow>
        <FormRow label="Maximum nights/bookings">
          <Input
            type="number"
            id="max-nights"
            defaultValue={settings?.maxBookingLength}
          />
        </FormRow>
        <FormRow label="Maximum guests/bookings">
          <Input
            type="number"
            id="max-guests"
            defaultValue={settings?.maxGuestsPerBooking}
          />
        </FormRow>
        <FormRow label="Breakfast price">
          <Input
            type="number"
            id="breakfast-price"
            defaultValue={settings?.breakfastPrice}
          />
        </FormRow>
      </Form>
    </>
  );
};
