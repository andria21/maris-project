"use server";

import connect from "@/utils/db";
import ExteriorPost from "@/models/ExteriorPosts";
import InteriorPost from "@/models/InteriorPost";
import { google } from "googleapis";
import { Readable } from "stream";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

async function uploadToDrive(file: File | Blob) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.accessToken)
    throw new Error("Not authenticated with Google");

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({
    access_token: session.user.accessToken,
    refresh_token: session.user.refreshToken,
  });

  const drive = google.drive({ version: "v3", auth: oauth2Client });

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Fallbacks if the object is a Blob
  const fileName = file instanceof File ? file.name : "upload.jpg";
  const mimeType = file instanceof File ? file.type : "image/jpeg";

  const createResponse = await drive.files.create({
    requestBody: {
      name: fileName,
      mimeType,
      parents: ["1R-9fNFDZO6bT1yPeADX7-iUZmvYk-4qQ"],
    },
    media: {
      mimeType,
      body: Readable.from(buffer),
    },
    fields: "id,name,webViewLink",
  });

  return `https://drive.google.com/uc?id=${createResponse.data.id}`;
}

async function createPostUtil(formData: FormData, page: boolean) {
  await connect();

  const file = formData.get("img");
  let imgUrl = "";

  if (file && typeof file !== "string") {
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
