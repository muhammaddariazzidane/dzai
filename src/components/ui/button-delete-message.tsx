"use client"

import { useMessageStore } from "@/states/useMessageStore"
import { useToast } from "@/components/ui/use-toast"
import { MessageType } from "@/types/MessageType"
import { handleDeleteChat } from "@/lib/utils"
import { IconType } from "react-icons/lib"

export default function ButtonDeleteMessage({ ContextMenuItem, BiTrash, message }: { ContextMenuItem: any, BiTrash: IconType, message: MessageType }) {
    const { selectedConversation } = useMessageStore()
    const { toast } = useToast()
    return (
        <ContextMenuItem
            className="cursor-pointer flex gap-1.5 text-red-500"
            onClick={() => handleDeleteChat(message, selectedConversation, toast)}>
            <BiTrash size={16} />
            Delete
        </ContextMenuItem>
    )
}