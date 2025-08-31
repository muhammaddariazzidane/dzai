"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigationStore } from "@/states/useNavigationStore";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useMessageStore } from "@/states/useMessageStore";
import SidebarMobile from "@/components/ui/sidebar-mobile";
import { FormEvent, useEffect, useState } from "react";
import SettingMenu from "@/components/ui/setting-menu";
import { useToast } from "@/components/ui/use-toast";
import { useUserStore } from "@/states/useUserStore";
import { SiGooglegemini } from "react-icons/si";
import { showToastPopUp } from "@/lib/utils";
import { GiBigGear } from "react-icons/gi";
import { FiLogOut } from "react-icons/fi";
import { UserInfo } from "firebase/auth";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [currentPlaceholder, setCurrentPlaceholder] = useState<string>("");
  const { settingActive, setSettingActive } = useNavigationStore();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [inputLink, setInputLink] = useState<string>("");
  const { links, fetchLinks } = useMessageStore();
  const { logout, user } = useUserStore();
  const { toast } = useToast();
  const { push } = useRouter();

  const handleAddLink = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      let provider: string;
      if (
        !inputLink.startsWith("https://github.com/") &&
        !inputLink.startsWith("https://linkedin.com/") &&
        !inputLink.startsWith("https://www.linkedin.com/")
      ) {
        showToastPopUp(
          toast,
          "Please input a valid GitHub or LinkedIn URL",
          "darkred",
          "white"
        );
      } else {
        if (inputLink.includes("github")) {
          provider = "github";
        } else if (inputLink.includes("linkedin")) {
          provider = "linkedin";
        } else {
          return;
        }
        await addDoc(collection(db, "links"), {
          userId: user?.uid,
          url: inputLink,
          provider,
          createdAt: serverTimestamp(),
        });
      }
      showToastPopUp(toast, "success create link", "green", "white");
    } catch (error: any) {
      showToastPopUp(toast, "Error create link", "darkred", "white");
      console.error("Error create link", error.message);
    } finally {
      setInputLink("");
      setIsDialogOpen(false);
    }
  };

  useEffect(() => {
    fetchLinks(user?.uid as string);
  }, [fetchLinks, user?.uid]);

  const filteredLinkByLinkedin = links?.filter(
    (link: any) => link.provider === "linkedin"
  );
  const filteredLinkByGithub = links?.filter(
    (link: any) => link.provider === "github"
  );

  return (
    <Dialog>
      <div
        className={`absolute z-50 top-0 left-0 right-0 w-full
           dark:bg-background bg-white max-w-full mx-auto py-2.5`}
      >
        <div className="flex justify-between items-center gap-3 px-4">
          <div className="sm:hidden flex ">
            <SidebarMobile />
          </div>

          <div className="flex gap-x-2 sm:flex-row flex-row-reverse items-center">
            <SiGooglegemini
              size={30}
              className="text-sky-500 hover:animate-spin"
            />
            <h1 className="text-sm sm:text-base capitalize font-bold">DZ-AI</h1>
          </div>
          <div className="flex gap-2 items-center">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="flex gap-x-2 items-center">
                  <h1 className="text-sm sm:text-base capitalize sm:block hidden">
                    {user?.displayName}
                  </h1>
                  <Avatar className="w-8 h-8 sm:w-9 sm:h-9 cursor-pointer">
                    <AvatarImage
                      src={String(user?.photoURL)}
                      alt={String(user?.photoURL)}
                    />
                    <AvatarFallback>
                      {user?.displayName?.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DialogTrigger className="w-full ">
                  <DropdownMenuItem className="cursor-pointer flex items-center gap-1.5 font-semibold ">
                    <GiBigGear />
                    Settings
                  </DropdownMenuItem>
                </DialogTrigger>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer flex items-center gap-1.5 font-semibold text-red-500 "
                  onClick={() => {
                    logout();
                    push("/auth");
                  }}
                >
                  <FiLogOut size={15} />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <SettingMenu
        currentPlaceholder={currentPlaceholder}
        setCurrentPlaceholder={setCurrentPlaceholder}
        filteredLinkByGithub={filteredLinkByGithub}
        filteredLinkByLinkedin={filteredLinkByLinkedin}
        isDialogOpen={isDialogOpen}
        handleAddLink={handleAddLink}
        setInputLink={setInputLink}
        setIsDialogOpen={setIsDialogOpen}
        setSettingActive={setSettingActive}
        settingActive={settingActive}
        user={user as UserInfo}
      />
    </Dialog>
  );
}
