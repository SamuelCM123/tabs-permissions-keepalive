//* Importaciones
import { ref } from 'vue';
import { defineStore } from 'pinia';
import { usePermissions } from '@/shared/components/sidebar/composables/usePermissions.ts';

export const useAuthStore = defineStore('Auth',() => {

    //? Desestructuraciones de Composables
    const { 
        //* STATES
        permissionsUser,

        //* METHODS
        validatePermissions,
        hasPermission,
    } = usePermissions();

    //* STATES

    //* ACTIONS

    // TODO: Integrar funcionalidades para permisos en las pestañas del navbar y sidebar

    return {
        //* STATES
        permissionsUser,

        //* ACTIONS
        validatePermissions,
        hasPermission,
    }
})