import { PizzaSize, PizzaType } from "@/shared/constants";
import { CartStateItem, getCartItemDetails } from "@/shared/lib";
import { CheckoutItem, CheckoutItemSkeleton } from "./checkout-item";
import { WhiteBlock } from "./white-block";

type Props = {
  items: CartStateItem[];
  loading?: boolean;
  className?: string;
  handleCountButtonClick: (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => void;
  removeCartItem: (id: number) => void;
};

export const CheckoutCart = ({
  items,
  loading,
  className,
  handleCountButtonClick,
  removeCartItem,
}: Props) => {
  return (
    <WhiteBlock title="1. Корзина" className={className}>
      <div className="flex flex-col gap-5">
        {loading
          ? [...Array(4)].map((_, index) => (
              <CheckoutItemSkeleton key={index} />
            ))
          : items.map((item) => (
              <CheckoutItem
                key={item.id}
                id={item.id}
                imageUrl={item.imageUrl}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                disabled={item.disabled}
                onClickCountButton={(type) =>
                  handleCountButtonClick(item.id, item.quantity, type)
                }
                onClickRemove={() => removeCartItem(item.id)}
                details={getCartItemDetails(
                  item.ingredients,
                  item.pizzaType as PizzaType,
                  item.pizzaSize as PizzaSize
                )}
              />
            ))}
      </div>
    </WhiteBlock>
  );
};
