"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { templates } from "./templates";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";

export const TemplatesGallery = () => {
  const router = useRouter();
  const create = useMutation(api.documents.createDocument);
  const [isCreating, setIsCreating] = useState(false);

  const onTemplateClick = (title: string, initialContent: string) => {
    setIsCreating(true);
    create({ title, initialContent })
      .then((documentId) => {
        router.push(`/documents/${documentId}`);
      })
      .finally(() => {
        setIsCreating(false);
      });
  };

  return (
    <>
      <div className="bg-[#f1f3f7]">
        <div className="maw-w--screen-xl mx-auto flex flex-col gap-y-4 px-16 py-6">
          <h3 className="font-medium">Start a new document</h3>
          <Carousel>
            <CarouselContent className="-ml-4">
              {templates.map((template) => {
                return (
                  <CarouselItem
                    key={template.id}
                    className="2xl:basis-[14.2%]pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
                  >
                    <div
                      className={cn(
                        "flex aspect-[3/4] flex-col gap-y-2.5",
                        isCreating && "pointer-events-none opacity-0",
                      )}
                    >
                      <button
                        disabled={isCreating}
                        onClick={() => {
                          onTemplateClick(
                            template.label,
                            template.initialContent,
                          );
                        }}
                        style={{
                          backgroundImage: `url(${template.imageUrl})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                        }}
                        className="flex size-full flex-col items-center justify-center gap-y-4 rounded-sm border bg-white transition hover:border-blue-500 hover:bg-blue-50"
                      ></button>
                      <p className="truncate text-sm font-medium">
                        {template.label}
                      </p>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </>
  );
};
