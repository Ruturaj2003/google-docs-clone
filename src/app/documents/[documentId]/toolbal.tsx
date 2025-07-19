"use client";
import { cn } from "@/lib/utils";
import {
  LucideIcon,
  PrinterIcon,
  Redo2Icon,
  SpellCheckIcon,
  Undo2Icon,
} from "lucide-react";
import { useEditorStore } from "./use-editor-store";

interface ToolbarButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}

const ToolbarButton = ({
  onClick,
  isActive,
  icon: Icon,
}: ToolbarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
        isActive && "bg-neutral-200/80"
      )}
    >
      <Icon className="size-4" />
    </button>
  );
};

export const Toolbar = () => {
  const { editor } = useEditorStore();
  const sections: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
  }[][] = [
    [
      {
        label: "Undo",
        icon: Undo2Icon,
        onClick: () => {
          editor?.chain().focus().undo().run();
        },
      },
      {
        label: "Redo",
        icon: Redo2Icon,
        onClick: () => {
          editor?.chain().focus().redo().run();
        },
      },
      {
        label: "Print",
        icon: PrinterIcon,
        onClick: () => {
          window.print();
        },
      },
      {
        // Not working
        label: "Spell Check",
        icon: SpellCheckIcon,
        onClick: () => {
          const current = editor?.view.dom.getAttribute("spellcheck");
          editor?.view.dom.setAttribute(
            "spellcheck",
            current == "false" ? "true" : "false"
          );
          console.log(current);
        },
      },
    ],
  ];

  return (
    <>
      <div className=" bg-[#F1f4f8] overflow-x-auto px-2.5 py-0.5 rounded-xl min-h-[48px] flex items-center gap-x-0.5 shadow-sm  ">
        {sections[0].map((item) => {
          return <ToolbarButton key={item.label} {...item}></ToolbarButton>;
        })}
      </div>
    </>
  );
};
