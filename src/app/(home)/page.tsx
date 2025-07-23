import Link from "next/link";
import { Navbar } from "./navbar";

export default function Home() {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <div className="fixed left-0 right-0 top-0 z-10 h-16 bg-white p-4">
          <Navbar />
        </div>
        <div className="mt-16">
          <Link
            href="/documents/123"
            className="text-xl text-violet-600 hover:underline"
          >
            View Document
          </Link>
        </div>
      </div>
    </>
  );
}
