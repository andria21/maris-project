"use client";
import Hero from "@/components/hero";
import Projects from "@/components/projects";
import SkeletonUI from "@/components/skeleton";
import { useUser } from "@/hooks/useUser";

export default function Home() {
  const { isLoading } = useUser();

  if (isLoading) {
    return <div className="pt-20"><SkeletonUI /></div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <Projects />
    </main>
  );
}
