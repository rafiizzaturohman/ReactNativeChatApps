import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://192.168.1.78:3000/', {
    transports: ['websocket'],
    autoConnect: true
});

export default socket;