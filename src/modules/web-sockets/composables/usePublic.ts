//* Importaciones
import { onMounted, ref } from 'vue';
import { API_CONFIG } from '@/services/api/api.config.ts';
import socket from '@/modules/web-sockets/composables/useServices.ts';

export const usePublic = () => {

    //? Instancia de socket
    const wsService = socket;
    // console.log('wsService:',wsService);

    //* PROPERTIES
    let ticketProcess = ref(null);
    let ticketPending = ref([]);

    //* METHODS

    const getTicketOnProcess = async () => {
        const response = await API_CONFIG.get('/api/ticket/working-on');
        // console.log(response);
    }

    const getTicketsPending = async () => {
        const response = await API_CONFIG.get('/api/ticket/working-on');

        if(response.data){
            ticketPending.value = response.data;
        }

        // console.log(response);
    }
    

    const handleIncomingTicketWork = (data: []) => {
        console.log('data:',data);
        ticketPending.value = [];
        ticketPending.value = [...data];
    }

    onMounted(() => {
        getTicketOnProcess();
        getTicketsPending();
        wsService.onWorkingOnTicket(handleIncomingTicketWork);
    })

    return {
        //* PROPERTIES
        ticketPending,
        ticketProcess,
        
            
        //* METHODS
        getTicketOnProcess,
        getTicketsPending,
        handleIncomingTicketWork,
        wsService,
    }

}