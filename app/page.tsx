import {
  Container,
  Filters,
  ProductsGroupList,
  Title,
  TopBar,
} from "@/components/shared";

const PRODUCTS_LIST = [
  {
    id: 1,
    name: "Маргарита",
    price: 500,
    image:
      "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
    items: [{ price: 550 }],
  },
  {
    id: 2,
    name: "Маргарита",
    price: 500,
    image:
      "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
    items: [{ price: 550 }],
  },
  {
    id: 3,
    name: "Маргарита",
    price: 500,
    image:
      "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
    items: [{ price: 550 }],
  },
  {
    id: 4,
    name: "Маргарита",
    price: 500,
    image:
      "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
    items: [{ price: 550 }],
  },
  {
    id: 5,
    name: "Маргарита",
    price: 500,
    image:
      "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
    items: [{ price: 550 }],
  },
  {
    id: 6,
    name: "Маргарита",
    price: 500,
    image:
      "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
    items: [{ price: 550 }],
  },
]

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>

      <TopBar />

      <Container className="mt-9 pb-14">
        <div className="flex gap-[80px]">
          {/* Фильтрация */}
          <aside className="w-[250px]">
            <Filters />
          </aside>

          {/* Список товаров */}
          <section className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductsGroupList
                title={"Пиццы"}
                items={PRODUCTS_LIST}
                categoryId={1}
              />
            </div>
          </section>
        </div>
      </Container>
    </>
  );
}
