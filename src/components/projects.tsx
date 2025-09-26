import React from "react";
import ProjectCard from "./helper-components/ProjectCard";

export default function Projects() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="grid md:grid-cols-2 grid-cols-1 md:gap-y-52 sm:gap-y-20 gap-y-14 w-full md:pt-40 pt-30 pb-20">
        <ProjectCard
          image="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          title="SPIRES"
          description="2025 Tbilisi, Georgia"
        />
        <ProjectCard
          image="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          title="SPIRES"
          description="2025 Tbilisi, Georgia"
        />
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 md:gap-y-52 sm:gap-y-20 gap-y-14 w-full pb-50">
        <ProjectCard
          image="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          title="SPIRES"
          description="2025 Tbilisi, Georgia"
        />

        <ProjectCard
          image="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          title="SPIRES"
          description="2025 Tbilisi, Georgia"
        />
      </div>
    </div>
  );
}
