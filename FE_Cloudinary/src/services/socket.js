import { io } from "socket.io-client";

export const connSocket = () => {
    const socket = io('http://10.1.199.176:1210')
    return socket;
}
