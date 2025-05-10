import { Controller, useFormContext } from "react-hook-form";
import { AddressInput } from "../address-input";
import { FormTextarea } from "../form";
import { WhiteBlock } from "./white-block";
import { ErrorText } from "../error-text";

export const CheckoutAddressForm = () => {
  const { control } = useFormContext();

  return (
    <WhiteBlock title="3. Адрес доставки">
      <div className="flex flex-col gap-5">
        <Controller
          control={control}
          name="address"
          render={({ field, fieldState }) => (
            <>
              <AddressInput onChange={field.onChange} />
              {fieldState.error?.message && (
                <ErrorText text={fieldState.error.message} />
              )}
            </>
          )}
        />

        <FormTextarea
          name="comment"
          className="text-base resize-none"
          rows={5}
          placeholder="Комментарий к заказу"
        />
      </div>
    </WhiteBlock>
  );
};
