"use client";
import { useEditor, EditorContent } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
export const Editor = () => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        style: "padding-left:56px; padding-right:56px;",
        class:
          "focus:outline-none print:border-0 bg-white border-[#c7c7c7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text border shadow-sm",
      },
    },
    extensions: [StarterKit],
    content: "<h1>Hello World<h1/>",
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
