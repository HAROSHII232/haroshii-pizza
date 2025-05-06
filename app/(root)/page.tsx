import {
  Container,
  Filters,
  ProductsGroupList,
  Title,
  TopBar,
} from "@/shared/components/shared";
import { prisma } from "@/prisma/prisma-client";
import { Suspense } from "react";

export default async function Home() {
  const categories = await prisma.category.findMany({
    where: {
      products: {
        some: {},
      },
    },
    include: {
      products: {
        include: {
          ingredients: true,
          items: true,
        },
      },
    },
  });

  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>

      <TopBar categories={categories} />

      <Container className="mt-9 pb-14">
        <div className="flex gap-[80px]">
          {/* Фильтрация */}
          <aside className="w-[250px]">
            <Suspense>
              <Filters />
            </Suspense>
          </aside>

          {/* Список товаров */}
          <section className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map((category) => (
                <ProductsGroupList
                  key={category.id}
                  title={category.name}
                  categoryId={category.id}
                  items={category.products}
                />
              ))}
            </div>
          </section>
        </div>
      </Container>
    </>
  );
}
