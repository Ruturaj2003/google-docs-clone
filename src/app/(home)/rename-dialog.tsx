"use client";

import { Id } from "../../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface RenameDialogProps {
  documentId: Id<"documents">;
  children: React.ReactNode;
  initialTitle: string;
}

export const RenameDialog = ({
  children,
  initialTitle,
  documentId,
}: RenameDialogProps) => {
  const update = useMutation(api.documents.updateById);
  const [isUpdating, setIsUpdating] = useState(false);

  const [title, setTitle] = useState(initialTitle);
  const [open, setOpen] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUpdating(true);

    update({
      id: documentId,
      title: title.trim() || "Untitled",
    })
      .then(() => {
        setOpen(false);
      })
      .finally(() => {
        setIsUpdating(false);
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Rename Document</DialogTitle>
            <DialogDescription>
              Enter a new Name for this Document
            </DialogDescription>
          </DialogHeader>
          <div className="my-4">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={"Document Name"}
              onClick={(e) => e.stopPropagation()}
            ></Input>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant={"ghost"}
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
              }}
              disabled={isUpdating}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
              }}
              disabled={isUpdating}
            >
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
