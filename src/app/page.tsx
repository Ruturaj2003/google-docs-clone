import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
        <h1 className="flex bg-blue-500">Hello World</h1>
        <div>Click this link to go to doc Id 
<br />
          <Link className="text-2xl text-violet-600" href={'/documents/123'}>Link</Link>
        </div>
    <Button variant={'destructive'}>CLick me</Button>
    </>


  );
}
