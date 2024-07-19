import { GiBigGear } from "react-icons/gi";
import { BiUser } from "react-icons/bi";
import { DarkModeButton } from "@/components/ui/dark-mode-button";
import { FormEvent } from "react";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserInfo } from "firebase/auth";
import SettingProfileItem from "@/components/ui/setting-profile-item";

interface SettingMenuProps {
  settingActive: string;
  setSettingActive: (active: string) => void;
  filteredLinkByLinkedin: any[];
  filteredLinkByGithub: any[];
  handleAddLink: (event: FormEvent<HTMLFormElement>) => any;
  isDialogOpen: boolean;
  setInputLink: (link: string) => void;
  setIsDialogOpen: (isOpen: boolean) => void;
  currentPlaceholder: string;
  setCurrentPlaceholder: (placeholder: string) => void;
  user: UserInfo;
}

export default function SettingMenu({
  settingActive,
  setSettingActive,
  filteredLinkByLinkedin,
  filteredLinkByGithub,
  handleAddLink,
  isDialogOpen,
  setInputLink,
  setIsDialogOpen,
  currentPlaceholder,
  setCurrentPlaceholder,
  user,
}: SettingMenuProps) {
  return (
    <DialogContent className="sm:max-w-2xl">
      <DialogHeader className="py-3 ">
        <DialogTitle>Settings</DialogTitle>
      </DialogHeader>
      <hr />
      <DialogDescription className="grid grid-cols-3 gap-4 text-foreground">
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setSettingActive("general")}
            className={`flex items-center gap-2 p-2  rounded-md ${
              settingActive === "general" && "active"
            }`}
          >
            <GiBigGear size={18} />
            General
          </button>
          <button
            onClick={() => setSettingActive("profile")}
            className={`flex items-center gap-2 p-2 rounded-md ${
              settingActive === "profile" && "active"
            }`}
          >
            <BiUser size={18} />
            Profile
          </button>
        </div>
        <div className="col-span-2">
          {settingActive === "general" && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 p-2 justify-between">
                <h1 className="font-semibold">Theme</h1>
                <DarkModeButton />
              </div>
            </div>
          )}
          {settingActive === "profile" && (
            <SettingProfileItem
              currentPlaceholder={currentPlaceholder}
              setCurrentPlaceholder={setCurrentPlaceholder}
              filteredLinkByGithub={filteredLinkByGithub}
              filteredLinkByLinkedin={filteredLinkByLinkedin}
              isDialogOpen={isDialogOpen}
              handleAddLink={handleAddLink}
              setInputLink={setInputLink}
              setIsDialogOpen={setIsDialogOpen}
              user={user as UserInfo}
            />
          )}
        </div>
      </DialogDescription>
      <DialogFooter className="sm:justify-start">
        <DialogClose asChild></DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
