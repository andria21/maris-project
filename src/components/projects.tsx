import React from "react";
import ProjectCard from "./helper-components/ProjectCard";

export default function Projects() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex justify-between w-full pt-40 pb-20">
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
      <div className="flex justify-between w-full pb-50">
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
