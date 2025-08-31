"use client"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import DropdownConversationMenu from "@/components/ui/dropdown-conversation-menu";
import ButtonAddConversation from "@/components/ui/button-add-conversation";
import { useNavigationStore } from "@/states/useNavigationStore";
import { Button } from "@/components/ui/button";
import { TbLogout2 } from "react-icons/tb";
import { HiBars2 } from "react-icons/hi2";

export default function SidebarMobile() {
  const { isSidebarOpen, setIsSidebarOpen } = useNavigationStore();

  return (
    <Sheet
      open={isSidebarOpen}
      onOpenChange={setIsSidebarOpen}
    >
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="shrink-0 sm:hidden">
          <HiBars2 size={25} />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col w-full sm:hidden ">
        <SheetHeader>
          <div className="flex gap-x-2.5 items-center -mt-4">
            <SheetTitle className="font-semibold text-lg">
              Conversations
            </SheetTitle>
            <ButtonAddConversation />
          </div>
          <SheetDescription className="text-start">
            Your conversations with your AI assistant
          </SheetDescription>
        </SheetHeader>
        <nav className="grid gap-2 text-lg font-medium max-h-full overflow-y-auto">
          <DropdownConversationMenu />
        </nav>
        <div className="mt-auto hidden sm:block">
          <Button
            variant={"destructive"}
            className="w-fit flex items-center gap-x-2"
          >
            <TbLogout2 size={18} />
            Sign out
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
