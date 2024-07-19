import MessageItem from "@/components/pages/conversation/MessageItem";
import SkeletonMessage from "@/components/ui/skeleton-message";
import { useNavigationStore } from "@/states/useNavigationStore";
import { MessageType } from "@/types/MessageType";

export default function MessageList({
  messages,
  messagesEndRef,
}: {
  messages: MessageType[];
  messagesEndRef: any;
}) {
  const { isLoading } = useNavigationStore()
  return (
    <div className="sm:pb-20 pb-8 flex pt-16 flex-col overflow-y-auto max-h-[90vh] min-h-[90vh] h-fit scrollbar-thin scrollbar-thumb-primary scrollbar-track-secondary">
      {messages.map((message, index) => (
        <MessageItem key={index} message={message} />
      ))}
      {isLoading && <SkeletonMessage />}
      <div ref={messagesEndRef} />
    </div >
  );
}
