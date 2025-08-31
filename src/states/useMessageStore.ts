import { create } from "zustand";
import { ConversationType, MessageType } from "@/types/MessageType";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

interface MessageStore {
  messages: MessageType[];
  links: any[];
  selectedConversation: ConversationType | any;
  conversations: ConversationType[];
  setMessages: (messages: MessageType[]) => void;
  addMessages: (newMessages: MessageType) => void;
  addConversation: (newConversation: ConversationType) => void;
  fetchMessages: (userId: string, conversationId: string) => void;
  fetchConversations: (userId: string) => void;
  fetchLinks: (userId: string) => void;
  setSelectedConversation: (conversation: any) => void;
  removeSelectedConversation: () => void;
}

export const useMessageStore = create<MessageStore>((set) => ({
  messages: [],
  links: [],
  selectedConversation: null,
  conversations: [],
  addMessages: (newMessages: MessageType) => {
    set((state) => ({ messages: [...state.messages, newMessages] }));
  },
  addConversation: async (newConversation: ConversationType) => {
    set((state) => ({
      conversations: [...state.conversations, newConversation],
    }));
  },
  setMessages: (messages: MessageType[]) => {
    set({ messages: messages });
  },
  fetchMessages: async (userId: string, conversationId: string) => {
    onSnapshot(
      query(
        collection(db, "conversations", conversationId, "messages"),
        where("userId", "==", userId),
        orderBy("createdAt", "asc")
      ),
      (snapshot) => {
        const fetchedMessages: MessageType[] = snapshot.docs.map((doc) => {
          return {
            ...(doc.data() as MessageType),
            id: doc.id,
          };
        });
        set({ messages: fetchedMessages });
      }
    );
  },
  fetchLinks: async (userId: string) => {
    onSnapshot(
      query(collection(db, "links"), where("userId", "==", userId)),
      (snapshot) => {
        const fetchedLinks: any[] = snapshot.docs.map((doc) => {
          return {
            ...(doc.data() as any),
            id: doc.id,
          };
        });
        set({ links: fetchedLinks });
      }
    );
  },
  fetchConversations: async (userId: string) => {
    onSnapshot(
      query(
        collection(db, "conversations"),
        where("userId", "==", userId),
        orderBy("startedAt", "desc")
      ),
      (snapshot) => {
        const fetchedConversations: ConversationType[] = snapshot.docs.map(
          (doc) => {
            return {
              ...(doc.data() as ConversationType),
              id: doc.id,
            };
          }
        );
        set({ conversations: fetchedConversations });
      }
    );
  },
  setSelectedConversation: (selectedConversation: any) => {
    set({ selectedConversation });
  },
  removeSelectedConversation: () => {
    set({ selectedConversation: null });
  },
}));
