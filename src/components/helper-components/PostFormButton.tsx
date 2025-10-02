"use client";

import { Plus } from "lucide-react";
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
  handleAction: (formData: FormData) => void | Promise<void>;
};

export default function PostFormButton({ handleAction }: PostFormProps) {
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useUser();
  return (
    isAuthenticated && (
      <Dialog modal={false} open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div className="fixed right-10 bottom-10 rounded-full bg-[#37353E] p-4 hover:bg-gray-600 cursor-pointer text-white shadow-lg">
            <Plus className="w-6 h-6" />
          </div>
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
              action={handleAction}
              onSubmit={() => setOpen(false)}
            >
              <div className="grid gap-3">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Post title"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  name="desc"
                  placeholder="Post description"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="image">Image</Label>
                <Input
                  id="image"
                  name="img"
                  placeholder="Post image"
                  required
                />
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
