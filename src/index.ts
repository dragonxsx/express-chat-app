import { app } from "./app";
import http from "http";
import {Server} from "socket.io";

const port = process.env.PORT || 3000;

const server  = http.createServer(app);
const io = new Server(server);

let count = 0;

io.on('connection', (socket) => {
    console.log('New Websocket connection');

    socket.broadcast.emit('message', 'A new user has joined!');

    socket.on('sendMessage', (msg) => {
        io.emit('message', msg);
    })

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left');
    })
});

server.listen(port, () => {
    console.log('Listening on port 3000');
});