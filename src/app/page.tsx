import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Ficha } from "@/components/Ficha";
import { Escucha } from "@/components/Escucha";
import { Story } from "@/components/Story";
import { Discografia } from "@/components/Discografia";
import { Tiers } from "@/components/Tiers";
import { Money } from "@/components/Money";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Ficha />
        <Escucha />
        <Story />
        <Discografia />
        <Money />
        <Tiers />
      </main>
      <Footer />
    </>
  );
}
