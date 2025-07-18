"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Image from "@tiptap/extension-image";
import ImageResize from "tiptap-extension-resize-image";
import StarterKit from "@tiptap/starter-kit";
import { useEditorStore } from "./use-editor-store";

export const Editor = () => {
  const { setEditor } = useEditorStore();
  const editor = useEditor({
    onCreate({ editor }) {
      setEditor(editor);
    },
    editorProps: {
      attributes: {
        style: "padding-left:56px; padding-right:56px;",
        class:
          "focus:outline-none print:border-0 bg-white border-[#c7c7c7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text border shadow-sm",
      },
    },
    extensions: [
      StarterKit,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Image,
      ImageResize,
    ],
    content: `
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th colspan="3">Description</th>
            </tr>
            <tr>
              <td>Cyndi Lauper</td>
              <td>Singer</td>
              <td>Songwriter</td>
              <td>Actress</td>
            </tr>
          </tbody>
        </table>
      `,
    immediatelyRender: false,
  });
  return (
    <>
      <div
        className="
    size-full 
    overflow-x-auto 
    bg-[#e3e7ec] px-4 
    print:bg-white 
    print:overflow-visible 
    print:p-0
    "
      >
        <div
          className="min-w-max flex justify-center w-[816px] py-4 
      print:py-0
      mx-auto
      print:w-full
      print:min-w-0
      "
        >
          <EditorContent editor={editor} />
        </div>
      </div>
    </>
  );
};
