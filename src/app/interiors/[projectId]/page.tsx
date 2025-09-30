"use client";

import ProjectCard from "@/components/helper-components/ProjectCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import React from "react";
import useSWR from "swr";
import { toast } from "sonner";
import { createInteriorProjectPost } from "@/actions/createProjectPost";
import { deleteInteriorProjectPost } from "@/actions/deleteProjectPost";
import SkeletonUI from "@/components/skeleton";
import { useUser } from "@/hooks/useUser";

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

  // TODO
  // ? EXTERIOR page needs some updates that INTERIOR has
  // ! BLOG AND TERMS PAGE

  if (error) return <p>There&apos; been an error</p>;

  return (
    <div className="w-full flex flex-col justify-between">
      <h1 className="pt-40 pl-6 text-5xl md:text-7xl font-bold font-montserrat">
        {projectName}
      </h1>
      {isLoading ? (
        <SkeletonUI />
      ) : (
        <div className="flex flex-col items-center justify-center w-full">
          <div className="grid grid-cols-1 md:gap-y-32 sm:gap-y-20 gap-y-14 w-full pt-10 pb-20">
            {data
              ?.filter((item: InteriorProject) => item.projectId === projectId)
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
      {isAuthenticated && (
        <form
          action={handleAction}
          className="flex flex-col w-full max-w-md sm:max-w-lg md:max-w-2xl 
                   mx-auto p-4 sm:p-6 md:p-8 gap-3 bg-gray-800 rounded-2xl shadow-md mb-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
            <Input
              name="title"
              type="text"
              placeholder="Title"
              className="w-full"
            />
            <Input
              name="desc"
              type="text"
              placeholder="Description"
              className="w-full"
            />
          </div>

          <Input
            name="img"
            type="text"
            placeholder="Image"
            required
            className="w-full"
          />

          <div className="flex items-center gap-3">
            <Button
              variant="default"
              type="submit"
              className="cursor-pointer w-full md:w-auto"
            >
              Submit
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProjectDetails;
