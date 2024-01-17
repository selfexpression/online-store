import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import TelegramBot, { SendMessageOptions } from 'node-telegram-bot-api';

import { ConfigBot } from './runApp';

const initBot = async (token: string): Promise<TelegramBot> => {
  try {
    const bot = new TelegramBot(token, { polling: true });
    return bot;
  } catch (error) {
    console.error('Error while initializing Telegram Bot:', error);
    throw error;
  }
};

export const runBot = async (config: ConfigBot): Promise<void> => {
  const app = express();
  app.use(bodyParser.json());
  app.use(cors());

  const { token, port, chatId } = config;

  const bot = await initBot(token);

  app.post('/send-message', async (req: Request, res: Response) => {
    try {
      const options: SendMessageOptions = {
        parse_mode: 'Markdown',
      };
      const { message }: { message: string } = req.body;
      await bot.sendMessage(chatId, message, options);
      res.json({ success: true });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ success: false, error: error.message });
      } else {
        res.status(500).json({ success: false, error: 'An unknown error occurred' });
      }
    }
  });

  app.listen(config.port, () => {
    console.log(`Server is running on port ${port}`);
  });
};
