import { ProductCard } from "./product-card";
import { Title } from "./title";

type Props = {
  title: string;
  items: any[];
  className?: string;
  categoryId: number;
  listClassName?: string;
};

export const ProductsGroupList = ({
  categoryId,
  items,
  title,
  listClassName,
  className,
}: Props) => {
  return (
    <div className={className}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />

      <div className="grid grid-cols-3 gap-[50px]">
        {items.map((item, i) => (
          <ProductCard
            id={item.id}
            key={item.id}
            name="Маргарита"
            imageUrl="https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp"
            price={item.items[0].price}
          />
        ))}
      </div>
    </div>
  );
};
