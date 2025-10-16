import React from "react";
import ProjectCard from "./helper-components/ProjectCard";

export default function Projects() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="grid md:grid-cols-2 grid-cols-1 md:gap-y-52 sm:gap-y-20 gap-y-14 w-full md:pt-40 pt-30 pb-20">
        <ProjectCard
          image="https://images.unsplash.com/photo-1724582586529-62622e50c0b3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1228"
          title="SPIRES"
          description="2025 Tbilisi, Georgia"
          isLink
        />
        <ProjectCard
          image="https://images.unsplash.com/photo-1653972233229-1b8c042d6d8e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1332"
          title="SPIRES"
          description="2025 Tbilisi, Georgia"
          isLink
        />
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 md:gap-y-52 sm:gap-y-20 gap-y-14 w-full sm:pb-50 pb-40">
        <ProjectCard
          image="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
          title="SPIRES"
          description="2025 Tbilisi, Georgia"
          isLink
        />

        <ProjectCard
          image="https://images.unsplash.com/photo-1640357960494-9242650846d3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1043"
          title="SPIRES"
          description="2025 Tbilisi, Georgia"
          isLink
        />
      </div>
    </div>
  );
}
