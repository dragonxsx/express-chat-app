import { app } from "./app";
import http from "http";
import {Server} from "socket.io";
import { generateLocationMessage, generateMessage } from "./utils/message";
import {  addUser, removeUser, getUser, getUsersInRoom  } from "./utils/user";

const port = process.env.PORT || 3000;

const server  = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('New Websocket connection');

    socket.on('join', (options, callback) => {
        console.log(addUser); 
        
        const {error, user} = addUser({id: socket.id, ...options});

        if(error) {
            return callback(error);
        }

        socket.join(user!.room);

        socket.emit('message', generateMessage('Welcome!'));
        socket.broadcast.to(user!.room).emit('message', generateMessage(`${user!.username} has joined!`));

        callback();
    })

    socket.on('sendMessage', (msg, callback) => {
        io.emit('message', generateMessage(msg));

        callback();
    })

    socket.on('sendLocation', (position: {latitude: number, longitude: number}, callback: Function) => {
        io.emit('locationMessage', generateLocationMessage(position));

        callback({status: 'OK'});
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if(user) {
            io.to(user.room!).emit('message', generateMessage(`${user.username} has left`));
        }
    })
});

server.listen(port, () => {
    console.log('Listening on port 3000');
});