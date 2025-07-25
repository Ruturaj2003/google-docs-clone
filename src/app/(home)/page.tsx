"use client";
import { usePaginatedQuery } from "convex/react";
import { Navbar } from "./navbar";
import { TemplatesGallery } from "./templates-gallery";
import { api } from "../../../convex/_generated/api";
import { DocumentsTable } from "./documents-table";
import { useSearchParam } from "@/hooks/useSearchParam";

export default function Home() {
  const [search] = useSearchParam();
  const { results, status, loadMore } = usePaginatedQuery(
    api.documents.getDocuments,
    { search },
    { initialNumItems: 5 },
  );

  return (
    <>
      <div className="flex min-h-screen flex-col">
        <div className="fixed left-0 right-0 top-0 z-10 h-16 bg-white p-4">
          <Navbar />
        </div>
        <div className="mt-16">
          <TemplatesGallery />
          <DocumentsTable
            documents={results}
            loadMore={loadMore}
            status={status}
          />
        </div>
      </div>
    </>
  );
}
