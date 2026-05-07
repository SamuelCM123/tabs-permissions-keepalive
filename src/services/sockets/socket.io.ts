import IO, { Socket } from 'socket.io-client';
import { WS_CONFIG } from './socket.config';

type WsCallback<T = any> = (payload: T) => void;

export class SocketIoManager {

    public socket: Socket | null = null;
    private listeners: Record<string, WsCallback[]> = {};

    constructor() {
        this.connect();
    }

    public connect(): void {

        // if(this.socket?.connected) return;

        this.socket = IO(
            WS_CONFIG.url_io, 
            { 
                path: '/ws-io',
                transports: ['websocket'],
                autoConnect: true,
                reconnection: true,
                reconnectionDelay: 1000,
                reconnectionDelayMax: 5000,
                reconnectionAttempts: 10,

            }
        );

        this.socket.on('connect', () => {
            console.log('Connected to server');
            if(this.socket){
                this.socket.connected = true;
            }
            this.emit('connect', null);
        })

        this.socket.on('disconnect', () => {
            console.log('Disconnected from server');
            if(this.socket){
                this.socket.connected = false;
            }
            this.emit('disconnect', null);
        })

        this.socket.on('error', (error: any) => {
            console.error('Socket.IO error:', error);
        })

    }

    get isConnected () {
        return this.socket?.connected;
    }

    private emit (eventName: string, payload: any) {
        if (this.listeners[eventName]) {
            this.listeners[eventName].forEach((callback) => callback(payload));
        }
    }

    public close () {
        if(this.socket){
            this.socket.close();
            this.emit("disconnected", null);
        }
    }

    //? TODO: Ya se controla la reconexión
    //? TODO: Ya se controla el heartbeat

}

export default new SocketIoManager();