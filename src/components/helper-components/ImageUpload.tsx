"use client";
import { useState } from "react";
import actionDriveHelper from "@/actions/uploadImageAction";

export default function UploadPage() {
  const [uploadedLink, setUploadedLink] = useState<string | null>(null);

  return (
    <form
      action={async (formData: FormData) => {
        const file = formData.get("file") as File;
        if (!file) throw new Error("No file selected");

        const uploadedFile = await actionDriveHelper(file);
        setUploadedLink(uploadedFile.webViewLink || null);
      }}
    >
      <input type="file" name="file" />
      <button type="submit">Upload</button>
      {uploadedLink && <p>Uploaded: <a href={uploadedLink} target="_blank">{uploadedLink}</a></p>}
    </form>
  );
}
