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
        <div className="fixed left-0 right-0 top-0 z-10 flex flex-col gap-y-2 bg-[#e8eced] px-4 pt-2 print:hidden"></div>

        <Navbar />
        <Toolbar></Toolbar>
        <Editor></Editor>
        {documentId}
      </div>
    </>
  );
};

export default DocumentIdPage;
