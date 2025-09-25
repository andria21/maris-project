"use server";

import connect from "@/utils/db";
import ExteriorPost from "@/models/ExteriorPosts";
import InteriorPost from "@/models/InteriorPost";

export const deleteExteriorPost = async (id: string) => {
  await deletePostUtil(id, "/api/exterior-posts", false);
};
export const deleteInteriorPost = async (id: string) => {
  await deletePostUtil(id, "/api/interior-posts", true);
};

async function deletePostUtil(id: string, url: string, page: boolean) {
  await connect();

  const pagePost = page ? InteriorPost : ExteriorPost;

  await pagePost.findByIdAndDelete(id);
}
