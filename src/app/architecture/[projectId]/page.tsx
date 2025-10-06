"use client";

import ProjectCard from "@/components/helper-components/ProjectCard";
import React from "react";
import useSWR from "swr";
import { toast } from "sonner";
import { createExteriorProjectPost } from "@/actions/createProjectPost";
import SkeletonUI from "@/components/skeleton";
import { deleteExteriorProjectPost } from "@/actions/deleteProjectPost";
import PostFormButton from "@/components/helper-components/PostFormButton";
import { editExteriorProjectPost } from "@/actions/editProjectPost";
import { cn } from "@/lib/utils";

interface ProjectDetailsProps {
  params: Promise<{ projectId: string }>;
}

type ExteriorProject = {
  _id: string;
  projectId: string;
  img: string;
  title?: string;
  desc?: string;
  postTitle?: string;
};

const ExteriorProjectDetails: React.FC<ProjectDetailsProps> = ({ params }) => {
  const { projectId } = React.use(params);

  const fetcher = (...args: [RequestInfo, RequestInit?]) =>
    fetch(...args).then((res) => res.json());

  const { data, mutate, error, isLoading } = useSWR(
    `/api/exterior-projects`,
    fetcher
  );

  // console.log(!isLoading && data);
  const projectName = data?.find(
    (project: ExteriorProject) => project.projectId === projectId
  )?.postTitle;

  async function handleAction(formData: FormData) {
    try {
      await createExteriorProjectPost(formData, projectId);
      mutate();
      toast.success("Post created successfully");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  }

  async function handleDeleteAction(id: string) {
    try {
      await deleteExteriorProjectPost(id);
      mutate();
      toast.success("Post deleted successfully");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  }

  async function handleEditeAction(id: string, formData: FormData) {
    try {
      await editExteriorProjectPost(id, formData);
      mutate();
      toast.success("Post updated successfully");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  }

  if (error) return <p>There&apos; been an error</p>;

  const filteredData = data?.filter(
    (item: ExteriorProject) => item.projectId === projectId
  );

  return (
    <div
      className={cn(
        "w-full flex flex-col justify-between",
        (!filteredData || filteredData.length === 0) && "h-screen"
      )}
    >
      <h1 className="pt-40 pl-6 text-5xl md:text-7xl font-bold font-montserrat">
        {projectName}
      </h1>

      {isLoading ? (
        <SkeletonUI />
      ) : (
        <div className="flex flex-col items-center justify-center w-full">
          <div className="grid grid-cols-1 md:gap-y-32 sm:gap-y-20 gap-y-14 w-full pt-10 pb-20">
            {filteredData.map((item: ExteriorProject) => (
              <ProjectCard
                key={item._id}
                image={item.img}
                title={item.title ?? ""}
                description={item.desc ?? ""}
                pages={{ interiors: "interiors", exteriors: "" }}
                deleteHandler={() => handleDeleteAction(item._id)}
                projectId={`/architecture/${item._id}`}
                isLink={false}
                id={item._id}
                editHandler={handleEditeAction}
              />
            ))}
          </div>
        </div>
      )}
      <PostFormButton handleAction={handleAction} />
    </div>
  );
};

export default ExteriorProjectDetails;
