//* Importaciones
import { ref } from 'vue';

export const usePermissions = () => {

    // TODO: Obtener los permisos del STORE de Auth

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

    return {
        //* PROPERTIES
        permissionsUser,
        
        //* METHODS
        
    }

}