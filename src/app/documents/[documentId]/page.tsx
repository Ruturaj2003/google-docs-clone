import { Room } from "@/app/Room";
import { Editor } from "./editor";
import { Navbar } from "./navbar";
import { Toolbar } from "./toolbal";

interface DocumentIdPageProps {
  params: Promise<{ documentId: string }>;
}

const DocumentIdPage = async ({ params }: DocumentIdPageProps) => {
  const { documentId } = await params;
  return (
    <>
      {" "}
      <Room>
        <div className="min-h-screen bg-[#e8eced]">
          <div className="fixed left-0 right-0 top-0 z-10 flex flex-col gap-y-2 bg-[#e8eced] px-4 pt-2 print:hidden">
            <Navbar />
            <Toolbar></Toolbar>
          </div>
          <div className="pt-[114px] print:pt-0">
            <Editor></Editor>
          </div>
          {/* Tmp */}
          <h1 className="hidden">{documentId}</h1>
        </div>
      </Room>
    </>
  );
};

export default DocumentIdPage;
