"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Table from "@tiptap/extension-table";
import FontFamily from "@tiptap/extension-font-family";
import TextStyle from "@tiptap/extension-text-style";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import ImageResize from "tiptap-extension-resize-image";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import { Color } from "@tiptap/extension-color";
import { useEditorStore } from "./use-editor-store";
// Custom
import { FontSizeExtension } from "@/extensions/font-size";
import { LineHeightExetension } from "@/extensions/line-height";
import { Ruler } from "./ruler";
import { useLiveblocksExtension } from "@liveblocks/react-tiptap";
import { Threads } from "@/app/Threads";
import { useStorage } from "@liveblocks/react/suspense";

interface EditorProps {
  initialContent?: string | undefined;
}

export const Editor = ({ initialContent }: EditorProps) => {
  const liveblocks = useLiveblocksExtension({ initialContent });
  const leftMargin = useStorage((root) => root.leftMargin);
  const rightMargin = useStorage((root) => root.rightMargin);
  const { setEditor } = useEditorStore();
  const editor = useEditor({
    onCreate({ editor }) {
      setEditor(editor);
    },
    onDestroy() {
      setEditor(null);
    },
    onUpdate({ editor }) {
      setEditor(editor);
    },
    onSelectionUpdate({ editor }) {
      setEditor(editor);
    },
    onTransaction({ editor }) {
      setEditor(editor);
    },
    onFocus({ editor }) {
      setEditor(editor);
    },
    onBlur(props) {
      setEditor(props.editor);
    },
    onContentError(props) {
      setEditor(props.editor);
    },
    editorProps: {
      attributes: {
        style: ` padding-left:${leftMargin ?? 56}px; padding-right:${rightMargin ?? 56}px;`,
        class:
          "focus:outline-none print:border-0 bg-white border-[#c7c7c7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text border shadow-sm",
      },
    },

    extensions: [
      liveblocks,
      StarterKit.configure({
        // The Liveblocks extension comes with its own history handling
        history: false,
      }),
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
      Underline,
      FontFamily.configure({
        types: ["textStyle"],
      }),
      TextStyle,
      Highlight.configure({ multicolor: true }),
      Color,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      FontSizeExtension,
      LineHeightExetension.configure({
        types: ["heading", "paragraph"],
      }),
    ],

    immediatelyRender: false,
  });

  return (
    <>
      <div className="size-full overflow-x-auto bg-[#e3e7ec] px-4 print:overflow-visible print:bg-white print:p-0">
        <Ruler />

        <div className="mx-auto flex w-[816px] min-w-max justify-center py-4 print:w-full print:min-w-0 print:py-0">
          <EditorContent editor={editor} />
          <Threads editor={editor} />
        </div>
      </div>
    </>
  );
};
