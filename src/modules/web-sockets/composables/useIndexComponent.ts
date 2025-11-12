import { ref } from 'vue';
import socket from '@/modules/web-sockets/composables/useServices.ts';
import { API_CONFIG } from '@/services/api/api.config.ts';

export const useIndexComponent = () => {

    //? Instancia de socket
    const wsService = socket;
    // console.log('wsService:',wsService);

    //* PROPERTIES

    let fieldDesk = ref('');
    let ticketWorkingOn = ref([]);

    //* METHODS

    const getTicketWorkingOn = async () => {

        const response: {data: []} = await API_CONFIG.get('/api/ticket/working-on');
        // console.log(response);
        ticketWorkingOn.value = [...response.data];
    }

    const handleTicketsTile = (data: []) => {
        // console.log('data:',data);

        ticketWorkingOn.value = [];
        ticketWorkingOn.value = [...data];
    }

    return {
        //* PROPERTIES
        fieldDesk,
        ticketWorkingOn,
            
        //* METHODS
        wsService,
        getTicketWorkingOn,
        handleTicketsTile,
    }

}