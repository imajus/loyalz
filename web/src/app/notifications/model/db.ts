/*
  DB.ts

  This file defines the local database schema for our app. Any time we show any
  data in the UI, it should come from the database.
*/

import Dexie from 'dexie';

export interface Conversation {
  id?: number;
  topic: string;
  title: string | undefined;
  createdAt: Date;
  updatedAt: Date;
  peerAddress: string;
}

export interface Message {
  id?: number;
  inReplyToID: string;
  conversationTopic: string;
  xmtpID: string;
  senderAddress: string;
  sentByMe: boolean;
  sentAt: Date;
  contentType: {
    authorityId: string;
    typeId: string;
    versionMajor: number;
    versionMinor: number;
  };
  content: any;
  metadata?: { [key: string]: [value: string] };
  isSending: boolean;
}


export interface ReadReceipt {
  peerAddress: string;
  timestamp: string;
}

class DB extends Dexie {
  conversations!: Dexie.Table<Conversation, number>;
  messages!: Dexie.Table<Message, number>;
  readReceipts!: Dexie.Table<ReadReceipt, string>;

  constructor() {
    super('DB');
    this.version(2).stores({
      conversations: `
        ++id,
        topic,
        title,
        createdAt,
        updatedAt,
        peerAddress
        `,
      messages: `
        ++id,
        [conversationTopic+inReplyToID],
        inReplyToID,
        conversationTopic,
        xmtpID,
        senderAddress,
        sentByMe,
        sentAt,
        contentType,
        content
        `,
      readReceipts: `
       ++peerAddress,
       timestamp
    `,
    });
  }
}

const db = new DB();
export default db;
