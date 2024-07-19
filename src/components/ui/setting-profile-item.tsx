import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import DialogAddLinkForm from "@/components/ui/dialog-add-link-form";
import { UserInfo } from "firebase/auth";
import { FormEvent } from "react";

interface SettingProfileItemProps {
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

export default function SettingProfileItem({
  filteredLinkByLinkedin,
  filteredLinkByGithub,
  handleAddLink,
  isDialogOpen,
  setInputLink,
  setIsDialogOpen,
  currentPlaceholder,
  setCurrentPlaceholder,
  user,
}: SettingProfileItemProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex border-b items-center gap-2 p-2 ">
        <div className="flex w-full flex-col gap-2">
          <h1 className="font-semibold">Links</h1>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between w-full">
              {filteredLinkByLinkedin && filteredLinkByLinkedin.length > 0 ? (
                filteredLinkByLinkedin.map((link: any, index: number) => (
                  <div className="flex gap-2 items-center " key={index}>
                    <FiLinkedin size={15} color="blue" />
                    <a
                      href={link.url}
                      target="_blank"
                      className="font-medium sm:text-sm text-xs hover:underline hover:text-sky-500 transition-all duration-300"
                    >
                      {link.url}
                    </a>
                  </div>
                ))
              ) : (
                <>
                  <div className="flex gap-2 items-center">
                    <FiLinkedin size={15} color="blue" />
                    <p className="font-medium">Linkedin</p>
                  </div>
                  <DialogAddLinkForm
                    handleAddLink={handleAddLink}
                    isDialogOpen={isDialogOpen}
                    setInputLink={setInputLink}
                    setIsDialogOpen={setIsDialogOpen}
                    currentPlaceholder={currentPlaceholder}
                    placeholder="https://www.linkedin.com/your-region/your-account-name"
                    setCurrentPlaceholder={setCurrentPlaceholder}
                  />
                </>
              )}
            </div>
            <div className="flex justify-between w-full">
              {filteredLinkByGithub && filteredLinkByGithub.length > 0 ? (
                filteredLinkByGithub.map((link: any, index: number) => (
                  <div className="flex gap-2 items-center" key={index}>
                    <FiGithub
                      size={15}
                      className="text-black dark:text-secondary-foreground"
                    />
                    <a
                      href={link.url}
                      target="_blank"
                      className="font-medium sm:text-sm text-xs hover:underline hover:text-sky-500 transition-all duration-300"
                    >
                      {link.url}
                    </a>
                  </div>
                ))
              ) : (
                <>
                  <div className="flex gap-2 items-center">
                    <FiGithub
                      size={15}
                      className="text-black dark:text-secondary-foreground"
                    />
                    <p className="font-medium">Github</p>
                  </div>
                  <DialogAddLinkForm
                    handleAddLink={handleAddLink}
                    isDialogOpen={isDialogOpen}
                    setInputLink={setInputLink}
                    setIsDialogOpen={setIsDialogOpen}
                    placeholder="https://github.com/your-username"
                    currentPlaceholder={currentPlaceholder}
                    setCurrentPlaceholder={setCurrentPlaceholder}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 p-2 justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="font-semibold">Email</h1>
          <div className="flex gap-2 items-center">
            <FiMail size={15} color="red" />
            <p className="font-medium">{user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
