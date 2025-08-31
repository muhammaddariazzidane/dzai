import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import type { ConversationType, MessageType } from "@/types/MessageType";
import { type ClassValue, clsx } from "clsx";
import { db, storage } from "@/lib/firebase";
import { UserInfo } from "firebase/auth";
import { twMerge } from "tailwind-merge";
import { genAI } from "@/lib/model";
import { nanoid } from "nanoid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function fileToGenerativePart(
  file: File
): Promise<{ inlineData: { data: string; mimeType: string } }> {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(",")[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
}

export const getNextConversation = (
  conversationId: string,
  conversations: ConversationType[]
) => {
  const index = conversations.findIndex(
    (conversation) => conversation.id === conversationId
  );

  if (index === -1) return null;

  if (index > 0) return conversations[index - 1];
  else if (index < conversations.length - 1) return conversations[index + 1];

  return null;
};

export const handleChatResponse = async (
  conversationId: string,
  _userMessage: any,
  files: any,
  user: UserInfo,
  userInput: string,
  addMessages: (data: any) => void
) => {
  const maxRetries = 3;
  let attempt = 0;
  let result: any;
  while (attempt < maxRetries) {
    try {
      result = await genAI.models.generateContentStream({
        model: process.env.NEXT_PUBLIC_MODEL_TYPE as string,
        contents: [
          userInput,
          ...(await Promise.all(files.map(fileToGenerativePart)))
        ]
      })
      break;
    } catch (error: any) {
      if (error.response && error.response.status === 500) {
        attempt++;
        if (attempt < maxRetries) {
          console.warn(`Retrying... (${attempt}/${maxRetries})`);
          continue;
        } else {
          throw error;
        }
      } else {
        throw error;
      }
    }
  }

  let responseText = "";
  for await (const response of result) {
    responseText += response.text;
  }

  const modelMessage = {
    role: "model",
    parts: [{ text: responseText }],
    userId: user?.uid,
    createdAt: serverTimestamp(),
  };

  await addDoc(
    collection(db, "conversations", conversationId, "messages"),
    modelMessage
  );

  addMessages(modelMessage);
};

export const handleFileUpload = async (
  setPreviewFileName: (data: string) => void
) => {
  const inputElement = document.querySelector(
    "input[type=file]"
  ) as HTMLInputElement | null;
  const files = inputElement?.files ? Array.from(inputElement.files) : [];
  let downloadURL = null;
  let fileType = null;

  if (files?.[0]?.name) {
    const storageRef = ref(storage, `uploads/${nanoid()}-${files[0].name}`);
    const snapshot = await uploadBytes(storageRef, files[0]);
    downloadURL = await getDownloadURL(snapshot.ref);
    fileType = files[0].type;
    setPreviewFileName(files?.[0]?.name);
  }

  return { files, downloadURL, fileType };
};

export const resetForm = (setPreviewFileName: (data: string) => void) => {
  const inputFileElement = document.querySelector(
    "input[type=file]"
  ) as HTMLInputElement | null;
  if (inputFileElement) inputFileElement.value = "";
  setPreviewFileName("");
};

export const createUserMessage = (
  text: string,
  file: string | null,
  fileType: string | null,
  user: UserInfo
) => ({
  role: "user",
  parts: [
    {
      text,
      file,
      fileType,
    },
  ],
  userId: user?.uid,
  createdAt: serverTimestamp(),
});

const newConversation = async (user: UserInfo) => {
  const conversation = await addDoc(collection(db, "conversations"), {
    userId: user?.uid,
    title: "New Conversation",
    startedAt: serverTimestamp(),
  });
  return conversation;
};

export const handleNewConversation = async (
  addConversation: (data: any) => any,
  setSelectedConversation: (data: any) => void,
  user: UserInfo
) => {
  addConversation({
    userId: user?.uid,
    title: "New Conversation",
    startedAt: serverTimestamp(),
  });

  const conversation = await newConversation(user);

  setSelectedConversation(conversation);
};

export const handleExistingConversation = async (
  userMessage: any,
  _files: File[],
  selectedConversation: ConversationType,
  userInput: string,
  addMessages: (data: MessageType) => void
) => {
  const conversationDetail = await getDoc(
    doc(db, "conversations", selectedConversation?.id as string)
  );

  if (conversationDetail.data()?.title === "New Conversation") {
    await updateDoc(
      doc(db, "conversations", selectedConversation?.id as string),
      {
        title: userInput.substring(0, 25),
      }
    );
  }

  await addDoc(
    collection(
      db,
      "conversations",
      selectedConversation?.id as string,
      "messages"
    ),
    userMessage
  );

  addMessages(userMessage as MessageType);
};

const handleNewConversationWithMessage = async (
  userMessage: any,
  _files: File[],
  addConversation: (data: ConversationType) => void,
  user: UserInfo,
  userInput: string,
  setSelectedConversation: (data: any) => void,
  addMessages: (data: MessageType) => void
) => {
  addConversation({
    userId: user?.uid,
    title: userInput.substring(0, 25),
    startedAt: serverTimestamp(),
  });

  const { id } = await newConversation(user);

  const conversationDetail = await getDoc(doc(db, "conversations", id));

  setSelectedConversation(conversationDetail);

  if (conversationDetail.data()?.title === "New Conversation") {
    await updateDoc(doc(db, "conversations", id), {
      title: userInput.substring(0, 25),
    });
  }
  addMessages(userMessage);

  await addDoc(collection(db, "conversations", id, "messages"), userMessage);
  return id;
};

export const showToastPopUp = (
  toast: any,
  message: string,
  background: string,
  color: string
) => {
  toast({
    description: message,
    style: {
      position: "fixed",
      zIndex: "999",
      top: "1%",
      left: "35%",
      right: "50%",
      minWidth: "22rem",
      width: "100%",
      maxWidth: "fit-content",
      background,
      color,
    },
  });
};

export const copyToClipBoard = (part: { text: string }, toast: any) => {
  navigator.clipboard
    .writeText(part.text)
    .then(() => {
      showToastPopUp(
        toast,
        "Copied to clipboard",
        "hsl(var(--secondary))",
        "hsl(var(--secondary-foreground))"
      );
    })
    .catch((error: any) => {
      console.error("Failed to copy text: ", error.message);
      showToastPopUp(toast, "Failed to copy text", "darkred", "white");
    });
};

export const handleDeleteChat = async (
  message: MessageType,
  selectedConversation: any,
  toast: any
) => {
  try {
    if (message.parts?.[0].file)
      deleteObject(ref(storage, message.parts?.[0].file));
    await deleteDoc(
      doc(
        db,
        "conversations",
        selectedConversation?.id,
        "messages",
        message.id as string
      )
    );
    showToastPopUp(toast, "Chat deleted", "green", "white");
  } catch (error: any) {
    console.error("error delete chat", error.message);
    showToastPopUp(toast, "Failed to delete chat", "darkred", "white");
  }
};

export const handleSendMessage = async (
  data: { userInput: string },
  user: UserInfo,
  selectedConversation: any,
  setPreviewFileName: (data: any) => any,
  addConversation: (data: any) => any,
  addMessages: (data: any) => any,
  setSelectedConversation: (data: any) => any,
  toast: any,
  reset: any
) => {
  try {
    const { files, downloadURL, fileType } = await handleFileUpload(
      setPreviewFileName
    );

    const userMessage = createUserMessage(
      data.userInput,
      downloadURL,
      fileType,
      user as UserInfo
    );

    if (selectedConversation === null) {
      const newConversationId = await handleNewConversationWithMessage(
        userMessage,
        files,
        addConversation,
        user as UserInfo,
        data.userInput,
        setSelectedConversation,
        addMessages
      );
      await handleChatResponse(
        newConversationId,
        userMessage,
        files,
        user as UserInfo,
        data.userInput,
        addMessages
      );
    } else {
      await handleExistingConversation(
        userMessage,
        files,
        selectedConversation,
        data.userInput,
        addMessages
      );
      await handleChatResponse(
        selectedConversation.id,
        userMessage,
        files,
        user as UserInfo,
        data.userInput,
        addMessages
      );
    }
    reset({
      userInput: "",
    });
    resetForm(setPreviewFileName);
    return true;
  } catch (error: any) {
    console.error("Error:", error.message);
    showToastPopUp(toast, "Internal server Error", "darkred", "white");
  }
};

const deleteFilesInParts = async (parts: any) => {
  for (const part of parts) {
    if (part.file) {
      const fileRef = ref(storage, part.file);
      try {
        await deleteObject(fileRef);
      } catch (error: any) {
        console.error("Error deleting file", error.message);
      }
    }
  }
};

const deleteMessages = async (conversationId: string) => {
  const messagesSnapshot = await getDocs(
    collection(db, "conversations", conversationId, "messages")
  );

  const deleteMessagePromises = messagesSnapshot.docs.map(
    async (messageDoc) => {
      const messageData = messageDoc.data();
      if (messageData.parts) {
        await deleteFilesInParts(messageData.parts);
      }
      await deleteDoc(messageDoc.ref);
    }
  );

  await Promise.all(deleteMessagePromises);
};

export const handleDeleteConversation = async (
  conversationId: string,
  setSelectedConversation: (data: any) => void,
  conversations: ConversationType[],
  toast: any
) => {
  try {
    const nextConversation = getNextConversation(conversationId, conversations);

    await deleteMessages(conversationId);

    await deleteDoc(doc(db, "conversations", conversationId));
    setSelectedConversation(nextConversation);

    showToastPopUp(toast, "Conversation deleted", "green", "white");
  } catch (error: any) {
    console.error("Error deleting conversation", error.message);
    showToastPopUp(toast, "Failed to delete conversation", "darkred", "white");
  }
};
