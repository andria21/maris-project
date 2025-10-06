import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useUser } from "@/hooks/useUser";

type PostFormProps = {
  handleAction: (formData: FormData) => void | Promise<void>;
};

export default function PostForm({ handleAction }: PostFormProps) {
  const { isAuthenticated } = useUser();
  return (
    isAuthenticated && (
      <div className="p-4 sm:p-0">
        <form
          method="post"
          encType="multipart/form-data"
          action={handleAction}
          className="flex flex-col w-full max-w-md sm:max-w-lg md:max-w-2xl 
             mx-auto p-4 sm:p-6 md:p-8 gap-3 bg-[#171717] rounded-2xl shadow-md my-20"
        >
          <h1 className="text-center pb-4 text-lg font-semibold text-white">
            Add a new post
          </h1>
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
          </div>
        </form>
      </div>
    )
  );
}
