import { app } from "./app";
import http from "http";
import {Server} from "socket.io";

const port = process.env.PORT || 3000;

const server  = http.createServer(app);
const io = new Server(server);

let count = 0;

io.on('connection', (socket) => {
    console.log('New Websocket connection');

    socket.emit('countUpdated', count);

    socket.on('increment', () => {
        count++;
        io.emit('countUpdated', count);
    })
});

server.listen(port, () => {
    console.log('Listening on port 3000');
});