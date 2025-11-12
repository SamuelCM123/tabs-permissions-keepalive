//* Importaciones
import { ref } from 'vue';
import { API_CONFIG } from '@/services/api/api.config.ts';

export const useNewTicket = () => {

    //* PROPERTIES
    let lastTicket = ref();

    //* METHODS

    const newTicket = async () => {

        try{

            const response = await API_CONFIG.get('/api/ticket/last');
            // console.log('response:',response);
            lastTicket.value = response.data;
        }
        catch(e){
            // console.log('error:',e);
        }

    };

    const createTicket = async () => {

        try{

            const response = await API_CONFIG.post('/api/ticket', {
                headers: { 'Content-Type': "application/json; charset=utf-8" },
            });
            lastTicket.value = response.data.number;

            // console.log('response:',response);
        }
        catch(e){
            // console.log('error:',e);
        }

    }

    return {
        //* PROPERTIES
        lastTicket,
            
        //* METHODS
        newTicket,
        createTicket,
    }

}