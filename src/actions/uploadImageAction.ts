"use server";
import { google } from "googleapis";
import { Readable } from "stream";
import { cookies } from "next/headers";

export default async function actionDriveHelper(file: File) {
  // Read tokens from cookies
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get("google_tokens")?.value;

  if (!tokenCookie) throw new Error("No OAuth tokens found in cookies");

  const tokens = JSON.parse(tokenCookie);

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials(tokens);

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

  return createResponse.data;
}
