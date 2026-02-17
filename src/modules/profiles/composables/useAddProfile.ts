//* Importaciones
import { ref } from 'vue';
import { appApi } from '@/api';
import { useRouter } from 'vue-router';
import { useToastStore } from '@/shared/components/toast/stores/useToastStore';
import { useHandleErrors } from '@/modules/dashboard/configurations/profiles/composables/useHandleErrors.js';

export const useAddProfile = () => {

    //? Instancia de router
    const Router = useRouter();

    //? Asignaciones de Stores
    const ToastStore = useToastStore();

    //* PROPERTIES
    /**
     * @type {object} - Referencia al formulario de Agregar Perfil
     */
    let formDataAddProfile = ref({
        name_profile: {
            field: 'name_profile',
            setValue: '',
        },
        checkbox_all: {
            read: {
                select: false,
                disable: false,
            },
            add: {
                select: false,
                disable: false,
            },
            edit: {
                select: false,
                disable: false,
            },
            disable: {
                select: false,
                disable: false,
            },
        },
        isCheckboxGeneral: true,
        sections: [
            {
                name: 'Todos',
                isVisibleCheckboxs: true,
                modules: [
                    {
                        name_permission: 'consumptions',
                        name: 'Consumos',
                        permissions: {
                            read: {
                                select: false,
                                disable: false,
                            },
                            add: {
                                select: false,
                                disable: false,
                                exclude: true,
                            },
                            edit: {
                                select: false,
                                disable: false,
                            },
                            disable: {
                                select: false,
                                disable: false,
                                exclude: true,
                            },
                        }
                    },
                    {
                        name_permission: 'statements_account',
                        name: 'Estado de Cuenta',
                        permissions: {
                            read: {
                                select: false,
                                disable: false,
                            },
                            add: {
                                select: false,
                                disable: false,
                                exclude: true,
                            },
                            edit: {
                                select: false,
                                disable: false,
                                exclude: true,
                            },
                            disable: {
                                select: false,
                                disable: false,
                                exclude: true,
                            },
                        }
                    },
                    {
                        name_permission: 'invoices',
                        name: 'Facturas',
                        permissions: {
                            read: {
                                select: false,
                                disable: false,
                            },
                            add: {
                                select: false,
                                disable: false,
                                exclude: true,
                            },
                            edit: {
                                select: false,
                                disable: false,
                                exclude: true,
                            },
                            disable: {
                                select: false,
                                disable: false,
                                exclude: true,
                            },
                        }
                    },
                    {
                        name_permission: 'maps',
                        name: 'Mapas',
                        permissions: {
                            read: {
                                select: false,
                                disable: false,
                            },
                            add: {
                                select: false,
                                disable: false,
                                exclude: true,
                            },
                            edit: {
                                select: false,
                                disable: false,
                                exclude: true,
                            },
                            disable: {
                                select: false,
                                disable: false,
                                exclude: true,
                            },
                        }
                    },
                    {
                        name_permission: 'profiles',
                        name: 'Perfiles',
                        permissions: {
                            read: {
                                select: false,
                                disable: false,
                            },
                            add: {
                                select: false,
                                disable: false,
                            },
                            edit: {
                                select: false,
                                disable: false,
                            },
                            disable: {
                                select: false,
                                disable: false,
                            },
                        }
                    },
                    {
                        name_permission: 'references',
                        name: 'Referencias',
                        permissions: {
                            read: {
                                select: false,
                                disable: false,
                            },
                            add: {
                                select: false,
                                disable: false,
                            },
                            edit: {
                                select: false,
                                disable: false,
                                exclude: true,
                            },
                            disable: {
                                select: false,
                                disable: false,
                                exclude: true,
                            },
                        }
                    },
                    {
                        name_permission: 'reports',
                        name: 'Reportes',
                        permissions: {
                            read: {
                                select: false,
                                disable: false,
                            },
                            add: {
                                select: false,
                                disable: false,
                                exclude: true,
                            },
                            edit: {
                                select: false,
                                disable: false,
                                exclude: true,
                            },
                            disable: {
                                select: false,
                                disable: false,
                                exclude: true,
                            },
                        }
                    },
                    {
                        name_permission: 'users',
                        name: 'Usuarios',
                        permissions: {
                            read: {
                                select: false,
                                disable: false,
                            },
                            add: {
                                select: false,
                                disable: false,
                            },
                            edit: {
                                select: false,
                                disable: false,
                            },
                            disable: {
                                select: false,
                                disable: false,
                            },
                        }
                    },
                    {
                        name_permission: 'vehicles',
                        name: 'Vehículos',
                        permissions: {
                            read: {
                                select: false,
                                disable: false,
                            },
                            add: {
                                select: false,
                                disable: false,
                                exclude: true,
                            },
                            edit: {
                                select: false,
                                disable: false,
                            },
                            disable: {
                                select: false,
                                disable: false,
                            },
                        }
                    },
                    {
                        name_permission: 'zones',
                        name: 'Zonas',
                        permissions: {
                            read: {
                                select: false,
                                disable: false,
                            },
                            add: {
                                select: false,
                                disable: false,
                            },
                            edit: {
                                select: false,
                                disable: false,
                            },
                            disable: {
                                select: false,
                                disable: false,
                            },
                        }
                    },
                ]
            },
            {
                name: 'Permisos Especiales',
                isVisibleCheckboxs: false,
                modules: [
                    {
                        name_permission: 'special_permit_admin_log',
                        name: 'Bitácora Administrador',
                        permissions: {
                            read: {
                                select: false,
                                disable: false,
                            },
                            add: {
                                select: false,
                                disable: false,
                                exclude: true,
                            },
                            edit: {
                                select: false,
                                disable: false,
                                exclude: true,
                            },
                            disable: {
                                select: false,
                                disable: false,
                                exclude: true,
                            },
                        }
                    },
                    {
                        name_permission: 'special_permit_delete',
                        name: 'Eliminar',
                        permissions: {
                            read: {
                                select: false,
                                disable: false,
                            },
                            add: {
                                select: false,
                                disable: false,
                                exclude: true,
                            },
                            edit: {
                                select: false,
                                disable: false,
                                exclude: true,
                            },
                            disable: {
                                select: false,
                                disable: false,
                                exclude: true,
                            },
                        }
                    },
                ],
            }   
        ]
    });

    /**
     * @type {ref<number>} -Número de permisos seleccionados
     */
    let permissionsIsSelected = ref(0);

    //? Desestructuración de manejador de errores
    const {
        // Properties
        schemeErrors,

        // Methods
        validateField,
        hasError,
        hasErrors,
        getErrorMessage,
        resetGetErrorMessage,
    } = useHandleErrors(formDataAddProfile);

    //* METHODS

    /**
     * Realiza la petición para agregar un nuevo perfil
     * @function
     * @name formSubmitAddProfile
     * @returns {undefined}
     */
    const formSubmitAddProfile = async () => {

        try{
            
            //* Validación de campos
            let validateFields = await validateFieldAddProfile();
            // console.log('validateFields:',validateFields);

            //? Evalua la respuesta
            if(validateFields){

                /**
                 * @type {object} -Almacena el cuerpo de datos de los campos que si tuvieron cambios
                */
                let bodyValidate = {
                    name: formDataAddProfile.value.name_profile.setValue,
                    permissions: await configPermissions(),
                }

                // console.log('bodyValidate:',bodyValidate);

                //? Verifica si se selecciono algun permiso
                if(permissionsIsSelected.value === 0){

                    //? Toast Informativo
                    ToastStore.openToast({
                        title: 'Agregar Perfil',
                        message: `Se necesita seleccionar al menos un permiso para continuar`,
                        type: 'info',
                    })

                    return
                }


                //? Configuración de instancia API
                const accessToken = $cookies.get('FW_AUTHENTICATION');
                appApi.defaults.headers.common.authorization = `Bearer ${accessToken}`
                appApi.defaults.headers.common.title = 'Agregar Perfil';

                //? Petición POST para agregar un nuevo perfil
                const response = await appApi.post('/profile', bodyValidate);
                const { success } = response.data;

                //? Evalúa la respuesta
                if(success){

                    //? Toast de exito
                    ToastStore.openToast({
                        title: 'Perfil Agregado',
                        message: `Se ha agregado el perfil <span class="letter-bold text-mayus">${formDataAddProfile.value.name_profile.setValue}</span> exitosamente`,
                        type: 'success',
                    })

                    //? Redirecciona a la lista de perfiles
                    return Router.push({ name: 'get-profiles' })

                }

            }

        }
        catch(error){
            // Error
        }

    }

    /**
     * Valida los campos de agregar perfil
     * @function
     * @name validateFieldAddProfile
     * @returns {Boolean} -Devuelve un valor booleano true si los campos son validados exitosamente
     */
    const validateFieldAddProfile = async () => {
        
        // Validación de campos
        await validateField(formDataAddProfile.value.name_profile.field);

        if(hasErrors() === false) {
            return true;
        }
        
    }

    /**
     * Cancela el agregado del perfil
     * @function
     * @name cancelAddProfile
     * @returns {undefined}
     */
    const cancelAddProfile = () => {

        //? Redirecciona a los registros de usuarios
        Router.push({ name: 'get-profiles' });

    };

    /**
     * Configura el cuerpo de datos de los permisos del perfil que se necesita para el agregado del perfil
     * @function
     * @name configPermissions
     * @returns {object} -Cuerpo de datos de los permisos
     */
    const configPermissions = async () => {

        //? Mapea los módulos dentro de las secciones
        let responseModuleMap = formDataAddProfile.value.sections.map((section,index) => {
            
            let responsePermissions = {};
            
            //? Mapea los permisos dentro de los módulos
            responsePermissions = section.modules.map((moduleSection,index) => {
                
                let permissionsModule = {};

                //? Configura los permisos del módulo
                permissionsModule[moduleSection.name_permission] = {
                    read: checkPermission(moduleSection,'read'),
                    add: checkPermission(moduleSection,'add'),
                    edit: checkPermission(moduleSection,'edit'),
                    disable: checkPermission(moduleSection,'disable'),
                }

                //? Conteo de permisos seleccionados y cambios realizados
                Object.entries(moduleSection.permissions).forEach(([namePermi,permissionType]) => {
                    
                    //? Detectar si hay permisos seleccionados
                    if(moduleSection.permissions[namePermi].select){
                        permissionsIsSelected.value += 1;
                    }

                })

                return permissionsModule;

            }).reduce((acc, obj) => {
                return { ...acc, ...obj };
            }, {});
            
            // console.log('responsePermissions:',responsePermissions);
            return responsePermissions;

        }).reduce((acc, obj) => {
            return { ...acc, ...obj };
        }, {});

        // console.log('responseModuleMap:',responseModuleMap);

        return responseModuleMap;

    }

    /**
     * Verifica y asigna el valor del permiso dependiendo los parametros de este tipo de permiso
     * @function
     * @name checkPermission
     * @param {object} permissionModule -Datos del módulo
     * @param {string} permission - Tipo de permiso a validar
     * @returns {boolean|null} - 'true' o 'false', pero si el permiso es excluido 'null'
     */
    const checkPermission = (permissionModule,permission) => {

        //? Valida si el tipo de permiso es excluido
        if(permissionModule.permissions[permission].exclude !== true ){
            return permissionModule.permissions[permission].select
        }
        else{ return null };

    }

    /**
     ** Inicializa los campos y permisos del perfil
     * @function
     * @name initialConfig
     * @returns {undefined}
     */
    const initialConfig = async () => {
        await verifyAllCheckboxValue();
    }

    /**
     * Selecciona o deselecciona todos los switches habilitados
     * @function
     * @name selectAllSwitch
     * @param {object} info - Formulario con campos, permisos y checkbox
     * @param {boolean} valueCheckbox - Valor booleano para seleccionar o no los switches
     * @param {string} permission - Tipo de permiso
     * @returns {undefined}
     */
    const selectAllSwitch = async (info,valueCheckbox,permission) => {

        //? Iteración de secciones
        await info.sections.forEach(async (section,index) => {

            //? Iteración de módulos
            await section.modules.forEach((module,index) => {
                
                //* Selecciona o deselecciona los switches habilitados
                if(module.permissions[permission].disable != true){
                    module.permissions[permission].select = valueCheckbox;
                }

            })

        })

    }

    /**
     * Selecciona o deselecciona todos los switches del permiso Visualizar
     * @function
     * @name selectAllRead
     * @param {object} info - Formulario con campos, permisos y checkbox
     * @param {boolean} valueCheckbox - Selecciona todos los switches si es 'true'
     * @returns {undefined}
     */
    const selectAllRead = async (info,valueCheckbox) => {

        if(valueCheckbox){

            //* Selecciona todos los switches del permiso Visualizar
            selectAllSwitch(info,valueCheckbox,'read')
            
            //* Habilita switch para permisos de agregar y editar
            disableSwitch(formDataAddProfile.value,'add',false);
            disableSwitch(formDataAddProfile.value,'edit',false);

            //* Selecciona o deselecciona el checkbox de la columna si se seleccionan o no todos los switches
            await verifyAllSwitchValue(formDataAddProfile.value,'read');
            await verifyAllSwitchValue(formDataAddProfile.value,'add');
            await verifyAllSwitchValue(formDataAddProfile.value,'edit');
            await verifyAllSwitchValue(formDataAddProfile.value,'disable');

            //* Habilita o deshabilita checkbox si hay switches disponibles
            verifyIndividualCheckbox('add');
            verifyIndividualCheckbox('edit');
            verifyIndividualCheckbox('disable');
        }
        else{ 
            resetAllSwitch(info,'read') 

            //* Deshabilita checkbox para permisos de agregar, editar e inhabilitar
            formDataAddProfile.value.checkbox_all.add.disable = true;
            formDataAddProfile.value.checkbox_all.edit.disable = true;
            formDataAddProfile.value.checkbox_all.disable.disable = true;
            
            //* Deselecciona los checkbox para permisos de agregar, editar e inhabilitar
            formDataAddProfile.value.checkbox_all.add.select = false;
            formDataAddProfile.value.checkbox_all.edit.select = false;
            formDataAddProfile.value.checkbox_all.disable.select = false;

            //* Deshabilita switchs para permisos de agregar, editar e inhabilitar
            disableSwitch(formDataAddProfile.value,'add',true);
            disableSwitch(formDataAddProfile.value,'edit',true);
            disableSwitch(formDataAddProfile.value,'disable',true);
        }

    }

    /**
     * Selecciona o deselecciona todos los switches del permiso Agregar
     * @function
     * @name selectAllAdd
     * @param {object} info - Formulario con campos, permisos y checkbox
     * @param {boolean} valueCheckbox - Selecciona todos los switches si es 'true'
     * @returns {undefined}
     */
    const selectAllAdd = (info,valueCheckbox) => {

        if(
            info.checkbox_all.read.select === false && 
            info.checkbox_all.add.disable
        ){

            //? Toast informativo
            ToastStore.openToast({
                title: 'Perfiles',
                message: 'No se permite otorgar el permiso de agregar sin dar el permiso de visualizar',
                type: 'info',
            })

            return
        }

        //* Selecciona todos los switches del permiso Agregar
        selectAllSwitch(info,valueCheckbox,'add')
    }

    /**
     * Selecciona o deselecciona todos los switches del permiso Editar
     * @function
     * @name selectAllEdit
     * @param {object} info - Formulario con campos, permisos y checkbox
     * @param {boolean} valueCheckbox - Selecciona todos los switches si es 'true'
     * @returns {undefined}
     */
    const selectAllEdit = async (info,valueCheckbox) => {
        
        //? Valida si el checkbox esta inhabibilitado
        if(info.checkbox_all.edit.disable){

            //? Toast informativo
            ToastStore.openToast({
                title: 'Perfiles',
                message: 'No se permite otorgar el permiso de editar sin dar el permiso de visualizar',
                type: 'info',
            })

            return
        }

        //? Valida si se selecciono el checkbox all
        if(valueCheckbox){
            
            //* Selecciona todos los switches del permiso Editar
            selectAllSwitch(info,valueCheckbox,'edit');
        }
        else{ 
            resetAllSwitch(info,'edit')
            resetAllSwitch(info,'disable')

            //* Deselecciona los checkbox para permiso de inhabilitar
            formDataAddProfile.value.checkbox_all.disable.select = false;

            //* Deshabilita checkbox para permiso inhabilitar
            formDataAddProfile.value.checkbox_all.disable.disable = true;

            disableSwitch(formDataAddProfile.value,'disable',true);
        }

        //* Configura los permisos dependientes
        verifyDisableSwitch(info);

        //* Habilita o deshabilita checkbox si hay switches disponibles
        verifyIndividualCheckbox('disable');

    }

    /**
     * Selecciona o deselecciona todos los switches del permiso Inhabilitar
     * @function
     * @name selectAllDisable
     * @param {object} info - Formulario con campos, permisos y checkbox
     * @param {boolean} valueCheckbox - Selecciona todos los switches si es 'true'
     * @returns {undefined}
     */
    const selectAllDisable = (info,valueCheckbox) => {

        //? Valida si los checkboxs estan inhabibilitados
        if(
            info.checkbox_all.edit.disable ||
            info.checkbox_all.disable.disable
        ){

            //? Toast informativo
            ToastStore.openToast({
                title: 'Perfiles',
                message: 'No se permite otorgar el permiso de inhabilitar sin dar el permiso de visualizar y editar',
                type: 'info',
            })

            return
        }

        //* Selecciona todos los switches del permiso Inhabilitar
        selectAllSwitch(info,valueCheckbox,'disable')

    }

    /**
     * Selecciona un permiso de tipo Visualizar individualmente
     * @function
     * @name selectRead
     * @param {object} moduleProfile -Datos y permisos del módulo
     * @returns {undefined}
     */
    const selectRead = async (moduleProfile) => {

        //* Validar si se selecciono el permiso de tipo Visualizar
        if(moduleProfile.permissions.read.select){
            moduleProfile.permissions.add.disable = false;
            moduleProfile.permissions.edit.disable = false;
        }
        else{
            moduleProfile.permissions.add.disable = true;
            moduleProfile.permissions.edit.disable = true;
            moduleProfile.permissions.disable.disable = true;
        }

        //* Selecciona o deselecciona el checkbox de la columan si se seleccionan o no todos los switches
        await verifyAllSwitchValue(formDataAddProfile.value,'read');
        await verifyAllSwitchValue(formDataAddProfile.value,'add');
        await verifyAllSwitchValue(formDataAddProfile.value,'edit');
        await verifyAllSwitchValue(formDataAddProfile.value,'disable');

        //* Habilita o deshabilita checkbox si hay switches disponibles
        await verifyIndividualCheckbox('add');
        await verifyIndividualCheckbox('edit');
        await verifyIndividualCheckbox('disable');


    }

    /**
     * Selecciona un permiso de tipo Agregar individualmente
     * @function
     * @name selectAdd
     * @param {object} moduleProfile -Datos y permisos del módulo
     * @returns {undefined}
     */
    const selectAdd = async (moduleProfile) => {
        
        if(
            moduleProfile.permissions.add.disable
        ){

            //? Toast informativo
            ToastStore.openToast({
                title: 'Perfiles',
                message: 'No se permite otorgar el permiso de agregar sin dar el permiso de visualizar',
                type: 'info',
            })

            return
        }

        //* Selecciona o deselecciona el checkbox de la columna si se seleccionan o no todos los switches
        await verifyAllSwitchValue(formDataAddProfile.value,'add');

    }

    /**
     * Selecciona un permiso de tipo Editar individualmente
     * @function
     * @name selectEdit
     * @param {object} moduleProfile -Datos y permisos del módulo
     * @returns {undefined}
     */
    const selectEdit = async (moduleProfile) => {

        if(
            moduleProfile.permissions.edit.disable
        ){

            //? Toast informativo
            ToastStore.openToast({
                title: 'Perfiles',
                message: 'No se permite otorgar el permiso de editar sin dar el permiso de visualizar',
                type: 'info',
            })

            return
        }

        //* Validar si se selecciono el permiso de tipo Editar
        if(moduleProfile.permissions.edit.select){
            moduleProfile.permissions.disable.disable = false;
        }
        else{
            moduleProfile.permissions.disable.disable = true;
        }
        
        //* Selecciona o deselecciona el checkbox de la columna si se seleccionan o no todos los switches
        await verifyAllSwitchValue(formDataAddProfile.value,'edit');
        await verifyAllSwitchValue(formDataAddProfile.value,'disable');

        //* Habilita o deshabilita checkbox si hay switches disponibles
        await verifyIndividualCheckbox('disable');

    }

    /**
     * Selecciona un permiso de tipo Inhabilitar individualmente
     * @function
     * @name selectDisable
     * @param {object} moduleProfile -Datos y permisos del módulo
     * @returns {undefined}
     */
    const selectDisable = async (moduleProfile) => {

        if(
            moduleProfile.permissions.disable.disable
        ){

            //? Toast informativo
            ToastStore.openToast({
                title: 'Perfiles',
                message: 'No se permite otorgar el permiso de inhabilitar sin dar el permiso de visualizar y editar',
                type: 'info',
            })

            return
        }

        //* Selecciona o deselecciona el checkbox de la columna si se seleccionan o no todos los switches
        await verifyAllSwitchValue(formDataAddProfile.value,'disable');

    }

    /**
     * Habilita los switches del permiso secundario cuando el permiso principal fue seleccionado
     * @function
     * @name verifyDisableSwitch
     * @param {object} info - Formulario con campos, permisos y checkbox
     * @param {string} permissionMain - Permiso principal
     * @param {string} permissionSecondary - Permiso secundario que depende del permiso principal
     * @returns {undefined}
     */
    const verifyDisableSwitch = async (info) => {

        //* Iteración de secciones
        info.sections.forEach((section,index) => {

            //* Iteración de módulos de la sección
            section.modules.forEach((module,index) => {
                
                if(module.permissions.edit.select){
                    module.permissions.disable.disable = false;
                }
                else{
                    module.permissions.disable.disable = true;
                }
            });
            
        });

    }

    /**
     * Inicializa los checkboxs y switches
     * @function
     * @name verifyAllCheckboxValue
     * @returns {undefined}
     */
    const verifyAllCheckboxValue = async () => {

        //* Validar el permiso lectura
        if(formDataAddProfile.value.checkbox_all.read.select){

            //* Habilita checkbox para permisos de agregar y editar
            formDataAddProfile.value.checkbox_all.add.disable = false;
            formDataAddProfile.value.checkbox_all.edit.disable = false;
            
            //* Habilita switch para permisos de agregar y editar
            disableSwitch(formDataAddProfile.value,'add',false);
            disableSwitch(formDataAddProfile.value,'edit',false);
        }
        else{
            //* Deshabilita checkbox para permisos de agregar, editar e inhabilitar
            formDataAddProfile.value.checkbox_all.add.disable = true;
            formDataAddProfile.value.checkbox_all.edit.disable = true;
            formDataAddProfile.value.checkbox_all.disable.disable = true;
            
            //* Deselecciona los checkbox para permisos de agregar, editar e inhabilitar
            formDataAddProfile.value.checkbox_all.add.select = false;
            formDataAddProfile.value.checkbox_all.edit.select = false;
            formDataAddProfile.value.checkbox_all.disable.select = false;

            //* Deshabilita switchs para permisos de agregar, editar e inhabilitar
            await disableSwitch(formDataAddProfile.value,'add',true);
            await disableSwitch(formDataAddProfile.value,'edit',true);
            await disableSwitch(formDataAddProfile.value,'disable',true);
        }

        //* Validar el permiso Inhabilitar
        if(
            // formDataAddProfile.value.checkbox_all.read.select &&
            // formDataAddProfile.value.checkbox_all.edit.select 
            formDataAddProfile.value.checkbox_all.edit.select
        )
        {

            //* Habilita checkbox para permisos de inhabilitar
            formDataAddProfile.value.checkbox_all.disable.disable = false;

            //* Habilita switch para permisos de inhabilitar
            disableSwitch(formDataAddProfile.value,'disable',false);

        }
        else{
            //* Deshabilita checkbox para permisos de inhabilitar
            formDataAddProfile.value.checkbox_all.disable.disable = true;

            //* Deselecciona checkbox para permisos inhabilitar
            formDataAddProfile.value.checkbox_all.disable.select = false;

            disableSwitch(formDataAddProfile.value,'disable',true);
        }

    }

    /**
     ** Habilita o deshabilita checkbox si hay switches disponibles de un tipo de permiso especifico
     * @function
     * @name verifyIndividualCheckbox
     * @param {string} permission - Tipo de permiso
     * @returns {undefined}
     */
    const verifyIndividualCheckbox = async (permission) => {

        let sectionCheck = [];

        for(const i in formDataAddProfile.value.sections){
            // Respuesta
            sectionCheck[i] = await formDataAddProfile.value.sections[i].modules.some((module,index) => 
                module.permissions[permission]?.disable === false && // HABILITADOS
                module.permissions[permission]?.exclude != true && // NO EXCLUIDOS
                module.permissions[permission]?.unique != true // UNICOS QUE NO DEPENDAN DEL CHECKBOX
            );
        }
        // console.log(`sectionCheck ${permission}:`,sectionCheck);
        let responseAllSections = await sectionCheck.some((section) => section === true);
        
        // SI HAY SWITCHES HABILITADOS
        if(responseAllSections) formDataAddProfile.value.checkbox_all[permission].disable = false;
        else {
            formDataAddProfile.value.checkbox_all[permission].disable = true;
            formDataAddProfile.value.checkbox_all[permission].select = false;
        }
        
    }
    
    /**
     ** Selecciona o deselecciona el checkbox de la columna si se seleccionan o no todos los switches
     * @function
     * @name verifyAllSwitchValue
     * @param {object} formData - Formulario con campos, permisos y checkbox
     * @param {string} permission - Tipo de permiso
     * @returns {object} - Devuelve 'true' si todos los switches fueron seleccionados
     */
    const verifyAllSwitchValue = async (formData,permission) => {

        let sectionCheck = [];

        for(const i in formData.sections){

            /*
                ITERA CADA MODULO Y ALMACENA TRUE O FALSE POR SECCIÓN
                CASO TRUE(Si hay algun switch disponible para selección): 
                    1 - Si el switch no es seleccionado
                    2 - Si el switch es excluido
                    3 - Si el switch no esta deshabilitado
                CASO FALSE(Si hay algun switch seleccionado): 
                    1 - 
            */
            sectionCheck[i] = await formData.sections[i].modules.some((module,index) => 
                module.permissions[permission]?.select === false && // NO SELECCIONADO
                module.permissions[permission]?.exclude != true && // NO EXCLUIDO
                module.permissions[permission]?.disable === false // HABILITADO
            );

        }
        
        let responseAllSections = await sectionCheck.every((section) => section === false);
        
        //* Habilita el checkbox 
        if(responseAllSections) {
            formData.checkbox_all[permission].select = true;
            formData.checkbox_all[permission].disable = false;  
        }
        else{
            formData.checkbox_all[permission].select = false;
        }
        return responseAllSections;

    }

    /**
     ** Deselecciona todos los switches por tipo de permiso
     * @function
     * @name resetAllSwitch
     * @param {object} info - Formulario con campos, permisos y checkbox
     * @param {string} permissionColumn - Tipo de permiso
     * @returns {undefined}
     */
    const resetAllSwitch = (info,permissionColumn) => {

        //* Iteración de secciones
        info.sections.forEach((section,index) => {

            //* Iteración de módulos de la sección
            section.modules.forEach((module,index) => {
                
                module.permissions[permissionColumn].select = false;
            });
            
        });

    }

    /**
     ** Habilita o deshabilita switch para permisos especificos (TAMBIEN SE DESELECCIONAN AL DESHABILITAR)
     * @function
     * @name disableSwitch
     * @param {object} info - Formulario con campos, permisos y checkbox
     * @param {string} permissionColumn - Permiso principal
     * @param {string} value - Permiso secundario que depende del permiso principal
     * @returns {undefined}
     */
    const disableSwitch = (info,permissionColumn,value) => {

        //* Iteración de secciones
        info.sections.forEach((section,index) => {

            //* Iteración de módulos de la sección
            section.modules.forEach((module,index) => {

                // if(module.permissions[permissionColumn].unique === true){
                //     module.permissions[permissionColumn].disable = false;
                // }
                // else{
                    module.permissions[permissionColumn].disable = value;
                // }
            });
            
        });

    }

    return {
        //* PROPERTIES
        formDataAddProfile,
        schemeErrors,
        
        //* METHODS
        validateField,
        hasError,
        hasErrors,
        getErrorMessage,
        resetGetErrorMessage,

        initialConfig,
        selectAllRead,
        selectAllAdd,
        selectAllEdit,
        selectAllDisable,

        selectRead,
        selectAdd,
        selectEdit,
        selectDisable,

        cancelAddProfile,
        formSubmitAddProfile,
    }

}