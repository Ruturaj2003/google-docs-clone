"use client";
import { useQuery } from "convex/react";
import { Navbar } from "./navbar";
import { TemplatesGallery } from "./templates-gallery";
import { api } from "../../../convex/_generated/api";

export default function Home() {
  const documents = useQuery(api.documents.getDocuments);
  if (documents === undefined) {
    return <p>The Documents are being Summoned</p>;
  }
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <div className="fixed left-0 right-0 top-0 z-10 h-16 bg-white p-4">
          <Navbar />
        </div>
        <div className="mt-16">
          <TemplatesGallery />
          {documents?.map((document, _index: number) => (
            <span key={_index}>
              {document.title}

              <h1>Break</h1>
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
