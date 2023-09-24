"use client";
import ImageContent from "./image.jpg";
import React from "react";
import Image from "next/image";
import { PageContent } from "./page-content";
import { TldrawEditorComponent } from "./tldraw";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Editor = () => {
  const [showUi, setShowUi] = React.useState(false);
  return (
    <div className="bg-transparent w-full h-full">
      <Button
        onClick={() => {
          setShowUi((prev) => !prev);
        }}
      >
        Edit background
      </Button>
      <div className="bg-transparent z-0 overflow-hidden relative page">
        <div className="absolute w-full h-full z-20" id="images">
          {/* <Image
          src={ImageContent.src}
          width={ImageContent.width}
          height={ImageContent.height}
          alt="asdf"
        /> */}
          <TldrawEditorComponent showUi={showUi} />
        </div>
        <div
          className={cn("h-full w-full ", {
            "pointer-events-none opacity-25": showUi,
          })}
        >
          <PageContent />
        </div>
      </div>
    </div>
  );
};
