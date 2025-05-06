"use client";

import { ProductWithRelations } from "@/@types/prisma";
import { useCategoryStore } from "@/shared/store/category";
import { useEffect, useRef } from "react";
import { useIntersection } from "react-use";
import { ProductCard } from "./product-card";
import { Title } from "./title";

type Props = {
  title: string;
  items: ProductWithRelations[];
  className?: string;
  categoryId: number;
  listClassName?: string;
};

export const ProductsGroupList = ({
  categoryId,
  items,
  title,
  className,
}: Props) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  });

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [categoryId, intersection?.isIntersecting, setActiveCategoryId, title]);

  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />

      <div className="grid grid-cols-3 gap-[50px]">
        {items.map((product) => (
          <ProductCard
            id={product.id}
            key={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.items[0].price}
            ingredients={product.ingredients}
          />
        ))}
      </div>
    </div>
  );
};
