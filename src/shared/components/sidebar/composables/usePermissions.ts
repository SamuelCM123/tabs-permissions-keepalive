//* Importaciones
import { ref } from 'vue';
import { useToastStore } from '@/shared/components/toast/stores/useToastStore.ts';

export const usePermissions = () => {

    // TODO: Obtener los permisos del STORE de Auth

    //? Asignaciones de Stores
    const ToastStore = useToastStore();

    //* PROPERTIES

    // /**
    //  * @type {ref<object>} -Permisos del usuario que controla el acceso a los módulos y a sus acciones
    //  */
    let permissionsUser = ref<object>(
        {
            "split_button_1": {
                "add": true,
                "disable": true,
                "edit": true,
                "read": true
            },
            "split_button_2": {
                "add": null,
                "disable": null,
                "edit": null,
                "read": true,
            },
            "button_loading": {
                "add": null,
                "disable": null,
                "edit": null,
                "read": true
            },
            "button_action_1": {
                "add": null,
                "disable": null,
                "edit": null,
                "read": true
            },
            "select_buscador": {
                "add": true,
                "disable": true,
                "edit": true,
                "read": true
            },
            "acordeones": {
                "add": true,
                "disable": null,
                "edit": null,
                "read": true
            },
            "websocket_new_ticket": {
                "add": null,
                "disable": null,
                "edit": null,
                "read": true
            },
            "websocket_public": {
                "add": true,
                "disable": true,
                "edit": true,
                "read": true
            },
            "websocket_index_component": {
                "add": null,
                "disable": true,
                "edit": true,
                "read": true
            },
            "websocket_index_inter": {
                "add": true,
                "disable": true,
                "edit": true,
                "read": true
            },
            "websocket_desk": {
                "add": true,
                "disable": true,
                "edit": true,
                "read": true
            }
        }
    )

    //* METHODS
    const validatePermissions = (routeTabs: any) => {
        // console.log('routeTabs:',routeTabs)
        // console.log('routeTabs.meta.permissions:',routeTabs.meta.permissions);
        // console.log('AuthStore.permissionsUser:',AuthStore.permissionsUser);

        //? Valida si tiene una sección de permisos
        if(routeTabs.meta.hasOwnProperty('permissions') === false) return true

        //? Verificación de permisos
        let permissionsRoute: any = permissionsUser.value[routeTabs.meta.permissions.name as keyof typeof permissionsUser.value];
        let hasPermission = permissionsRoute[routeTabs.meta.permissions.value];
        // console.log('permissionsRoute:',permissionsRoute);
        // console.log('hasPermission:',hasPermission);

        //? Verifica si el usuario tiene permiso
        if(!hasPermission) {

            //? Muestra el toast
            ToastStore.openToast({
                title: 'Acceso denegado',
                message: `No tienes permiso para acceder al módulo <span class="letter-bold">${routeTabs.meta.title}</span>`,
                type: 'error',
            })

            //? Deniega el despliegue de la pestaña
            return false
        };

        //? Confirma que el módulo se puede desplegar
        return true;
    }

    return {
        //* PROPERTIES
        permissionsUser,
        
        //* METHODS
        validatePermissions,
    }

}