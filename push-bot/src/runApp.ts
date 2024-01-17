import { runBot } from './runBot';

export interface ConfigBot {
  port: string;
  token: string;
  chatId: string;
}

export const runApp = () => {
  const config: ConfigBot = {
    port: process.env.PORT_VALUE!,
    token: process.env.BOT_API_TOKEN!,
    chatId: process.env.CHAT_ID!,
  };

  runBot(config);
};
