import { Upload } from "lucide-react"; // Example icon from lucide-react
import { Button } from "@/components/ui/button"; // Assuming standard shadcn path
import { Input } from "@/components/ui/input"; // Assuming standard shadcn path
import { Label } from "@/components/ui/label"; // Useful for associating the label and input
import React, { useRef, useState } from "react";

const ImagePicker = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("No file selected");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFileName(file ? file.name : "No file selected");
  };

  return (
    <div className="flex w-full items-center space-x-2">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        {/*
          IMPORTANT: This is the native file input. 
          It must have the exact same 'name' ("img") as expected by your Server Action.
        */}
        <Input
          id="img-upload"
          name="img"
          type="file"
          accept="image/*" // Restrict to image files
          required
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden" // Hide the native ugly file input
        />

        {/* Button to trigger the hidden file input */}
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center justify-start text-left w-full h-10 cursor-pointer"
        >
          <Upload className="mr-2 h-4 w-4" />
          {/* Display the selected file's name */}
          {fileName}
        </Button>
      </div>
    </div>
  );
};

export default ImagePicker;
