import { Container } from "./container";
import { SortPopup } from "./sort-popup";
import { Categories } from "./categories";
import { cn } from "@/shared/lib";

type Props = {
  className?: string;
};

export const TopBar = ({ className }: Props) => {
  return (
    <nav
      className={cn(
        "sticky top-0 bg-white/75 py-5 shadow-lg shadow-black/5 z-10 backdrop-blur-sm",
        className
      )}
    >
      <Container className="flex items-center justify-between">
        <Categories />
        <SortPopup />
      </Container>
    </nav>
  );
};
