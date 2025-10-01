"use client";

import Hero from "@/components/hero";
import MotionWrapper from "@/components/MotionProvider";
import Projects from "@/components/projects";
import SkeletonUI from "@/components/skeleton";
import { useUser } from "@/hooks/useUser";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { Suspense } from "react";

function HomeContent() {
  const { isLoading } = useUser();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("login") === "success") {
      toast.success("Logged in successfully!");
    }
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="pt-20">
        <SkeletonUI />
      </div>
    );
  }

  return (
    <MotionWrapper>
      <main className="flex min-h-screen flex-col items-center justify-between">
        <Hero />
        <Projects />
      </main>
    </MotionWrapper>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="pt-20">
          <SkeletonUI />
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
