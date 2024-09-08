import express, { type Request, type Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { getXmtpClient, initializeClients } from "./lib/client";
import { invitation } from "@xmtp/proto";
import { BroadcastClient } from "@xmtp/broadcast-sdk";
import { broadCastConfigEntities } from "./lib/broadcasterConfigs";
import { base64ToBytes } from "./lib/utils/base64ToBytes";
import { allowedConsentList } from "./lib/utils/consents";

const envPath = `.env.${process.env.NODE_ENV}`;
dotenv.config({ path: envPath });
const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.UI_ORIGIN ?? '',
  })
);

initializeClients();

app.get("/_health", (req: Request, res: Response) => {
  res.status(200).send("OK");
});

app.post("/lookup", async (req: Request, res: Response) => {
  const { address, broadcastAddress } = req.body;
  console.log(req.body);
  if (typeof address !== "string") {
    console.log(req.body);
    res.status(400).send("Address must be a string");
    return;
  }
  if (typeof broadcastAddress !== "string") {
    res.status(400).send("Broadcast Address must be a string");
    return;
  }
  const client = await getXmtpClient(broadcastAddress);
  if (!client) {
    console.log("Client not initialized " + broadcastAddress);
    res.status(500).send("Client not initialized " + broadcastAddress);
    return;
  }
  const canMessage = await client.canMessage(address);
  res.json({ onNetwork: canMessage }).status(200);
});

app.post("/subscribe", async (req: Request, res: Response) => {
  const { address, broadcastAddress, consentProof } = req.body;
  if (typeof address !== "string") {
    res.status(400).send("Address must be a string");
    return;
  }

  if (typeof broadcastAddress !== "string") {
    res.status(400).send("Broadcast Address must be a string");
    return;
  }

  if (typeof consentProof !== "string") {
    res.status(400).send("Consent proof must be a string");
    return;
  }

  // Convert consentProof from Base64 to Uint8Array
  const consentProofUint8Array = base64ToBytes(consentProof);

  try {
    const client = await getXmtpClient(broadcastAddress);
    const { greeting } = broadCastConfigEntities.map[broadcastAddress];
    if (!client) {
      res.status(500).send("Client not initialized");
      return;
    }
    const consentProof = invitation.ConsentProofPayload.decode(
      consentProofUint8Array
    );
    console.log("Creating conversation with: ", {
      consentProof,
    });
    const conversation = await client.conversations.newConversation(
      address,
      undefined,
      consentProof
    );
    console.log("Conversation created: ", conversation.topic);
    await conversation.send(greeting);
    res.status(200).send({ topic: conversation.topic });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/broadcast", async (req: Request, res: Response) => {
  const { text, address } = req.body;
  // Supporting sending only Text Content, but can be updated to send different types of content
  if (typeof text !== "string") {
    res.status(400).send("Message must be a string");
    return;
  }
  if (typeof address !== "string") {
    res.status(400).send("Address must be a string");
    return;
  }
  const client = await getXmtpClient(address);
  if (!client) {
    res.status(500).send("Client not initialized");
    return;
  }
  const subscribers = (await allowedConsentList(client)).map(({value}) => value);
  const broadcastClient = new BroadcastClient({
    client,
    addresses: subscribers,
    cachedCanMessageAddresses: subscribers,
  })
  broadcastClient.broadcast([text], {});
  res.status(200).send('OK');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
