import { useRef } from "react";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();
  const { isUpdating, updateSetting } = useUpdateSetting();

  const minNightsRef = useRef();
  const maxNightsRef = useRef();
  const maxGuestsRef = useRef();
  const breakfastPriceRef = useRef();

  if (isLoading) return <Spinner />;

  function handleUpdate(e, field) {
    const value = e.target.value;
    if (!value) return;
    updateSetting({ [field]: Number(value) });
  }

  function handleSave(e) {
    e.preventDefault();
    const updates = {};

    const min = minNightsRef.current?.value;
    const max = maxNightsRef.current?.value;
    const guests = maxGuestsRef.current?.value;
    const breakfast = breakfastPriceRef.current?.value;

    if (min) updates.minBookingLength = Number(min);
    if (max) updates.maxBookingLength = Number(max);
    if (guests) updates.maxGuestsPerBooking = Number(guests);
    if (breakfast) updates.breakfastPrice = Number(breakfast);

    if (Object.keys(updates).length > 0) updateSetting(updates);
  }

  return (
    <Form onSubmit={handleSave}>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          disabled={isUpdating}
          defaultValue={minBookingLength}
          ref={minNightsRef}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          disabled={isUpdating}
          defaultValue={maxBookingLength}
          ref={maxNightsRef}
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          disabled={isUpdating}
          defaultValue={maxGuestsPerBooking}
          ref={maxGuestsRef}
          onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          disabled={isUpdating}
          defaultValue={breakfastPrice}
          ref={breakfastPriceRef}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
        />
      </FormRow>

      <FormRow>
        <Button type="submit" disabled={isUpdating}>
          Save settings
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
