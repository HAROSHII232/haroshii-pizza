import { Input, Textarea } from "../../ui";
import { WhiteBlock } from "./white-block";

type Props = {
  className?: string;
};

export const CheckoutAddressForm = ({ className }: Props) => {
  return (
    <WhiteBlock title="3. Адрес доставки">
      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-5">
          <Input
            name="adress"
            className="text-base"
            placeholder="Введите адрес..."
          />
          <Textarea
            className="text-base resize-none"
            rows={5}
            placeholder="Комментарий к заказу"
          />
        </div>
      </div>
    </WhiteBlock>
  );
};
