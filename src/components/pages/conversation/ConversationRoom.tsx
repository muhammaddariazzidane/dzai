"use client";

import MessageForm from "@/components/pages/conversation/MessageForm";
import MessageList from "@/components/pages/conversation/MessageList";
import { useMessageStore } from "@/states/useMessageStore";
import { useUserStore } from "@/states/useUserStore";
import { onAuthStateChanged } from "firebase/auth";
import Sidebar from "@/components/ui/sidebar";
import Navbar from "@/components/ui/navbar";
import { useEffect, useRef } from "react";
import { auth } from "@/lib/firebase";

export default function ConversationRoom() {
  const { messages, fetchMessages, selectedConversation } = useMessageStore();
  const { user, setAuthUser } = useUserStore();
  const messagesEndRef = useRef<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setAuthUser(user);
      else setAuthUser(null);
    });
    return () => unsubscribe();
  }, [setAuthUser]);


  useEffect(() => {
    if (user?.uid && selectedConversation?.id) fetchMessages(user?.uid, selectedConversation?.id);

  }, [user?.uid, selectedConversation?.id, fetchMessages]);

  const scrollToBottom = () => messagesEndRef.current.scrollIntoView({ behavior: "smooth" });

  useEffect(scrollToBottom, [messages]);
  return (
    <main className="grid min-h-screen w-full grid-cols-4 ">
      <Sidebar />
      <div className="p-2 sm:p-5 col-span-12 sm:col-span-3 h-fit min-h-full sm:mt-0 max-h-screen  relative">
        <Navbar />
        <MessageList messages={messages} messagesEndRef={messagesEndRef} />
        <MessageForm messages={messages} />
      </div>
    </main>
  );
}
