//* Importaciones
import { ref } from 'vue';
import { useToastStore } from '@/shared/components/toast/stores/useToastStore.ts';

export const usePermissions = () => {

    // TODO: Obtener los permisos del STORE de Auth

    //? Asignaciones de Stores
    const ToastStore = useToastStore();

    //* PROPERTIES

    /**
     * @type {ref<object>} -Permisos del usuario que controla el acceso a los módulos y a sus acciones
     */
    let permissionsUser = ref<object>(
        {
            "split_button_1": {
                "add": false,
                "disable": false,
                "edit": false,
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
                "read": false
            },
            "button_action_1": {
                "add": null,
                "disable": null,
                "edit": null,
                "read": true
            },
            "select_buscador": {
                "add": false,
                "disable": false,
                "edit": false,
                "read": false
            },
            "acordeones": {
                "add": false,
                "disable": null,
                "edit": null,
                "read": false
            },
            "websocket_new_ticket": {
                "add": null,
                "disable": null,
                "edit": null,
                "read": false
            },
            "websocket_public": {
                "add": true,
                "disable": true,
                "edit": true,
                "read": true
            },
            "websocket_index_component": {
                "add": null,
                "disable": false,
                "edit": false,
                "read": true
            },
            "websocket_index_inter": {
                "add": false,
                "disable": false,
                "edit": false,
                "read": true
            },
            "websocket_desk": {
                "add": true,
                "disable": true,
                "edit": true,
                "read": true
            },
            "perfiles": {
                "add": true,
                "disable": true,
                "edit": true,
                "read": true
            }
        }
    )

    let profiles = [
        {
            "id_profile": 52,
            "name": "CHOFER AUDITOR",
            "status": true,
            "permissions": {
                "split_button_1": {
                    "add": false,
                    "disable": false,
                    "edit": false,
                    "read": true
                },
                "split_button_2": {
                    "add": null,
                    "disable": null,
                    "edit": null,
                    "read": false,
                },
                "button_loading": {
                    "add": null,
                    "disable": null,
                    "edit": null,
                    "read": false
                },
                "button_action_1": {
                    "add": null,
                    "disable": null,
                    "edit": null,
                    "read": true
                },
                "select_buscador": {
                    "add": false,
                    "disable": false,
                    "edit": false,
                    "read": false
                },
                "acordeones": {
                    "add": false,
                    "disable": null,
                    "edit": null,
                    "read": false
                },
                "websocket_new_ticket": {
                    "add": null,
                    "disable": null,
                    "edit": null,
                    "read": false
                },
                "websocket_public": {
                    "add": true,
                    "disable": true,
                    "edit": true,
                    "read": true
                },
                "websocket_index_component": {
                    "add": null,
                    "disable": false,
                    "edit": false,
                    "read": true
                },
                "websocket_index_inter": {
                    "add": false,
                    "disable": false,
                    "edit": false,
                    "read": true
                },
                "websocket_desk": {
                    "add": true,
                    "disable": true,
                    "edit": true,
                    "read": true
                },
                "perfiles": {
                    "add": true,
                    "disable": true,
                    "edit": true,
                    "read": true
                }
            }
        }
    ]

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
            console.log('aqui');
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

    const hasPermission = (routeTabs: any) => {
        //? Valida si tiene una sección de permisos
        if(routeTabs.meta.hasOwnProperty('permissions') === false) return true

        //? Verificación de permisos
        let permissionsRoute: any = permissionsUser.value[routeTabs.meta.permissions.name as keyof typeof permissionsUser.value];
        let hasPermission = permissionsRoute[routeTabs.meta.permissions.value];
        // console.log('permissionsRoute:',permissionsRoute);
        // console.log('hasPermission:',hasPermission);

        //? Verifica si el usuario tiene permiso
        if(!hasPermission) {

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
        hasPermission,
    }

}