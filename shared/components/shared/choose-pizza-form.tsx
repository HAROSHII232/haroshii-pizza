import { cn } from "@/shared/lib";
import { PizzaImage } from "./pizza-image";
import { Title } from "./title";
import { Button } from "../ui";
import {
  PIZZA_SIZES,
  PIZZA_TYPES,
  PizzaSize,
  PizzaType,
} from "@/shared/constants";
import { GroupVariants } from "./group-variants";
import { useState } from "react";

type Props = {
  imageUrl: string;
  name: string;
  ingredients: any[];
  items?: any[];
  onSubmit?: VoidFunction;
  className?: string;
};

const DEFAULT_PIZZA_SIZE: PizzaSize = 30;
const DEFAULT_PIZZA_TYPE: PizzaType = 1;

export const ChoosePizzaForm = ({
  className,
  imageUrl,
  name,
  ingredients,
  items,
  onSubmit,
}: Props) => {
  const [size, setSize] = useState<PizzaSize>(DEFAULT_PIZZA_SIZE);
  const [type, setType] = useState<PizzaType>(DEFAULT_PIZZA_TYPE);

  const textDetails = "30 см, традиционное тесто 30";
  const totalPrice = 300;

  return (
    <div className={cn("flex flex-1", className)}>
      <PizzaImage imageUrl={imageUrl} size={size} />

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400">{textDetails}</p>

        <div className="flex flex-col gap-4 mt-5">
          <GroupVariants
            items={PIZZA_SIZES}
            value={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />

          <GroupVariants
            items={PIZZA_TYPES}
            value={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>
        
        <Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};
