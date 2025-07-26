import Image from "next/image";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";

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

        <div className="flex items-center gap-3 pl-6">
          <OrganizationSwitcher
            // To cause Refresh and get new JWT token
            afterCreateOrganizationUrl={"/"}
            afterLeaveOrganizationUrl="/"
            afterSelectOrganizationUrl={"/"}
            afterSelectPersonalUrl={"/"}
          />
          <UserButton />
        </div>
        <div />
      </nav>
    </>
  );
};
