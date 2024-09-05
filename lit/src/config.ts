import { LitNetwork } from "@lit-protocol/constants";
import dotenv from 'dotenv';
dotenv.config();

export default {
  privateKey: process.env["ETHEREUM_PRIVATE_KEY"],
  pkpPublicKey: process.env["LIT_PKP_PUBLIC_KEY"],
  creditTokenId: process.env["LIT_CAPACITY_CREDIT_TOKEN_ID"],
  network: LitNetwork.DatilDev,
  debug: Boolean(Number(process.env['LIT_DEBUG'])),
  botSecret: process.env["TELEGRAM_BOT_SECRET"],
  telegramUserData: process.env["TELEGRAM_USER_DATA"],
};