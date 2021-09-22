import { app } from "./app";
import http from "http";
import {Server} from "socket.io";
import { generateLocationMessage, generateMessage } from "./utils/message";

const port = process.env.PORT || 3000;

const server  = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('New Websocket connection');

    socket.broadcast.emit('message', generateMessage('A new user has joined!'));

    socket.on('sendMessage', (msg, callback) => {
        io.emit('message', generateMessage(msg));

        callback();
    })

    socket.on('sendLocation', (position: {latitude: number, longitude: number}, callback: Function) => {
        io.emit('locationMessage', generateLocationMessage(position));

        callback({status: 'OK'});
    })

    socket.on('disconnect', () => {
        io.emit('message', generateMessage('A user has left'));
    })
});

server.listen(port, () => {
    console.log('Listening on port 3000');
});