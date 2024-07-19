import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent } from "react";

interface DialogAddLinkProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (data: boolean) => void;
  handleAddLink: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  setInputLink: (data: string) => void;
  placeholder: string;
  currentPlaceholder: string;
  setCurrentPlaceholder: (data: string) => void;
}

export default function DialogAddLinkForm({
  isDialogOpen,
  setIsDialogOpen,
  handleAddLink,
  setInputLink,
  placeholder,
  currentPlaceholder,
  setCurrentPlaceholder,
}: DialogAddLinkProps) {
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            setCurrentPlaceholder(placeholder as string);
            setIsDialogOpen(true);
          }}
          variant="outline"
        >
          Add New Link
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleAddLink}>
          <DialogHeader>
            <DialogTitle>Add your link</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-2">
              <Label htmlFor="URL" className="text-right">
                URL
              </Label>
              <Input
                id="URL"
                onChange={(event) => setInputLink(event.target.value)}
                className="col-span-3"
                placeholder={currentPlaceholder as string} // Gunakan placeholder yang diset sebelumnya
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
