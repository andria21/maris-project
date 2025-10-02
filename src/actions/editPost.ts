"use server";

import connect from "@/utils/db";
import ExteriorPost from "@/models/ExteriorPosts";
import InteriorPost from "@/models/InteriorPost";

export const editExteriorPost = async (postId: string, formData: FormData) => {
  await editPostUtil(postId, formData, false);
};

export const editInteriorPost = async (postId: string, formData: FormData) => {
  await editPostUtil(postId, formData, true);
};

interface PostUpdateData {
  title?: string | null;
  desc?: string | null;
  img?: string | null;
}

async function editPostUtil(postId: string, formData: FormData, page: boolean) {
  await connect();

  const pagePost = page ? InteriorPost : ExteriorPost;

  // Build the update object with proper types
  const updateData: PostUpdateData = {};

  const title = formData.get("title")?.toString().trim();
  const desc = formData.get("desc")?.toString().trim();
  const img = formData.get("img")?.toString().trim();

  if (title) updateData.title = title;
  if (desc) updateData.desc = desc;
  if (img) updateData.img = img;

  const updatedPost = await pagePost.findByIdAndUpdate(postId, updateData, {
    new: true,
  });

  if (!updatedPost) throw new Error("Post not found");

  return updatedPost;
}
