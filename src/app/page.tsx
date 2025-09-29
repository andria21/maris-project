"use client";
import Hero from "@/components/hero";
import Projects from "@/components/projects";
import { useUser } from "@/hooks/useUser";

export default function Home() {
  const { isLoading } = useUser();

  if (isLoading) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <Projects />
    </main>
  );
}
