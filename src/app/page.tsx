import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Ficha } from "@/components/Ficha";
import { Story } from "@/components/Story";
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
        <Story />
        <Tiers />
        <Money />
      </main>
      <Footer />
    </>
  );
}
