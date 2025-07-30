"use client";
import { Room } from "@/app/Room";
import { Editor } from "./editor";
import { Navbar } from "./navbar";
import { Toolbar } from "./toolbal";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

interface DocumentProps {
  preloadedDocument: Preloaded<typeof api.documents.getDocumentById>;
}

export const Document = ({ preloadedDocument }: DocumentProps) => {
  const document = usePreloadedQuery(preloadedDocument);
  return (
    <>
      {" "}
      <Room>
        <div className="min-h-screen bg-[#e8eced]">
          <div className="fixed left-0 right-0 top-0 z-10 flex flex-col gap-y-2 bg-[#e8eced] px-4 pt-2 print:hidden">
            <Navbar data={document} />
            <Toolbar></Toolbar>
          </div>
          <div className="pt-[114px] print:pt-0">
            <Editor initialContent={document.initialContent}></Editor>
          </div>
        </div>
      </Room>
    </>
  );
};
