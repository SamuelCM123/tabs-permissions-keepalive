//* Importaciones
import { ref } from 'vue';
// import { appApi } from '@/api';
import { defineStore } from 'pinia';

export const useServiceStore = defineStore('Service',() => {

    //* STATES

    //* ACTIONS
    /**
     * Realiza una petición para obtener un perfil
     * @function
     * @name getProfile
     * @param {number} id - Id del perfil a obtener
     * @returns {object} - Datos del perfil consultado
     */
    const getProfile = async (id: any) => {

        try{

            // //? Configuración de instancia API
            // const accessToken = $cookies.get('FW_AUTHENTICATION');
            // appApi.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
            // appApi.defaults.headers.common.title = `Editar Perfil`;

            // //? Petición GET para obtener un perfil
            // const response = await appApi.get(`/profile/${id}`);
            // const { success } = response.data;

            // // console.log('response:',response);
            // //? Evalua la respuesta
            // if(success){
                
            //     return response.data.response;
            // }
            
        }
        catch(error){
            // Error
        }

    }

    return {
        //* STATES

        //* ACTIONS
        getProfile,
    }
})