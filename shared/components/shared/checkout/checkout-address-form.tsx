import { Controller, useFormContext } from "react-hook-form";
import { AddressInput } from "../address-input";
import { FormTextarea } from "../form";
import { WhiteBlock } from "./white-block";
import { ErrorText } from "../error-text";

type Props = {
  className?: string;
};

export const CheckoutAddressForm = ({ className }: Props) => {
  const { control } = useFormContext();

  return (
    <WhiteBlock title="3. Адрес доставки" className={className}>
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
          className="text-base"
          rows={5}
          placeholder="Комментарий к заказу"
        />
      </div>
    </WhiteBlock>
  );
};
