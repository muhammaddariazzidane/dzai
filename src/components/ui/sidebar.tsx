import DropdownConversationMenu from "@/components/ui/dropdown-conversation-menu";
import ButtonAddConversation from "@/components/ui/button-add-conversation";

export default function Sidebar() {
  return (
    <aside className="hidden border-r bg-background sm:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 ">
          <h1 className="text-lg font-semibold">Conversations</h1>
          <ButtonAddConversation className="ml-auto" />
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-secondary">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-y-1">
            <p className="text-sm text-muted-foreground my-2 px-1.5">
              Your conversations with your AI assistant
            </p>
            <DropdownConversationMenu />
          </nav>
        </div>
      </div>
    </aside>
  );
}
