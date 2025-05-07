"use client";

import { ProductWithRelations } from "@/@types/prisma";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { cn } from "@/shared/lib";
import { useRouter } from "next/navigation";
import { ProductForm } from "../product-form";

type Props = {
  product: ProductWithRelations;
  className?: string;
};

export const ChooseProductModal = ({ product, className }: Props) => {
  const router = useRouter();
  const handleBack = () => router.back();

  return (
    <Dialog open={Boolean(product)} onOpenChange={handleBack}>
      <DialogTitle className="sr-only">Выбор товара</DialogTitle>
      <DialogContent
        className={cn(
          "w-[1060px] max-w-[1060px] min-h-[550px] p-0 bg-white overflow-hidden",
          className
        )}
        aria-describedby={undefined}
      >
        <ProductForm product={product} onSubmit={handleBack} />
      </DialogContent>
    </Dialog>
  );
};
