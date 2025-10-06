"use server";

import connect from "@/utils/db";
import InteriorProjects from "@/models/InteriorProjects";
import ExteriorProjects from "@/models/ExteriorProjects";
import uploadToDrive from "./createPost";

export const createExteriorProjectPost = async (
  formData: FormData,
  projectId: string
) => {
  await createPostUtil(formData, "/api/exterior-projects", false, projectId);
};
export const createInteriorProjectPost = async (
  formData: FormData,
  projectId: string
) => {
  await createPostUtil(formData, "/api/interior-projects", true, projectId);
};

async function createPostUtil(
  formData: FormData,
  url: string,
  page: boolean,
  projectId: string
) {
  await connect();

  const file = formData.get("img") as File;
  let imgUrl = "";

  if (file && file instanceof File) {
    imgUrl = await uploadToDrive(file);
  }

  const rawFormData = {
    projectId,
    title: formData.get("title"),
    desc: formData.get("desc"),
    img: imgUrl,
  };

  const pagePost = page ? InteriorProjects : ExteriorProjects;

  const newPost = new pagePost(rawFormData);

  await newPost.save();
}
