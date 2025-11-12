//* Importaciones
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { API_CONFIG } from '@/services/api/api.config.ts';
import socket from '@/modules/web-sockets/composables/useServices.ts';

export const useDesk = () => {

    //? Instancia de socket
    const wsService = socket;
    // console.log('wsService:',wsService);

    //? Instancia de enrutador
    const Router = useRouter();
    const Route = useRoute();

    //* PROPERTIES
    let ticketPending = ref(0);
    let id_desk = ref();
    let workingTicket = ref();

    //* METHODS

    const loadInitialCount = async () => {
        if(!Route.params.id_desk) return Router.push({ name: 'index' });
        id_desk.value = Route.params.id_desk;
        // console.log('id_desk:',id_desk.value);

        const response = await API_CONFIG.get('/api/ticket/pending', {
            headers: { 'Content-Type': "application/json; charset=utf-8" },
        });

        ticketPending.value = response.data.length;
        // console.log('response:',response);

    };

    const getTicket = async () => {

        try{

            await finishTicket();
            
            // console.log('id_desk:',id_desk.value);
            const response = await API_CONFIG.get(`/api/ticket/draw/${id_desk.value}`,{
                headers: { 'Content-Type': "application/json; charset=utf-8" }
            });
            
            if(response.data.status === 'error') return;
            
            const { ticket } = response.data;
            workingTicket.value = ticket.number;
        }
        catch(e){
            // console.log('error:',e);
            // console.log('response:',response);
        }

    }

    const finishTicket = async () => {

        try{
            
            // console.log('workingTicket:',workingTicket.value);
            if(!workingTicket.value) return;
            const response = await API_CONFIG.put(`/api/ticket/done/${workingTicket.value.id}`);
            // console.log('finish:',response);
            workingTicket.value = 'NADIE';
        }
        catch(e){
            // console.log('error:',e);
            // console.log('response:',response);
        }

    }

    const handleIncomingMessages = ( message: any ) => {

        // console.log('message:',message);
        // let { type, message } = message;
        ticketPending.value = message;

    }

    onMounted(() => {
        loadInitialCount();
        wsService.onTicketCountChanged(handleIncomingMessages);
    })

    return {
        //* PROPERTIES
        ticketPending,
        id_desk,
        workingTicket,
            
        //* METHODS
        loadInitialCount,
        wsService,
        // getWebSocketService,
        handleIncomingMessages,
        getTicket,
        finishTicket,
    }

}