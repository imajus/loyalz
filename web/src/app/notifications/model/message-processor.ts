import { ContentTypeReadReceipt } from '@xmtp/content-type-read-receipt';
import { ContentTypeId } from '@xmtp/xmtp-js';
import db, { Conversation, Message } from './db';

export async function process(
  conversation: Conversation,
  { contentType, message }: { contentType: ContentTypeId; message: Message },
) {
  if (ContentTypeReadReceipt.sameAs(contentType)) {
    // Get items from the read receipts table based on peerAddress within conversation
    await db.readReceipts
      .get({ peerAddress: conversation.peerAddress })
      .then(async (existingEntry) => {
        // If the entry doesn't exist, add it with content timestamp
        if (!existingEntry) {
          await db.readReceipts.add({
            peerAddress: conversation.peerAddress,
            timestamp: message.content?.timestamp,
          });
        }
        // If the entry does exist, update it with content timestamp
        else {
          await db.readReceipts.update(conversation.peerAddress, {
            timestamp: message.content?.timestamp,
          });
        }
      });
  } else {
    message.id = await db.messages.add(message);
  }
}
