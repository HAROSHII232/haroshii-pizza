import { Container, Filters, Title, TopBar } from "@/components/shared";

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>

      <TopBar />

      <Container className="mt-9 pb-14">
        <div className="flex gap-[60px]">
          {/* Фильтрация */}
          <aside className="w-[250px]">
            <Filters />
          </aside>

          {/* Список товаров */}
          <section className="flex-1">
            <div className="flex flex-col gap-16">Список товаров</div>
          </section>
        </div>
      </Container>
    </>
  );
}
