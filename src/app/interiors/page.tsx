"use client";

import ProjectCard from "@/components/helper-components/ProjectCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import React from "react";
import useSWR from "swr";
import { toast } from "sonner";
import { createInteriorPost } from "@/actions/createPost";
import { deleteInteriorPost } from "@/actions/deletePost";

type InteriorPost = {
  _id: string;
  img: string;
  title: string;
  desc: string;
};

export default function Interiors() {
  const fetcher = (...args: [RequestInfo, RequestInit?]) =>
    fetch(...args).then((res) => res.json());

  const { data, mutate, error, isLoading } = useSWR(
    `/api/interior-posts`,
    fetcher
  );

  async function handleAction(formData: FormData) {
    try {
      await createInteriorPost(formData);
      mutate();
      toast.success("Post created successfully");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  }

  async function handleDeleteAction(id: string) {
    try {
      await deleteInteriorPost(id);
      mutate();
      toast.success("Post deleted successfully");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  }

  if (isLoading)
    return (
      <div className="h-screen w-full flex items-center justify-center p-4 gap-2">
        <Spinner />
        <p>Loading, please wait...</p>
      </div>
    );

  if (error) return <p>There&apos been an error</p>;

  return (
    <div className="h-screen w-full flex flex-col justify-between">
      <h1 className="pt-40 flex justify-center text-7xl font-bold">
        INTERIORS
      </h1>
      <div className="flex flex-col items-center justify-center w-full">
        <div className="grid grid-cols-2 gap-y-52 w-full pt-10 pb-20">
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
      <form
        action={handleAction}
        className="flex flex-col w-full items-center justify-center gap-2 px-150 pb-50"
      >
        <Input name="title" type="text" placeholder="Title" required />
        <Input name="desc" type="text" placeholder="Description" required />
        <Input name="img" type="text" placeholder="Image" required />
        <Button variant={"default"} type="submit" className="cursor-pointer">
          Submit
        </Button>
        {isLoading && <Spinner />}
      </form>
    </div>
  );
}
