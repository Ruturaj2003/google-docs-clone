import { PaginationStatus } from "convex/react";
import { Doc } from "../../../convex/_generated/dataModel";
import { LoaderIcon } from "lucide-react";
import {
  TableHead,
  TableHeader,
  TableRow,
  Table,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { DocumentRow } from "./document-row";
import { Button } from "@/components/ui/button";

interface DocumentsTableProps {
  documents: Doc<"documents">[] | undefined;
  loadMore: (numItems: number) => void;
  status: PaginationStatus;
}

export const DocumentsTable = ({
  documents,
  loadMore,
  status,
}: DocumentsTableProps) => {
  return (
    <div className="mx-auto flex max-w-screen-xl flex-col gap-5 px-16 py-6">
      {documents === undefined ? (
        <div className="animate-fade-in flex flex-col items-center justify-center py-20">
          <LoaderIcon className="size-6 animate-spin text-blue-500" />
          <p className="mt-4 text-sm text-muted-foreground">
            Fetching your documents...
          </p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="border-none hover:bg-transparent">
              <TableHead>Name</TableHead>
              <TableHead>&nbsp;</TableHead>
              <TableHead className="hidden md:table-cell">Shared</TableHead>
              <TableHead className="hidden md:table-cell">Created at</TableHead>
            </TableRow>
          </TableHeader>
          {documents.length === 0 ? (
            <TableBody>
              <TableRow className="border-none hover:bg-transparent">
                <TableCell
                  colSpan={4}
                  className="h-24 text-center text-muted-foreground"
                >
                  No Documents Found
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <>
              <TableBody>
                {documents.map((document) => {
                  return <DocumentRow key={document._id} document={document} />;
                })}
              </TableBody>
            </>
          )}
        </Table>
      )}
      <div className="flex items-center justify-center">
        <Button
          variant={"ghost"}
          size={"sm"}
          onClick={() => loadMore(5)}
          disabled={status !== "CanLoadMore"}
        >
          {status === "CanLoadMore" ? "Load More" : "End of Results"}
        </Button>
      </div>
    </div>
  );
};
