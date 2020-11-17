import { SkyrimBot } from './client';
import { configBot } from './config/config';

const client = new SkyrimBot(configBot);
client.start();
