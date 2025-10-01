"use server";

import connect from "@/utils/db";
import ExteriorProjectPost from "@/models/ExteriorProjects";
import InteriorProjectPost from "@/models/InteriorProjects";

export const deleteExteriorProjectPost = async (id: string) => {
  await deletePostUtil(id, "/api/exterior-projects", false);
};
export const deleteInteriorProjectPost = async (id: string) => {
  await deletePostUtil(id, "/api/interior-projects", true);
};

async function deletePostUtil(id: string, url: string, page: boolean) {
  await connect();

  const pagePost = page ? InteriorProjectPost : ExteriorProjectPost;

  await pagePost.findByIdAndDelete(id);
}
