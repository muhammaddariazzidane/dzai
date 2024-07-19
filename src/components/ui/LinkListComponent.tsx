import { FiGithub, FiLinkedin } from "react-icons/fi";
import DialogAddLinkForm from "@/components/ui/dialog-add-link-form";
import { FormEvent } from "react";

interface LinkListProps {
  filteredLinkByLinkedin: any[];
  filteredLinkByGithub: any[];
  handleAddLink: (event: FormEvent<HTMLFormElement>) => any;
  isDialogOpen: boolean;
  setInputLink: (link: string) => void;
  setIsDialogOpen: (isOpen: boolean) => void;
  currentPlaceholder: string;
  setCurrentPlaceholder: (placeholder: string) => void;
}

export default function LinkListComponent({
  filteredLinkByLinkedin,
  filteredLinkByGithub,
  handleAddLink,
  isDialogOpen,
  setInputLink,
  setIsDialogOpen,
  currentPlaceholder,
  setCurrentPlaceholder,
}: LinkListProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between w-full">
        {filteredLinkByLinkedin && filteredLinkByLinkedin.length > 0 ? (
          filteredLinkByLinkedin.map((link, index) => (
            <div className="flex gap-2 items-center" key={index}>
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
          filteredLinkByGithub.map((link, index) => (
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
              currentPlaceholder={currentPlaceholder}
              placeholder="https://github.com/your-username"
              setCurrentPlaceholder={setCurrentPlaceholder}
            />
          </>
        )}
      </div>
    </div>
  );
}
