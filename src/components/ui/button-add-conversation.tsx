"use client"

import { useNavigationStore } from '@/states/useNavigationStore';
import { useMessageStore } from '@/states/useMessageStore';
import { useUserStore } from '@/states/useUserStore';
import { handleNewConversation } from '@/lib/utils';
import { TbMessage2Plus } from 'react-icons/tb';
import { Button } from '@/components/ui/button';
import { UserInfo } from "firebase/auth";

export default function ButtonAddConversation({ className }: { className?: string }) {
  const { setSelectedConversation, addConversation } = useMessageStore();
  const { isSidebarOpen, setIsSidebarOpen, isLoading } = useNavigationStore();
  const { user } = useUserStore();

  return (
    <Button
      size={"icon"}
      variant={"link"}
      className={`cursor-pointer ${className ?? className}`}
      onClick={() => {
        if (isLoading) return
        handleNewConversation(
          addConversation,
          setSelectedConversation,
          user as UserInfo
        ),
          setIsSidebarOpen(!isSidebarOpen)
      }}
    >
      <TbMessage2Plus size={20} />
    </Button>
  )
}
