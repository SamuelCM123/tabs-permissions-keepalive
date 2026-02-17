//* Importaciones
import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useProfileStore = defineStore('Profile',() => {

    // STATES

    /**
     * @type {ref<object>} -Datos del perfil a editar
     */
    let profileToEdit = ref();

    // ACTIONS

    return {
        // STATES
        profileToEdit,

        // ACTIONS
        
    }
})