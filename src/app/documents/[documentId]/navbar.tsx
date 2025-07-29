"use client";
import Image from "next/image";
import Link from "next/link";
import { DocumentInput } from "./document-input";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  BoldIcon,
  FileIcon,
  FileJsonIcon,
  FilePenIcon,
  FilePlus2Icon,
  FileTextIcon,
  Globe2Icon,
  ItalicIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  Strikethrough,
  TextIcon,
  Trash2Icon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";
import { BsFilePdf } from "react-icons/bs";

import { useEditorStore } from "./use-editor-store";
import { Avatars } from "./avatars";
import { Inbox } from "./inbox";

export const Navbar = () => {
  const { editor } = useEditorStore();

  const insertTable = ({ rows, cols }: { rows: number; cols: number }) => {
    editor
      ?.chain()
      .focus()
      .insertTable({ rows, cols, withHeaderRow: false })
      .run();
  };

  const onDownload = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  };

  const onSaveText = () => {
    if (!editor) return;
    const content = editor.getText();
    const blob = new Blob([content], {
      type: "text/plain",
    });

    onDownload(blob, "TextDocument.txt"); // TODO : Use DOCUMENT NAME
  };

  const onSaveHTML = () => {
    if (!editor) return;
    const content = editor.getHTML();
    const blob = new Blob([content], {
      type: "text/html",
    });

    onDownload(blob, "HTMLDocument.html"); // TODO : Use DOCUMENT NAME
  };

  const onSaveJSON = () => {
    if (!editor) return;
    const content = editor.getJSON();
    const blob = new Blob([JSON.stringify(content)], {
      type: "application/json",
    });

    onDownload(blob, "JSONDocument.json"); // TODO : Use DOCUMENT NAME
  };

  return (
    <>
      <nav className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href={"/"}>
            <Image src={"/logo.svg"} alt="logo" width={36} height={36} />
          </Link>

          <div className="flex flex-col">
            <DocumentInput />
            {/* Menu Bar */}
            {/* Menu Bar Container */}
            <div className="flex">
              {/* Menubar Wrapper */}
              <Menubar className="h-auto border-none bg-transparent p-0 shadow-none">
                {/* File Menu */}
                <MenubarMenu>
                  <MenubarTrigger className="h-auto rounded-sm px-[7px] py-0.5 text-sm font-normal hover:bg-muted">
                    File
                  </MenubarTrigger>

                  {/* Dropdown Content for 'File' */}
                  <MenubarContent className="print:hidden">
                    {/* Save Submenu */}
                    <MenubarSub>
                      <MenubarSubTrigger>
                        <FileIcon className="mr-2 size-4" />
                        Save
                      </MenubarSubTrigger>

                      {/* Save Options */}
                      <MenubarSubContent>
                        <MenubarItem onClick={onSaveJSON}>
                          <FileJsonIcon className="mr-2 size-4" />
                          JSON
                        </MenubarItem>
                        <MenubarItem onClick={onSaveHTML}>
                          <Globe2Icon className="mr-2 size-4" />
                          HTML
                        </MenubarItem>
                        <MenubarItem onClick={() => window.print()}>
                          <BsFilePdf className="mr-2 size-4" />
                          PDF
                        </MenubarItem>
                        <MenubarItem onClick={onSaveText}>
                          <FileTextIcon className="mr-2 size-4" />
                          Text
                        </MenubarItem>
                      </MenubarSubContent>
                    </MenubarSub>
                    {/* New Document Option */}
                    <MenubarItem>
                      <FilePlus2Icon className="mr-2 size-4" />
                      New Document
                    </MenubarItem>
                    <MenubarSeparator></MenubarSeparator>
                    <MenubarItem>
                      <FilePenIcon className="mr-2 size-4" />
                      Rename
                    </MenubarItem>{" "}
                    <MenubarItem>
                      <Trash2Icon className="mr-2 size-4" />
                      Remove
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem onClick={() => window.print()}>
                      <PrinterIcon className="mr-2 size-4" />
                      Print <MenubarShortcut>Ctrl + P</MenubarShortcut>
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>

                {/* Edit Menu (Trigger Only) */}
                <MenubarMenu>
                  <MenubarTrigger className="h-auto rounded-sm px-[7px] py-0.5 text-sm font-normal hover:bg-muted">
                    Edit
                  </MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem
                      onClick={() => editor?.chain().focus().undo().run()}
                    >
                      <Undo2Icon className="mr-2 size-4" />
                      Undo
                      <MenubarShortcut>Ctrl + Z</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem
                      onClick={() => editor?.chain().focus().redo().run()}
                    >
                      <Redo2Icon className="mr-2 size-4" />
                      Redo
                      <MenubarShortcut>Ctrl + Y</MenubarShortcut>
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>

                {/* Insert Menu (Trigger Only) */}
                <MenubarMenu>
                  <MenubarTrigger className="h-auto rounded-sm px-[7px] py-0.5 text-sm font-normal hover:bg-muted">
                    Insert
                  </MenubarTrigger>
                  <MenubarContent>
                    <MenubarSub>
                      <MenubarSubTrigger>Table</MenubarSubTrigger>
                      <MenubarSubContent>
                        {Array.from({ length: 4 }, (_, i) => {
                          const size = i + 1;
                          return (
                            <MenubarItem
                              key={`${size}x${size}`}
                              onClick={() =>
                                insertTable({ rows: size, cols: size })
                              }
                            >
                              {size} × {size}
                            </MenubarItem>
                          );
                        })}
                      </MenubarSubContent>
                    </MenubarSub>
                  </MenubarContent>
                </MenubarMenu>

                {/* Format Menu (Trigger Only) */}
                <MenubarMenu>
                  <MenubarTrigger className="h-auto rounded-sm px-[7px] py-0.5 text-sm font-normal hover:bg-muted">
                    Format
                  </MenubarTrigger>
                  <MenubarContent>
                    <MenubarSub>
                      <MenubarSubTrigger>
                        <TextIcon className="mr-2 size-4" />
                        Text
                      </MenubarSubTrigger>
                      <MenubarSubContent>
                        <MenubarItem
                          onClick={() =>
                            editor?.chain().focus().toggleBold().run()
                          }
                        >
                          <BoldIcon className="mr-2 size-4" />
                          Bold
                          <MenubarShortcut>Ctrl + B</MenubarShortcut>
                        </MenubarItem>{" "}
                        <MenubarItem
                          onClick={() =>
                            editor?.chain().focus().toggleItalic().run()
                          }
                        >
                          <ItalicIcon className="mr-2 size-4" />
                          Italic
                          <MenubarShortcut>Ctrl + I</MenubarShortcut>
                        </MenubarItem>{" "}
                        <MenubarItem
                          onClick={() =>
                            editor?.chain().focus().toggleUnderline().run()
                          }
                        >
                          <UnderlineIcon className="mr-2 size-4" />
                          Underline
                          <MenubarShortcut>Ctrl + U</MenubarShortcut>
                        </MenubarItem>{" "}
                        <MenubarItem
                          onClick={() =>
                            editor?.chain().focus().toggleStrike().run()
                          }
                        >
                          <Strikethrough className="mr-2 size-4" />
                          Strike Through&nbsp;&nbsp;
                          <MenubarShortcut>Ctrl + S</MenubarShortcut>
                        </MenubarItem>
                      </MenubarSubContent>
                    </MenubarSub>
                    <MenubarItem
                      onClick={() =>
                        editor?.chain().focus().unsetAllMarks().run()
                      }
                    >
                      <RemoveFormattingIcon className="mr-2 size-4" />
                      Clear Formatting
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 pl-6">
          <Inbox />
          <Avatars />
          <OrganizationSwitcher
            // To cause Refresh and get new JWT token
            afterCreateOrganizationUrl={"/"}
            afterLeaveOrganizationUrl="/"
            afterSelectOrganizationUrl={"/"}
            afterSelectPersonalUrl={"/"}
          />
          <UserButton />
        </div>
      </nav>
    </>
  );
};
