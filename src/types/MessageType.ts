export type MessageType = {
    role: string;
    parts: PartsType[];
    isImage?: boolean;
    isVideo?: boolean;
    isAudio?: boolean;
    content?: string;
    fileName?: string;
    userId?: string;
    id?: string;
    createdAt?: any;
  };
  
  export type PartsType = {
    text: string;
    file?: string;
    fileType?: string | any;
  };
  
  export type ConversationType = {
    userId: string;
    title: string;
    startedAt: any;
    id?: string;
  };
  