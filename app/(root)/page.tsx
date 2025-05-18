import {
  Container,
  Filters,
  ProductsGroupList,
  Title,
  TopBar,
  Stories
} from "@/shared/components/shared";
import { findPizzas, GetSearchParams } from "@/shared/lib";

import { Suspense } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: GetSearchParams;
}) {
  const categories = await findPizzas(searchParams);
  const filteredCategories = categories.filter(
    (category) => category.products.length > 0
  );

  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>

      <TopBar categories={filteredCategories} />

      <Stories/>

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
              {categories.map(
                (category) =>
                  category.products.length > 0 && (
                    <ProductsGroupList
                      key={category.id}
                      title={category.name}
                      categoryId={category.id}
                      items={category.products}
                    />
                  )
              )}
            </div>
          </section>
        </div>
      </Container>
    </>
  );
}
