interface DocumentIdPageProps{
    params:Promise<{documentId:string}>
}


const DocumentIdPage = async ({params}:DocumentIdPageProps) => {
const {documentId}  = await params
    return ( 

        <>
        <h1>Doc Id   {documentId}</h1>
        </>
     );
}
 
export default DocumentIdPage;