"use server";

import { headers } from "next/headers";

export const createExteriorPost = async (formData: FormData) => {
  await createPostUtil(formData, "/api/exterior-posts");
};
export const createInteriorPost = async (formData: FormData) => {
  await createPostUtil(formData, "/api/interior-posts");
};


async function createPostUtil(formData: FormData, url : string) {

  const host = (await headers()).get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  const rawFormData = {
    title: formData.get("title"),
    desc: formData.get("desc"),
    img: formData.get("img"),
  };
  console.log(rawFormData);

  await fetch(`${baseUrl}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rawFormData),
  });
}
