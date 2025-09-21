import Hero from "@/components/hero";
import Projects from "@/components/projects";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-black text-white">
      <Hero />
      <Projects />
    </main>
  );
}
