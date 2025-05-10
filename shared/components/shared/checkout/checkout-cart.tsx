import { CartStateItem, getCartItemDetails } from "@/shared/lib";
import { WhiteBlock } from "./white-block";
import { PizzaSize, PizzaType } from "@/shared/constants";
import { CheckoutItem } from "./checkout-item";

type Props = {
  items: CartStateItem[];
  handleCountButtonClick: (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => void;
  removeCartItem: (id: number) => void;
  className?: string;
};

export const CheckoutCart = ({
  items,
  handleCountButtonClick,
  removeCartItem,
  className,
}: Props) => {
  return (
    <WhiteBlock title="1. Корзина" className={className}>
      <div className="flex flex-col gap-5">
        {items.map((item) => (
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
