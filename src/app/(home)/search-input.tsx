"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchParam } from "@/hooks/useSearchParam";
import { SearchIcon, XIcon } from "lucide-react";
import { useRef, useState } from "react";

export const SearchInput = () => {
  const [, setSearch] = useSearchParam();
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClear = () => {
    setValue("");
    setSearch("");
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch(value);
    inputRef.current?.blur();
  };
  return (
    <>
      <div className="flex flex-1 items-center justify-center">
        <form onSubmit={handleSubmit} className="relative w-full max-w-[720px]">
          <Input
            value={value}
            onChange={handleChange}
            ref={inputRef}
            placeholder="Search"
            className="h-[48px] w-full rounded-full border-none bg-[#f0f4f8] px-14 placeholder:text-neutral-800 focus-visible:bg-white focus-visible:shadow-[0_1px_1px_0_rgba(65,69,73,0.3),0_1px_3px_1px_rgba(65,69,73,0.15)] focus-visible:ring-0 md:text-base"
          />
          <Button
            type="submit"
            variant={"ghost"}
            size={"icon"}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full [&_svg]:size-5"
          >
            <SearchIcon></SearchIcon>
          </Button>

          {value && (
            <>
              <Button
                onClick={handleClear}
                type="button"
                variant={"ghost"}
                size={"icon"}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full [&_svg]:size-5"
              >
                <XIcon />
              </Button>
            </>
          )}
        </form>
      </div>
    </>
  );
};
