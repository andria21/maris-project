"use server";

import connect from "@/utils/db";
import ExteriorPost from "@/models/ExteriorPosts";
import InteriorPost from "@/models/InteriorPost";
import uploadToDrive from "./createPost";

export const editExteriorPost = async (postId: string, formData: FormData) => {
  await editPostUtil(postId, formData, false);
};

export const editInteriorPost = async (postId: string, formData: FormData) => {
  await editPostUtil(postId, formData, true);
};

interface PostUpdateData {
  title?: string;
  desc?: string;
  img?: string;
}

async function editPostUtil(postId: string, formData: FormData, page: boolean) {
  await connect();

  const PostModel = page ? InteriorPost : ExteriorPost;

  const existingPost = await PostModel.findById(postId);
  if (!existingPost) throw new Error("Post not found");

  const updateData: PostUpdateData = {};

  const title = formData.get("title")?.toString().trim();
  const desc = formData.get("desc")?.toString().trim();
  if (title) updateData.title = title;
  if (desc) updateData.desc = desc;

  const img = formData.get("img");
  if (img instanceof File && img.size > 0) {
    const imgUrl = await uploadToDrive(img);
    updateData.img = imgUrl;
  } else if (typeof img === "string" && img.trim() !== "") {
    updateData.img = img.trim();
  }

  const updatedPost = await PostModel.findByIdAndUpdate(postId, updateData, {
    new: true,
  });

  return updatedPost;
}
