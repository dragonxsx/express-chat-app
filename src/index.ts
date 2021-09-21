import { app } from "./app";
import http from "http";
import {Server} from "socket.io";

const port = process.env.PORT || 3000;

const server  = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('New Websocket connection');

    socket.broadcast.emit('message', 'A new user has joined!');

    socket.on('sendMessage', (msg, callback) => {
        io.emit('message', msg);

        callback();
    })

    socket.on('sendLocation', (position: {latitude: number, longitude: number}, callback: Function) => {
        socket.broadcast.emit('message', `https://www.google.com/maps?q=${position.latitude},${position.longitude}`);

        callback({status: 'OK'});
    })

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left');
    })
});

server.listen(port, () => {
    console.log('Listening on port 3000');
});