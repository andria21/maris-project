"use client";

import ProjectCard from "@/components/helper-components/ProjectCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import useSWR from "swr";
import { toast } from "sonner";
import { createInteriorProjectPost } from "@/actions/createProjectPost";
import { deleteInteriorProjectPost } from "@/actions/deleteProjectPost";
import SkeletonUI from "@/components/skeleton";
import { useUser } from "@/hooks/useUser";
import { AnimatePresence, motion } from "framer-motion";
import PostForm from "@/components/helper-components/PostForm";

interface ProjectDetailsProps {
  params: Promise<{ projectId: string }>;
}

type InteriorProject = {
  _id: string;
  projectId: string;
  img: string;
  title?: string;
  desc?: string;
  postTitle?: string;
};

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ params }) => {
  const { projectId } = React.use(params);

  const fetcher = (...args: [RequestInfo, RequestInit?]) =>
    fetch(...args).then((res) => res.json());

  const { data, mutate, error, isLoading } = useSWR(
    `/api/interior-projects`,
    fetcher
  );

  const { isAuthenticated } = useUser();

  // console.log(!isLoading && data);
  const projectName = data?.find(
    (project: InteriorProject) => project.projectId === projectId
  )?.postTitle;

  async function handleAction(formData: FormData) {
    try {
      await createInteriorProjectPost(formData, projectId);
      mutate();
      toast.success("Post created successfully");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  }

  async function handleDeleteAction(id: string) {
    try {
      await deleteInteriorProjectPost(id);
      mutate();
      toast.success("Post deleted successfully");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  }

  if (error) return <p>There&apos; been an error</p>;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      >
        <div className="w-full flex flex-col justify-between pb-20">
          <h1 className="pt-40 pl-6 text-5xl md:text-7xl font-bold font-montserrat">
            {projectName}
          </h1>
          <PostForm
            isAuthenticated={isAuthenticated}
            handleAction={handleAction}
          />

          {isLoading ? (
            <SkeletonUI />
          ) : (
            <div className="flex flex-col items-center justify-center w-full">
              <div className="grid grid-cols-1 md:gap-y-32 sm:gap-y-20 gap-y-14 w-full pt-10 pb-20">
                {data
                  ?.filter(
                    (item: InteriorProject) => item.projectId === projectId
                  )
                  .map((item: InteriorProject) => (
                    <ProjectCard
                      key={item._id}
                      image={item.img}
                      title={item.title ?? ""}
                      description={item.desc ?? ""}
                      pages={{ interiors: "interiors", exteriors: "" }}
                      deleteHandler={() => handleDeleteAction(item._id)}
                      projectId={`/interiors/${item._id}`}
                      isLink={false}
                    />
                  ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectDetails;
