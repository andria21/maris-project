"use server";

import connect from "@/utils/db";
import ExteriorPost from "@/models/ExteriorPosts";
import InteriorPost from "@/models/InteriorPost";
import { google } from "googleapis";
import { Readable } from "stream";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function uploadToDrive(file: File) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.accessToken)
    throw new Error("Not authenticated with Google");

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({
    access_token: session.user.accessToken,
    refresh_token: session.user.refreshToken,
  });

  const drive = google.drive({ version: "v3", auth: oauth2Client });

  const fileBuffer = await file.arrayBuffer();
  const createResponse = await drive.files.create({
    requestBody: {
      name: file.name,
      mimeType: file.type,
      parents: ["1R-9fNFDZO6bT1yPeADX7-iUZmvYk-4qQ"],
    },
    media: {
      mimeType: file.type,
      body: Readable.from(Buffer.from(fileBuffer)),
    },
    fields: "id,name,webViewLink",
  });

  return `https://drive.google.com/uc?id=${createResponse.data.id}`;
}

async function createPostUtil(formData: FormData, page: boolean) {
  await connect();

  const file = formData.get("img") as File;
  let imgUrl = "";

  if (file && file instanceof File) {
    imgUrl = await uploadToDrive(file);
  }

  const rawFormData = {
    title: formData.get("title") as string,
    desc: formData.get("desc") as string,
    img: imgUrl,
  };

  const PostModel = page ? InteriorPost : ExteriorPost;
  const newPost = new PostModel(rawFormData);
  await newPost.save();
}

export const createExteriorPost = async (formData: FormData) => {
  await createPostUtil(formData, false);
};

export const createInteriorPost = async (formData: FormData) => {
  await createPostUtil(formData, true);
};
