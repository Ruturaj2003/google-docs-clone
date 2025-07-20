"use client";
import { cn } from "@/lib/utils";
import {
  BoldIcon,
  ChevronDownIcon,
  HighlighterIcon,
  ItalicIcon,
  ListTodoIcon,
  LucideIcon,
  MessageSquarePlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SpellCheckIcon,
  Underline,
  Undo2Icon,
} from "lucide-react";

import { useEditorStore } from "./use-editor-store";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  // DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type Level } from "@tiptap/extension-heading";
import { type ColorResult, CompactPicker } from "react-color";

const HighlightColorButton = () => {
  const { editor } = useEditorStore();

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setHighlight({ color: color.hex }).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={
            "h-7 min-w-7 shrink-0 flex  flex-col items-center justify-center rouded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
          }
        >
          <HighlighterIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2.5">
        <CompactPicker onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const TextColorButton = () => {
  const { editor } = useEditorStore();

  const value = editor?.getAttributes("textStyle").color || "#000000";

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setColor(color.hex).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={
            "h-7 min-w-7 shrink-0 flex  flex-col items-center justify-center rouded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
          }
        >
          <span className="text-xs">A</span>
          <div className="h-1 w-full" style={{ backgroundColor: value }}></div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2.5">
        <CompactPicker color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
const HeadingLevelButton = () => {
  const { editor } = useEditorStore();

  const headings = [
    {
      label: "Normal text",
      value: 0,
      fontSize: "16px",
    },
    {
      label: "Heading 1",
      value: 1,
      fontSize: "32px",
    },
    {
      label: "Heading 2",
      value: 2,
      fontSize: "24px",
    },
    {
      label: "Heading 3",
      value: 3,
      fontSize: "20px",
    },
    {
      label: "Heading 4",
      value: 4,
      fontSize: "18px",
    },
    {
      label: "Heading 5",
      value: 5,
      fontSize: "16px",
    },
    {
      label: "Heading 6",
      value: 6,
      fontSize: "14px",
    },
  ];

  const getCurrentHeading = () => {
    for (let level = 1; level <= 6; level++) {
      if (editor?.isActive("heading", { level })) {
        return `Heading ${level}`;
      }
    }
    return "Normal Text";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={
            "h-7 min-w-7 shrink-0 flex items-center justify-center rouded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
          }
        >
          <span className="truncate">{getCurrentHeading()}</span>
          <ChevronDownIcon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {headings.map(({ label, value, fontSize }) => {
          return (
            <button
              onClick={() => {
                if (value === 0) {
                  editor?.chain().focus().setParagraph().run();
                } else {
                  editor
                    ?.chain()
                    .focus()
                    .toggleHeading({ level: value as Level })
                    .run();
                }
              }}
              className={cn(
                "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                (value === 0 && !editor?.isActive("heading")) ||
                  (editor?.isActive("heading", { level: value }) &&
                    "bg-neutral-300/80")
              )}
              key={value}
              style={{ fontSize: fontSize }}
            >
              {label}
            </button>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const FontFamilyButtom = () => {
  const { editor } = useEditorStore();

  const fonts = [
    { label: "Arial", value: "Arial" },
    { label: "Georgia", value: "Georgia" },
    { label: "Times New Roman", value: "Times New Roman" },
    { label: "Courier New", value: "Courier New" },
    { label: "Verdana", value: "Verdana" },
    { label: "Trebuchet MS", value: "Trebuchet MS" },
    { label: "Lucida Console", value: "Lucida Console" },
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={
            "h-7 w-[120px] shrink-0 flex items-center justify-center rouded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
          }
        >
          <span className="truncate">
            {editor?.getAttributes("textStyle").fontFamily || "Arial"}
          </span>
          <ChevronDownIcon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {fonts.map(({ label, value }) => {
          return (
            <button
              onClick={() => editor?.chain().focus().setFontFamily(value).run()}
              key={value}
              className={cn(
                "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                editor?.getAttributes("textStyle").fontFamily === value &&
                  "bg-neutral-200/80"
              )}
              style={{ fontFamily: value }}
            >
              <span>{label}</span>
            </button>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

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
    [
      {
        label: "Bold",
        icon: BoldIcon,
        isActive: editor?.isActive("bold"),
        onClick: () => {
          editor?.chain().focus().toggleBold().run();
        },
      },
      {
        label: "Italic",
        icon: ItalicIcon,
        isActive: editor?.isActive("italic"),
        onClick: () => {
          editor?.chain().focus().toggleItalic().run();
        },
      },
      {
        label: "Underline",
        icon: Underline,
        isActive: editor?.isActive("underline"),
        onClick: () => {
          editor?.chain().focus().toggleUnderline().run();
        },
      },
    ],
    [
      {
        label: "Comment",
        icon: MessageSquarePlusIcon,
        onClick: () => console.log("TODO : Comment"),
        isActive: false, // TODO : Enable this func
      },
      {
        label: "List Todo",
        icon: ListTodoIcon,
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
        isActive: editor?.isActive("taskList"),
      },
      {
        label: "Remove Formatting",
        icon: RemoveFormattingIcon,
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
      },
    ],
  ];

  return (
    <>
      <div className=" bg-[#F1f4f8] overflow-x-auto px-2.5 py-0.5 rounded-xl min-h-[48px] flex  items-center gap-x-0.5 shadow-sm  ">
        {sections[0].map((item) => {
          return <ToolbarButton key={item.label} {...item}></ToolbarButton>;
        })}
        <Separator orientation="vertical" className="h-6 bg-neutral-300" />
        <FontFamilyButtom />

        <Separator orientation="vertical" className="h-6 bg-neutral-300" />
        <HeadingLevelButton />
        <Separator orientation="vertical" className="h-6 bg-neutral-300" />
        {/* Font size */}
        <Separator orientation="vertical" className="h-6 bg-neutral-300" />
        {sections[1].map((item) => {
          return <ToolbarButton key={item.label} {...item}></ToolbarButton>;
        })}
        <TextColorButton></TextColorButton>
        <HighlightColorButton></HighlightColorButton>
        <Separator orientation="vertical" className="h-6 bg-neutral-300" />
        {/*  Link*/}
        {/* Image  */}
        {/* Align */}
        {/* Line Height */}
        {/* List */}
        {sections[2].map((item) => {
          return <ToolbarButton key={item.label} {...item}></ToolbarButton>;
        })}
      </div>
    </>
  );
};
