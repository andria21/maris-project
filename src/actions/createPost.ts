"use server";

import connect from "@/utils/db";
import ExteriorPost from "@/models/ExteriorPosts";
import InteriorPost from "@/models/InteriorPost";

export const createExteriorPost = async (formData: FormData) => {
  await createPostUtil(formData, "/api/exterior-posts", false);
};
export const createInteriorPost = async (formData: FormData) => {
  await createPostUtil(formData, "/api/interior-posts", true);
};

async function createPostUtil(formData: FormData, url: string, page: boolean) {
  const rawFormData = {
    title: formData.get("title"),
    desc: formData.get("desc"),
    img: formData.get("img"),
  };

  await connect();

  const pagePost = page ? InteriorPost : ExteriorPost;

  const newPost = new pagePost(rawFormData);

  await newPost.save();
}
