"use server";

import connect from "@/utils/db";
import InteriorProjects from "@/models/InteriorProjects";
import ExteriorProjects from "@/models/ExteriorProjects";

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
  const rawFormData = {
    projectId,
    title: formData.get("title"),
    desc: formData.get("desc"),
    img: formData.get("img"),
  };

  await connect();

  const pagePost = page ? InteriorProjects : ExteriorProjects;

  const newPost = new pagePost(rawFormData);

  await newPost.save();
}
