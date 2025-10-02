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

type PostFormProps = {
  isAuthenticated: boolean;
  handleEditAction?: (id: string, formData: FormData) => void | Promise<void>;
  id: string;
};

export default function EditForm({

  handleEditAction,
  id,
}: PostFormProps) {
  const [open, setOpen] = useState(false);
    const { isAuthenticated } = useUser();
  return (
    isAuthenticated && (
      <Dialog modal={false} open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant={"outline"}
            className="cursor-pointer absolute z-20 right-2 top-2 hover:bg-input/90 dark:hover:bg-foreground/50"
          >
            <Pencil className="h-6 w-6" />
          </Button>
        </DialogTrigger>

        <DialogPortal>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn z-50" />
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Post</DialogTitle>
              <DialogDescription>
                Fill out the form to add a new post.
              </DialogDescription>
            </DialogHeader>

            <form
              className="grid gap-4"
              action={(formData: FormData) => handleEditAction?.(id, formData)}
              onSubmit={() => setOpen(false)}
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
                <Input id="image" name="img" placeholder="Post image" />
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" className="cursor-pointer">
                    Cancel
                  </Button>
                </DialogClose>

                <Button type="submit" className="cursor-pointer">
                  Save
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    )
  );
}
