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
      <div className="min-h-screen bg-[#e8eced]">
        <div className="flex flex-col px-4 pt-2 bg-[#e8eced] gap-y-2 fixed top-0 left-0 right-0 z-10 print:hidden"></div>

        <Navbar />
        <Toolbar></Toolbar>
        <Editor></Editor>
        {documentId}
      </div>
    </>
  );
};

export default DocumentIdPage;
