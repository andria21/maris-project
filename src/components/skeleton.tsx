import React from "react";
import { Skeleton } from "./ui/skeleton";

export default function SkeletonUI() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="grid md:grid-cols-2 grid-cols-1 md:gap-y-52 sm:gap-y-20 gap-y-14 w-full pt-10 pb-20">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex flex-col items-center space-y-3">
            <Skeleton className="md:h-[325px] md:w-[650px] h-[225px] w-[350px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-[250px]" />
              <Skeleton className="h-6 w-[200px]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
