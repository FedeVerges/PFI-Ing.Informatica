import { App } from "./app";


async function initServer() {
    const app = new App(8080);
    await app.listen();
}
initServer();