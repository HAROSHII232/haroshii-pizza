"use client";

import { cn } from "@/shared/lib";
import { useCategoryStore } from "@/shared/store/category";
import { Category } from "@prisma/client";

type Props = {
  items: Category[];
  className?: string;
};

export const Categories = ({items, className }: Props) => {
  const categoryActiveId = useCategoryStore((state) => state.activeId);

  return (
    <div
      className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}
    >
      {items.map(({ name, id }, index) => (
        <a
          key={index}
          className={cn(
            "flex items-center font-bold h-11 px-5 rounded-2xl",
            categoryActiveId === id &&
              "bg-white shadow-md shadow-gray-200 text-primary"
          )}
          href={`/#${name}`}
        >
          <button>{name}</button>
        </a>
      ))}
    </div>
  );
};
