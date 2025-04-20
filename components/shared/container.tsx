import { cn } from "@/shared/lib/utils";
import { ReactNode } from "react";

type Props = {
  className?: string;
  children?: ReactNode;
};

export const Container = ({ className, children }: Props) => {
  return (
    <div className={cn("mx-auto max-w-[1280px]", className)}>{children}</div>
  );
};
