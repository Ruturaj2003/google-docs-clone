import Image from "next/image";
import Link from "next/link";
import { SearchInput } from "./search-input";

export const Navbar = () => {
  return (
    <>
      <nav className="flex h-full w-full items-center justify-between">
        <div className="flex shrink-0 items-start gap-3 pr-6">
          <Link href={"/"}>
            <Image src={"/logo.svg"} alt="logo" width={33} height={33} />
          </Link>
          <h3 className="text-xl">C-Doc</h3>
        </div>
        <SearchInput />
        {/* Avatar */}
        <div />
      </nav>
    </>
  );
};
