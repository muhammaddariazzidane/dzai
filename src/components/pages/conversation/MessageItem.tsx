import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import HighlightedCodeBlock from "@/components/ui/highlighted-code-block";
import ButtonDeleteMessage from "@/components/ui/button-delete-message";
import { ImFilePdf, ImFileWord } from "react-icons/im";
import { MessageType } from "@/types/MessageType";
import { SiGooglegemini } from "react-icons/si";
import { Badge } from "@/components/ui/badge";
import { BiTrash } from "react-icons/bi";
import React, { Fragment } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function MessageItem({
  message,
}: {
  message: MessageType;
}) {
  return (
    <div
      className={cn(
        "flex w-max max-w-full sm:max-w-[75%] flex-col gap-2 mb-5 rounded-lg px-3 py-2 text-sm",
        message.role === "user"
          ? "ml-auto bg-primary text-primary-foreground dark:bg-secondary-foreground"
          : "bg-muted"
      )}
    >
      <ContextMenu>
        <ContextMenuTrigger>
          {message?.parts.map((part: any, index: number) => (
            <Fragment key={index}>
              {message.role === "model" && (
                <div className="flex justify-between items-start">
                  <SiGooglegemini size={20} className="text-sky-500" />
                </div>
              )}
              {part.file && (
                <div className="mb-2">
                  {part.fileType.startsWith("image/") && (
                    <Dialog>
                      <DialogTitle />
                      <DialogTrigger asChild>
                        <Image
                          width={200}
                          height={200}
                          src={part.file as string}
                          alt={part.file}
                          className="w-full max-w-xs h-auto cursor-pointer rounded-md"
                          quality={100}
                          loading="lazy"

                        />
                      </DialogTrigger>
                      <DialogContent className="bg-transparent shadow-none border-none">
                        <DialogDescription />
                        <Image
                          width={200}
                          height={200}
                          src={part.file as string}
                          alt={part.file}
                          className="w-full max-w-full h-full max-h-[90vh] object-contain cursor-pointer rounded-md"
                          quality={100}
                          loading="lazy"

                        />
                      </DialogContent>
                    </Dialog>
                  )}
                  {part.fileType.startsWith("video/") && (
                    <video src={part.file} controls className="w-full max-h-52 h-fit">
                    </video>
                  )}
                  {part.fileType.startsWith("application/pdf") && (
                    <Badge
                      variant="destructive"
                      className="rounded-full w-full py-1.5 max-w-xs text-xs flex flex-wrap justify-center gap-1.5 px-3"
                    >
                      <ImFilePdf size={20} />
                      {part.file.substring(0, 38)}
                    </Badge>
                  )}
                  {part.fileType.startsWith(
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  ) && (
                      <Badge
                        variant={"outline"}
                        className="rounded-full bg-blue-800 hover:bg-blue-900 py-1.5 w-full max-w-xs text-xs flex flex-wrap justify-center gap-1.5 px-3"
                      >
                        <ImFileWord size={20} />
                        {part.file.substring(0, 38)}
                      </Badge>
                    )}
                </div>
              )}
              <HighlightedCodeBlock part={part} role={message.role} />
            </Fragment>
          ))}
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ButtonDeleteMessage message={message} BiTrash={BiTrash} ContextMenuItem={ContextMenuItem} />
        </ContextMenuContent>
      </ContextMenu>
    </div>


  );
}
