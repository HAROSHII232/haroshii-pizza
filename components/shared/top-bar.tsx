import { Container } from "./container";
import { SortPopup } from "./sort-popup";
import { Categories } from "./categories";
import { cn } from "@/shared/lib";
import { Category } from "@prisma/client";

type Props = {
  categories: Category[];
  className?: string;
};

export const TopBar = ({categories, className }: Props) => {
  return (
    <nav
      className={cn(
        "sticky top-0 bg-white/75 py-5 shadow-lg shadow-black/5 z-10 backdrop-blur-sm",
        className
      )}
    >
      <Container className="flex items-center justify-between">
        <Categories items={categories} />
        <SortPopup />
      </Container>
    </nav>
  );
};
