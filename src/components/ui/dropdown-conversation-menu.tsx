import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigationStore } from "@/states/useNavigationStore";
import { useMessageStore } from "@/states/useMessageStore";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ConversationType } from "@/types/MessageType";
import { handleDeleteConversation } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { useUserStore } from "@/states/useUserStore";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function DropdownConversationMenu() {
  const {
    fetchConversations,
    conversations,
    selectedConversation,
    setSelectedConversation,
  } = useMessageStore();
  const { isSidebarOpen, setIsSidebarOpen } = useNavigationStore();
  const { user } = useUserStore();
  const { toast } = useToast();

  useEffect(() => {
    if (user?.uid) fetchConversations(user?.uid);
  }, [fetchConversations, user?.uid]);

  return (
    <>
      {
        conversations.length === 0 ?
          <h1 className="text-center text-foreground opacity-80 py-32">
            You have no conversation
          </h1> :
          conversations.map((conversation: ConversationType, index: number) => (
            <Button
              variant={"ghost"}
              className={`flex items-center justify-between gap-3 group rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${conversation?.id === selectedConversation?.id && "active"
                }`}
              key={index}
              onClick={() => {
                setSelectedConversation(conversation),
                  setIsSidebarOpen(!isSidebarOpen);
              }}
            >
              <p className="bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground to-gray-400">
                {conversation.title}...
              </p>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <DotsHorizontalIcon className="scale-0  group-hover:scale-100 transition-transform duration-300" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mr-16">
                  <DropdownMenuItem
                    className="cursor-pointer text-red-600"
                    onClick={() =>
                      handleDeleteConversation(
                        conversation.id as string,
                        setSelectedConversation,
                        conversations,
                        toast
                      )
                    }
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </Button>
          ))}
    </>
  );
}
