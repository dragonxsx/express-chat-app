import { app } from "./app";
import http from "http";
import {Server} from "socket.io";

const port = process.env.PORT || 3000;

const server  = http.createServer(app);
const io = new Server(server);

io.on('connection', () => {
    console.log('New Websocket connection');
})

server.listen(port, () => {
    console.log('Listening on port 3000');
});