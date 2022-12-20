import * as dotenv from 'dotenv';
dotenv.config();
import { App } from './app';

async function initServer() {
  const app = new App(process.env.PORT);
  await app.listen();
}
initServer();
