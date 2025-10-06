"use server";

import connect from "@/utils/db";
import ExteriorProjectPost from "@/models/ExteriorProjects";
import InteriorProjectPost from "@/models/InteriorProjects";
import uploadToDrive from "./createPost";

export const editExteriorProjectPost = async (
  postId: string,
  formData: FormData
) => {
  await editPostUtil(postId, formData, false);
};

export const editInteriorProjectPost = async (
  postId: string,
  formData: FormData
) => {
  await editPostUtil(postId, formData, true);
};

interface PostUpdateData {
  title?: string | null;
  desc?: string | null;
  img?: string | null;
}

async function editPostUtil(postId: string, formData: FormData, page: boolean) {
  await connect();

  const pagePost = page ? InteriorProjectPost : ExteriorProjectPost;

  // Build the update object with proper types
  const updateData: PostUpdateData = {};

  const file = formData.get("img") as File;
  let imgUrl = "";

  if (file && file instanceof File && file.size > 0) {
    imgUrl = await uploadToDrive(file);
  }

  const title = formData.get("title")?.toString().trim();
  const desc = formData.get("desc")?.toString().trim();
  const img = imgUrl;

  if (title) updateData.title = title;
  if (desc) updateData.desc = desc;
  if (img) updateData.img = img;

  const updatedPost = await pagePost.findByIdAndUpdate(postId, updateData, {
    new: true,
  });

  if (!updatedPost) throw new Error("Post not found");

  return updatedPost;
}
