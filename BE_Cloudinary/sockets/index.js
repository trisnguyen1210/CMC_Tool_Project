import { createServer } from 'http';
import { Server } from 'socket.io';
import { reportEventCurrentCallVos136 } from '../EventSocket/CurrentCall.event.js';

const connectWebSocket = (app, port) => {
    const server = createServer(app)
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            transports: ['websocket', 'polling'],
            credentials: true
        },
        allowEIO3: true
    });


    io.on('connection', (socket) => {
        console.log('A user connected');
        socket.emit('message', 'welcome to the dashboard');

        socket.on('clientMessage', async (data) => {
            if (data.reason === "CurrentCall") {
                const response = await reportEventCurrentCallVos136(data);
                socket.emit('serverMessage', response);
            }
        });

        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    });
    server.listen(port, () => {
        console.log(`Server Websocket is running on port ${port} `);
    })
}

export default connectWebSocket;