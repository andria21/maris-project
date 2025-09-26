"use client";

import ProjectCard from "@/components/helper-components/ProjectCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import React from "react";
import useSWR from "swr";
import { toast } from "sonner";
// import { useFormStatus } from "react-dom";
import { createExteriorPost } from "@/actions/createPost";
import { deleteExteriorPost } from "@/actions/deletePost";
import SkeletonUI from "@/components/skeleton";

type InteriorPost = {
  _id: string;
  img: string;
  title: string;
  desc: string;
};

export default function Exteriors() {
  const fetcher = (...args: [RequestInfo, RequestInit?]) =>
    fetch(...args).then((res) => res.json());

  const { data, mutate, error, isLoading } = useSWR(
    `/api/exterior-posts`,
    fetcher
  );

  // const { pending } = useFormStatus();

  async function handleAction(formData: FormData) {
    try {
      await createExteriorPost(formData);
      mutate();
      toast.success("Post created successfully");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  }

  async function handleDeleteAction(id: string) {
    try {
      await deleteExteriorPost(id);
      mutate();
      toast.success("Post deleted successfully");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  }

  if (error) return <p>There&apos been an error</p>;

  return (
    <div className="h-screen w-full flex flex-col justify-between">
      <h1 className="pt-40 flex justify-center text-5xl md:text-7xl font-bold font-montserrat">
        EXTERIORS
      </h1>
      {isLoading ? (
        <SkeletonUI />
      ) : (
        <div className="flex flex-col items-center justify-center w-full">
          <div className="grid md:grid-cols-2 grid-cols-1 md:gap-y-52 sm:gap-y-20 gap-y-14 w-full pt-10 pb-20">
            {data?.map((item: InteriorPost) => (
              <ProjectCard
                key={item._id}
                image={item.img}
                title={item.title}
                description={item.desc}
                pages={{ interiors: "interiors", exteriors: "" }}
                deleteHandler={() => handleDeleteAction(item._id)}
              />
            ))}
          </div>
        </div>
      )}
      <form
        action={handleAction}
        className="flex flex-col w-full max-w-md sm:max-w-lg md:max-w-2xl 
             mx-auto p-4 sm:p-6 md:p-8 gap-3 bg-gray-800 rounded-2xl shadow-md"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
          <Input
            name="title"
            type="text"
            placeholder="Title"
            required
            className="w-full"
          />
          <Input
            name="desc"
            type="text"
            placeholder="Description"
            required
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
          {isLoading && <Spinner />}
        </div>
      </form>
    </div>
  );
}
