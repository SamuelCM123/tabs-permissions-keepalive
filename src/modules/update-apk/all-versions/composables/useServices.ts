// import socket from '@/services/sockets/socket.ts';
import socketIO from '@/services/sockets/socket.io';
import { useToastStore } from '@/shared/components/toast/stores/useToastStore.ts';

// 1. Interfaces para los payloads de la aplicación
// interface ChatMessagePayload {
//     message: string;
//     user?: string;
// }

// interface NotificationPayload {
//     title: string;
//     message: string;
// }

// const socketService = {
//     init() {
        
//         socket.on('connected', () => {
//             const toastStore = useToastStore();
//             toastStore.openToast({
//                 title: 'Conexión Establecida',
//                 message: 'Conectado exitosamente al servidor.',
//                 type: 'success',
//                 duration: 5000,
//             });
//         });

//         socket.on('disconnected', () => {
//             const toastStore = useToastStore();
//             toastStore.openToast({
//                 title: 'Desconectado',
//                 message: 'Se ha perdido la conexión con el servidor.',
//                 type: 'info',
//                 duration: 5000,
//             });
//         });
//     },

//     // Métodos de alto nivel con tipado

//     onAllVersionsChanged(callback: (payload: []) => void): void {
//         socket.on('on-all-versions', callback);
//     },

// };

const socketIoService = {
    init() {
        socketIO.socket?.on('connect', () => {
            const toastStore = useToastStore();
            toastStore.openToast({
                title: 'Conexión Establecida',
                message: 'Conectado exitosamente al servidor.',
                type: 'success',
                duration: 5000,
            });
        })

        socketIO.socket?.on('disconnect', () => {
            const toastStore = useToastStore();
            toastStore.openToast({
                title: 'Desconectado',
                message: 'Se ha perdido la conexión con el servidor.',
                type: 'info',
                duration: 5000,
            });
        })

    },
    
    onAllVersionsChanged(callback: (payload: []) => void): void {
        socketIO.socket?.on('on-all-versions', callback);
    },
    
}

socketIoService.init();

// socketService.init();

export default socketIoService;