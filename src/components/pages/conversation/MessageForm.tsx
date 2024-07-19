"use client";

import {
  handleFileUpload,
  handleSendMessage as SendMessage,
} from "@/lib/utils";
import { useMessageStore } from "@/states/useMessageStore";
import { ImFilesEmpty, ImUpload } from "react-icons/im";
import TextareaAutosize from "react-textarea-autosize";
import { useToast } from "@/components/ui/use-toast";
import { useUserStore } from "@/states/useUserStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { UserInfo } from "firebase/auth";
import { BiSend } from "react-icons/bi";
import { MessageType } from "@/types/MessageType";
import { SiGooglegemini } from "react-icons/si";
import { GiFlexibleLamp } from "react-icons/gi";
import { FaCode, FaLaptopCode } from "react-icons/fa";
import { CgBrowser } from "react-icons/cg";
import { IconType } from "react-icons/lib";
import { useNavigationStore } from "@/states/useNavigationStore";

export default function MessageForm({
  messages,
}: {
  messages: MessageType[];
}) {
  const { toast } = useToast();
  const {
    addMessages,
    addConversation,
    selectedConversation,
    setSelectedConversation,
  } = useMessageStore();
  const { user } = useUserStore()
  const { setIsLoading, isLoading } = useNavigationStore()
  const [previewFileName, setPreviewFileName] = useState<string>("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      userInput: "",
    },
  });

  const handleSendMessage = async (data: { userInput: string }) => {
    setIsLoading(true)
    const response = await SendMessage(
      data,
      user as UserInfo,
      selectedConversation,
      setPreviewFileName,
      addConversation,
      addMessages,
      setSelectedConversation,
      toast,
      reset
    );

    if (response === true) setIsLoading(false)

  };

  const suggestionMessages = [
    {
      value: 'Explain Typescript',
      icon: FaLaptopCode
    },
    {
      value: 'How to learn Node.js',
      icon: GiFlexibleLamp
    },
    {
      value: 'simple golang code',
      icon: CgBrowser
    },
    {
      value: 'Flask script rest api',
      icon: FaCode
    },
  ]
  return (
    <>
      {messages.length === 0 && isLoading !== true ?
        (<div className="absolute top-20 inset-0  p-5">
          <SiGooglegemini
            size={50}
            className="text-sky-500 mx-auto hover:animate-spin"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 mt-12 place-items-center p-4 gap-5 max-w-2xl mx-auto">
            {suggestionMessages.map((item: { value: string, icon: IconType }, index) => (
              <div onClick={() => handleSendMessage({ userInput: item.value })} className="border w-fit min-h-24 cursor-pointer p-3 shadow rounded-xl hover:scale-105 hover:bg-secondary transition-all duration-300" key={index}>
                <item.icon />
                <p className="text-sm pt-1.5">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
        )
        :
        null}

      <form
        onSubmit={handleSubmit(handleSendMessage)}
        className="absolute bg-background bottom-0 w-full right-0 pb-2 py-3 px-2.5 "
      >
        <div className="relative flex max-h-fit flex-col gap-3 p-3 px-6 border rounded-full shadow-xl border-slate-700/20 bg-background mx-2 dark:bg-secondary">
          <div className="flex flex-row gap-2 justify-center items-center relative ">
            {previewFileName && (
              <div
                className={`absolute ${previewFileName.length > 36 ? "-top-16" : "-top-12"
                  } -left-5 z-20`}
              >
                <Badge
                  variant="default"
                  className="rounded-full w-full py-1.5 max-w-xs text-xs flex justify-center gap-1.5 px-3"
                >
                  <ImFilesEmpty size={15} />
                  {previewFileName}
                </Badge>
              </div>
            )}
            {errors.userInput?.message && (
              <div
                className={`absolute -top-12 ${previewFileName ? '-right-5' : '-left-5'} z-20`}
              >
                <Badge
                  variant="destructive"
                  className="rounded-full w-full py-1.5 max-w-xs text-xs px-3"
                >
                  {errors.userInput.message}
                </Badge>
              </div>
            )}
            <label
              className="w-4/12 flex justify-center cursor-pointer pl-5"
              htmlFor="file"
            >
              <ImUpload size={24} />
            </label>
            <input
              tabIndex={3}
              id="file"
              type="file"
              className="hidden"
              accept="image/*,audio/*"
              onChange={() => handleFileUpload(setPreviewFileName)}
            />

            <TextareaAutosize
              {...register("userInput", {
                required: "Please enter a message",
              })}
              tabIndex={1}
              placeholder="Enter your message"
              className="flex-1 bg-transparent min-w-full outline-none pl-2 w-full break-words pr-11 resize-none scrollbar-none"
            />
            <div className="absolute -right-3 items-center justify-end ">
              <Button
                type="submit"
                variant="ghost"
                disabled={isSubmitting}
                size="icon"
                className="bg-transparent hover:bg-transparent"
                tabIndex={2}
              >
                <BiSend
                  size={24}
                  className="text-slate-700 dark:text-slate-100"
                />
              </Button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
