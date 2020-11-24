import { SkyrimBot } from './client';
import { configBot } from './config/config';
import { connect } from 'mongoose';
import { mongodb_uri } from './config/config';

connect(mongodb_uri, { useNewUrlParser: true, useUnifiedTopology: true });

const client = new SkyrimBot(configBot);
client.start();
