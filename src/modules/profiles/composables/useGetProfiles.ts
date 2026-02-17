//* Importaciones
import { ref } from 'vue';
// import { appApi } from '@/api';
import { useRouter } from 'vue-router';
import { usePermissions } from '../../../shared/components/sidebar/composables/usePermissions';
// import { useProfileStore } from "@/modules/dashboard/configurations/profiles/stores/useProfileStore.js";

export const useGetProfiles = () => {

    //? Asignaciones de Stores
    // const ProfileStore = useProfileStore();

    //? Asignaciones de Composables
    const { permissionsUser } = usePermissions();

    //? Instancia del enrutador
    const Router = useRouter();

    //* PROPERTIES

    /**
     * @type {ref<boolean>} -Controla la visibilidad del esqueleto de carga de perfiles
     */
    let isSkeletonLoading = ref(false);

    /**
     * @type {ref<boolean>} -Controla la visibilidad del esqueleto de carga al buscar una estación especifica
     */
    let isSkeletonSearchLoading = ref(false);

    /**
     * @type {ref<Array<object>>} -Lista de perfiles
     */
    let listProfiles = ref();

    /**
     * @type {ref<String>} -Cadena de texto que filtra los perfiles disponibles
     */
    let searchInput = ref();

    /**
     * @type {ref<Object>} -Perfiles filtrados
     */
    let filteredData = ref();

    //* METHODS

    /**
     * Obtiene la lista de los perfiles
     * @function
     * @name getProfiles
     * @returns {undefined}
     */
    const getProfiles = async () => {

        // try{

            // //? Habilita la carga
            // isSkeletonLoading.value = true;

            // //? Configuración de la instancia API
            // const accessToken = $cookies.get('FW_AUTHENTICATION');
            // appApi.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
            // appApi.defaults.headers.common.title = 'Perfiles';

            // //? Petición GET para obtener la lista de perfiles
            // const response = await appApi.get('/profiles');
            // const { success } = response.data;
            
            // // console.log('response:', response);
            // //? Evalua la respuesta
            // if(success){

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
                
                //? Configura la lista de perfiles de acuerdo a sus permisos
                listProfiles.value = await profiles.map((prof, index) => {
                        
                    //? Simplifica los permisos de todos los módulos
                    let permissions = Object.values(permissionsUser.value).reduce((previous,current) => {
                        
                        //? Configura la nueva estructura de los permisos generales del perfil
                        Object.entries(current).forEach(([namePermission, valuePermission]) => {

                            //? Almacena los permisos generales habilitados
                            if (valuePermission === true) {
                                previous[namePermission] = true;
                            }
                        });
                        
                        //? Retorna la estructura de permisos por perfil
                        return previous;
                    });
                    
                    return {
                        id_profile: prof.id_profile,
                        name: prof.name,
                        permissions: permissions,
                        status: prof.status
                    };
                });
                
                // listProfiles.value = [];
                
                //? Almacena los perfiles para poder filtrarlos
                filteredData.value = listProfiles.value;
                
                //? Deshabilita la carga
                isSkeletonLoading.value = false;
                
                
                // console.log('listProfiles:',listProfiles.value);

        //     }

        // }
        // catch(error){
        //     // Error
        // }

    }

    /**
     * Obtiene los perfiles filtrados
     * @function
     * @name searchProfile
     * @param {boolean} resetSearch -Valor booleano que controla el reseteo del buscador
     */
    const searchProfile = async (resetSearch: any) => {

        try{

            //? Habilita el loader de búsqueda
            isSkeletonSearchLoading.value = true;

            //? Evalua si se resetean los parametros de busqueda
            if(resetSearch){
                filteredData.value = listProfiles.value;
                searchInput.value = null;
            }
            else{
                filteredData.value = await listProfiles.value.filter((data:any) => data.name.toLowerCase().includes(searchInput.value.toLowerCase()));
            }

            // console.log('filteredData:',filteredData.value);
            // console.log('searchInput:',searchInput.value);

            setTimeout(() => {
                
                //? Deshabilita el loader de búsqueda
                isSkeletonSearchLoading.value = false;
            }, 500);

        }
        catch(error){
            // Error
        }

    }

    /**
     * Almacena los datos del perfil a editar
     * @function
     * @name openEditUsers
     * @param {object} user -Datos del usuario a editar
     * @returns {undefined}
     */
    const openEditProfiles = (profileToEdit: any) => {

        // //? Valida el permiso editar
        // if(props.permissions?.profiles?.edit){
            
        //     //? Almacena el perfil a editar
        //     ProfileStore.profileToEdit = profileToEdit;
            
        //     //? Redireccionamiento al módulo "Editar Perfil"
        //     return Router.push({ name: 'edit-profile', params: { id_profile: profileToEdit.id_profile }})
        // }
    }

    return {
        //* PROPERTIES
        listProfiles,
        isSkeletonLoading,
        isSkeletonSearchLoading,
        searchInput,
        filteredData,
        Router,
            
        //* METHODS
        getProfiles,
        searchProfile,
        openEditProfiles,
    }

}