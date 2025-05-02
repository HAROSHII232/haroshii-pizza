import { ProductItem } from "@prisma/client";
import { PizzaType, PIZZA_SIZES } from "../constants";

/**
 * Returns a list of available pizza sizes for the given pizza type.
 *
 * The returned list will contain all pizza sizes, but some may be disabled
 * if there are no products available with that size and type.
 *
 * @param items - The list of all product items.
 * @param type - The type of pizza.
 * @returns A list of available pizza sizes with the name, value and disabled
 *          property.
 */

export const getAvailablePizzaSizes = (
  items: ProductItem[],
  type: PizzaType
) => {
  const filteredPizzasByType = items.filter((item) => item.pizzaType === type);

  return PIZZA_SIZES.map((item) => ({
    name: item.name,
    value: item.value,
    disabled: !filteredPizzasByType.some(
      (pizza) => Number(pizza.size) === Number(item.value)
    ),
  }));
};
