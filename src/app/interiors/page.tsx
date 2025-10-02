"use client";

import ProjectCard from "@/components/helper-components/ProjectCard";
import React from "react";
import useSWR from "swr";
import { toast } from "sonner";
import { createInteriorPost } from "@/actions/createPost";
import { deleteInteriorPost } from "@/actions/deletePost";
import SkeletonUI from "@/components/skeleton";
import PostFormButton from "@/components/helper-components/PostFormButton";
import { editInteriorPost } from "@/actions/editPost";
import MotionWrapper from "@/components/MotionProvider";

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

  async function handleEditeAction(id: string, formData: FormData) {
    try {
      await editInteriorPost(id, formData);
      mutate();
      toast.success("Post updated successfully");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  }
  if (error) return <p>There&apos; been an error</p>;

  return (
    <MotionWrapper>
      <div className=" w-full flex flex-col justify-between pb-20">
        <h1 className="pt-40 flex justify-center text-5xl md:text-7xl font-bold font-montserrat">
          INTERIORS
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
                  projectId={`/interiors/${item._id}`}
                  isLink
                  editHandler={handleEditeAction}
                  id={item._id}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <PostFormButton handleAction={handleAction} />
    </MotionWrapper>
  );
}
