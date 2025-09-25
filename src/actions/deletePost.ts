"use server";

import { headers } from "next/headers";

export const deleteExteriorPost = async (id : string) => {
  await deletePostUtil(id, "/api/exterior-posts");
};
export const deleteInteriorPost = async (id : string) => {
  await deletePostUtil(id, "/api/interior-posts");
};

async function deletePostUtil(id: string, url: string) {
  const host = (await headers()).get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  console.log(id);

  await fetch(`${baseUrl}${url}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id),
  });
}
