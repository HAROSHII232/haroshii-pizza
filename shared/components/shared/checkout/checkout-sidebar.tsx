import {
  ArrowRight as ArrowRightIcon,
  Package as PackageIcon,
  Percent as PercentIcon,
  Truck as TruckIcon,
} from "lucide-react";

import { Button, Skeleton } from "../../ui";
import { WhiteBlock } from "./white-block";
import { CheckoutItemDetails } from "./checkout-item";

const VAT = 15;
const DELIVERY_PRICE = 250;

type Props = {
  loading?: boolean;
  totalAmount: number;
};

export const CheckoutSidebar = ({ totalAmount, loading }: Props) => {
  const vatPrice = (totalAmount * VAT) / 100;
  const totalPrice = totalAmount + vatPrice + DELIVERY_PRICE;

  return (
    <WhiteBlock className="sticky top-4 p-6">
      <div className="flex flex-col gap-1">
        <span className="text-xl">Итого</span>
        {loading ? (
          <Skeleton className="w-48 h-11" />
        ) : (
          <span className="h-11 text-[34px] font-extrabold">
            {totalPrice} ₽
          </span>
        )}
      </div>

      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <PackageIcon size={18} className="mr-2 text-gray-400" />
            Стоимость корзины:
          </div>
        }
        value={
          loading ? (
            <Skeleton className="w-16 h-6 rounded-[6px]" />
          ) : (
            `${totalAmount} ₽`
          )
        }
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <PercentIcon size={18} className="mr-2 text-gray-400" />
            Налоги:
          </div>
        }
        value={
          loading ? (
            <Skeleton className="w-16 h-6 rounded-[6px]" />
          ) : (
            `${vatPrice} ₽`
          )
        }
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <TruckIcon size={18} className="mr-2 text-gray-400" />
            Доставка:
          </div>
        }
        value={
          loading ? (
            <Skeleton className="w-16 h-6 rounded-[6px]" />
          ) : (
            `${DELIVERY_PRICE} ₽`
          )
        }
      />

      <Button
        type="submit"
        loading={loading}
        className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
      >
        Перейти к оплате
        <ArrowRightIcon className="w-5 ml-2" />
      </Button>
    </WhiteBlock>
  );
};
