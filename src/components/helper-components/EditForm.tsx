"use client";

import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useUser } from "@/hooks/useUser";
import { Spinner } from "../ui/shadcn-io/spinner";

type EditFormProps = {
  handleEditAction?: (id: string, formData: FormData) => void | Promise<void>;
  id: string;
};

export default function EditForm({ handleEditAction, id }: EditFormProps) {
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAuthenticated) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!handleEditAction) return;

    const form = e.currentTarget;
    const formData = new FormData(form);

    const fileInput = formData.get("img") as File;
    if (!fileInput || !(fileInput instanceof File)) {
      return alert("Please select an image file.");
    }

    setIsSubmitting(true);
    try {
      await handleEditAction(id, formData);
      form.reset();
      setOpen(false);
    } catch (err) {
      console.error("Failed to edit post:", err);
      alert("Error editing post.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog modal={false} open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="cursor-pointer absolute z-20 right-2 top-2 hover:bg-input/90 dark:hover:bg-foreground/50"
        >
          <Pencil className="h-6 w-6" />
        </Button>
      </DialogTrigger>

      <DialogPortal>
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn z-50" />
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Post</DialogTitle>
            <DialogDescription>
              Fill out the form to edit your post.
            </DialogDescription>
          </DialogHeader>

          <form
            method="post"
            encType="multipart/form-data"
            className="grid gap-4"
            onSubmit={handleSubmit}
          >
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" placeholder="Post title" />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="desc"
                placeholder="Post description"
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="image">Image</Label>
              <Input id="image" name="img" type="file" accept="image/*" />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button
                  variant="outline"
                  disabled={isSubmitting}
                  className="cursor-pointer"
                >
                  Cancel
                </Button>
              </DialogClose>

              <Button
                type="submit"
                className="flex items-center justify-center gap-2 cursor-pointer"
                disabled={isSubmitting}
              >
                {isSubmitting && <Spinner />}
                {isSubmitting ? "Updating..." : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
