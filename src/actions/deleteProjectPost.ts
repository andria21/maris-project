"use server";

import connect from "@/utils/db";
import ExteriorPost from "@/models/ExteriorPosts";
import InteriorProjectPost from "@/models/InteriorProjects";

export const deleteExteriorPost = async (id: string) => {
  await deletePostUtil(id, "/api/exterior-posts", false);
};
export const deleteInteriorProjectPost = async (id: string) => {
  await deletePostUtil(id, "/api/interior-projects", true);
};

async function deletePostUtil(id: string, url: string, page: boolean) {
  await connect();

  const pagePost = page ? InteriorProjectPost : ExteriorPost;

  await pagePost.findByIdAndDelete(id);
}
