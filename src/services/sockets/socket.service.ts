// TODO: NO SE ENCUENTRA EN USO
import socketIO from './socket.io';
// import socket from './socket.ts';
import { useToastStore } from '@/shared/components/toast/stores/useToastStore.ts';

// 1. Interfaces para los payloads de la aplicación
interface ChatMessagePayload {
    message: string;
    user?: string;
}

interface NotificationPayload {
    title: string;
    message: string;
}

const socketService = {
    init() {
        
        socketIO.socket?.on('connected', () => {
            const toastStore = useToastStore();
            toastStore.openToast({
                title: 'Conexión Establecida',
                message: 'Conectado exitosamente al servidor.',
                type: 'success',
                duration: 5000,
            });
        });

        socketIO.socket?.on('disconnected', () => {
            const toastStore = useToastStore();
            toastStore.openToast({
                title: 'Desconectado',
                message: 'Se ha perdido la conexión con el servidor.',
                type: 'info',
                duration: 5000,
            });
        });
    },

    // Métodos de alto nivel con tipado
    sendChatMessage(message: string): void {
        socketIO.socket?.send({ type: 'chatMessage', payload: { message } });
    },

    onChatMessage(callback: (payload: ChatMessagePayload) => void): void {
        socketIO.socket?.on('chatMessage', callback);
    },

    onNotification(callback: (payload: NotificationPayload) => void): void {
        socketIO.socket?.on('notification', callback);
    },
};

socketService.init();

export default socketService;