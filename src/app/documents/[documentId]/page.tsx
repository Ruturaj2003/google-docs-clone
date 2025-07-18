import { Editor } from "./editor";
import { Toolbar } from "./toolbal";

interface DocumentIdPageProps {
  params: Promise<{ documentId: string }>;
}

const DocumentIdPage = async ({ params }: DocumentIdPageProps) => {
  const { documentId } = await params;
  return (
    <>
      <div className="min-h-screen bg-[#e8eced]">
        <Toolbar></Toolbar>
        <Editor></Editor>
        {documentId}
      </div>
    </>
  );
};

export default DocumentIdPage;
