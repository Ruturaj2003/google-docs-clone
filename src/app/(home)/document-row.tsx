import { TableCell, TableRow } from "@/components/ui/table";
import { Doc } from "../../../convex/_generated/dataModel";
import { SiGoogledocs } from "react-icons/si";
import { Building2Icon, CircleUserIcon, MoreVertical } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
interface DocumentRowProps {
  document: Doc<"documents">;
}
export const DocumentRow = ({ document }: DocumentRowProps) => {
  return (
    <TableRow className="cursor-pointer">
      <TableCell className="w-[50px]">
        <SiGoogledocs className="size-6 fill-blue-500" />
      </TableCell>
      <TableCell className="font-medium md:w-[45%]">{document.title}</TableCell>
      <TableCell className="hidden items-center gap-2 text-muted-foreground md:flex">
        {document.organizationId ? (
          <>
            <Building2Icon size={20} />
            Organization
          </>
        ) : (
          <>
            <CircleUserIcon size={20} />
            Personal
          </>
        )}
      </TableCell>
      <TableCell className="hidden text-muted-foreground md:table-cell">
        {format(new Date(document._creationTime), "MMM dd ,yyyy")}
      </TableCell>
      <TableCell className="ml-auto flex justify-end">
        <Button className="rounded-full" variant={"ghost"} size={"icon"}>
          <MoreVertical className="size-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
};
