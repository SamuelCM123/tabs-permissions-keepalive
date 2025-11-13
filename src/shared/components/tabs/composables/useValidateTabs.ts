import { ref } from 'vue';
// import { useToastStore } from '@/shared/components/toast/stores/useToastStore.ts';
// import { useAuthStore } from '@/shared/stores/auth/useAuthStore.ts';

export const useValidateTabs = () => {

    //? Asignaciones de Stores
    // const AuthStore = useAuthStore();
    // const ToastStore = useToastStore();

    // Properties

    // Methods
    // const validateTabs = (routeTabs: any) => {
    //     // console.log('routeTabs.meta.permissions:',routeTabs.meta.permissions);
    //     // console.log('AuthStore.permissionsUser:',AuthStore.permissionsUser);

    //     //? Valida si tiene una sección de permisos
    //     if(routeTabs.meta.hasOwnProperty('permissions') === false) return true

    //     //? Verificación de permisos
    //     let permissionsRoute: any = AuthStore.permissionsUser[routeTabs.meta.permissions.name as keyof typeof AuthStore.permissionsUser];
    //     let hasPermission = permissionsRoute[routeTabs.meta.permissions.value];
    //     console.log('permissionsRoute:',permissionsRoute);
    //     console.log('hasPermission:',hasPermission);

    //     //? Verifica si el usuario tiene permiso
    //     if(!hasPermission) {

    //         //? Muestra el toast
    //         ToastStore.openToast({
    //             title: 'Acceso denegado',
    //             message: 'No tienes permiso para acceder a este módulo',
    //             type: 'error',
    //         })

    //         //? Deniega el despliegue de la pestaña
    //         return false
    //     };

    //     //? Confirma que el módulo se puede desplegar
    //     return true;
    // }

    return {
        //* Properties
        
        //* Methods
        // validateTabs,
    }

}