//* Importaciones
import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useRouter, useRoute } from 'vue-router';
import { TYPE_CLOSE_TABS } from '../constants/data-type-close.ts';
import { useTabs } from '@/shared/components/tabs/composables/useTabs.ts';
import { useDragTabs } from '@/shared/components/tabs/composables/useDragTabs.ts';
import { useValidateTabs } from '@/shared/components/tabs/composables/useValidateTabs.ts';

export const useTabStore = defineStore('Tabs',() => {

    //? Instancia del enrutador
    const router = useRouter();
    const route = useRoute();

    //? Desestructuraciones de Composables
    const { 
        //* Methods
        validateTabs
    } = useValidateTabs();

    //* STATES

    /**
     * -Almacena la pestaña seleccionada
     */
    let layoutSelected = ref<any>({});

    /**
     * -Almacena los componentes de las pestañas abiertas
     */
    let openComponents = ref<any>([]);

    /**
     * -Almacena los componentes de las pestañas fijas
     */
    let openFixedComponents = ref<any>([]);

    /**
     * -Almacena los componentes de las pestañas ocultas
     */
    let hiddenComponents = ref<any>([]);

    /**
     * -Controla el despliegue de la confirmación para cerrar pestañas ocultas
     */
    let isOpenCloseHiddenModal = ref(false);

    let isFirstLoad = true;

    let isPopState = ref(false);
    // let tabHistory = ref<any>([]);

    //? Desestructuraciones de Composables
    const { 
        //* Properties
        isShowTabHidden,

        //* Methods
        openTabHidden,
        handleDisplaceTabs,
    } = useTabs(openComponents, hiddenComponents);

    // Desestructuraciones de Composables
    const { 
        //* Methods
        dragStart,
        dragEnd,
        dragOver,
        dragLeave,
        dragExit,
        drop,
    } = useDragTabs(openComponents);

    //* ACTIONS

    // TODO: Integrar funcionalidades globales para las pestañas
    /**
     * 1 - Separar el drag and drop
     * 2 - Manejador de abertura de pestañas
     */

    /**
     * NOTE: Funcion para abrir modal
     * Controla el despliegue de la confirmación para cerrar pestañas ocultas
     */
    const openConfirmCloseHidden = () => {
        isOpenCloseHiddenModal.value = true;
    }

    /**
     * NOTE: Funcion del modal para cerrar las pestañas
     * Cierra todas las pestañas ocultas
     */
    const closeAllHiddenTabs = () => {
        hiddenComponents.value = [];
        isOpenCloseHiddenModal.value = false;
    }
    
    /**
     * Cierra todas las pestañas abiertas, ocultar e incluso la seleccionada
     * @function
     * @name closeAllTabs
     * @returns {undefined}
     */
    const closeAllTabs = () => {
        openComponents.value = [];
        hiddenComponents.value = [];
        // layout.value = null;
        // propsLayout.value = null;
        console.log('closeAllTabs');
        router.replace({name: 'dashboard' });
    }

    const closeTabsHiddenAll = async (type_close: any) => {

        if(TYPE_CLOSE_TABS.all === type_close){
            await closeAllTabs();
        }
        else if(TYPE_CLOSE_TABS.hidden === type_close){
            await closeAllHiddenTabs();
        }

    }
    
    /**
     * TODO: Falta refactorizar la manera de manejar las rutas, vistas o componentes de pestañas
     * Devuelve la clase con el estilo respectivo para las tabs si se selecciono la visualización de un componente
     */
    const colorTab = (route: any) => {
        
        let classAsigned = '';

        if(layoutSelected.value?.id === route.id){
            
            classAsigned = 'tabs-selected';

            return [classAsigned,true];
        }
        else{

            classAsigned = 'tabs';

            return [classAsigned,false];
        }

    }
    
    /**
     * NOTE: Deprecado
     * Se manejara una forma diferente de mostrar las pestañas ocultas de acuerdo al enrutador
     */
    const handleLayoutHidden = async (routeView: any) => {

        //? Busca la pestaña oculta seleccionada 
        let tabSelected = await hiddenComponents.value.find((tab: any) => tab.id === routeView.id);

        //? Elimina la pestaña oculta
        hiddenComponents.value = await hiddenComponents.value.filter((tab: any) => tab.id != routeView.id);

        //? Agrega la pestaña oculta a las abiertas
        await openComponents.value.unshift(tabSelected);

        //? Actualiza la pestaña seleccionada
        layoutSelected.value = routeView;

        //? Redirige a la pestaña
        router.replace(
            {
                path: routeView.lastFullPath ?? routeView.path,
                // params: routeView.params,
                query: { tabId: routeView.id },
            }
        );

        await handleDisplaceTabs();
    }

    /**
     * NOTE: Deprecado
     * Se manejara una forma diferente de mostrar las pestañas ocultas de acuerdo al enrutador
     */
    const handleLayout = (routeView: any) => {

        console.log('routeView:', routeView);

        console.log('layoutSelected.value:', layoutSelected.value);

        layoutSelected.value = routeView;

        console.log('layoutSelected.value:', layoutSelected.value);

        router.replace(
            {
                path: routeView.lastFullPath ?? routeView.path,
                // params: routeView.params,
                query: { tabId: routeView.id },
            }
        );

    }

    const handleBreadcrumbLayout = (routeView: any) => {

        console.log('routeView:', routeView);
        console.log('routeView.id:', routeView.id);
        if(routeView.meta?.isBreadcrumb?.isSelected && (layoutSelected.value?.name != routeView.name)){
            console.log('entro' );
            console.log('layoutSelected.value:',layoutSelected.value);
            console.log('openComponents.value:', openComponents.value);
            router.replace(
                {
                    name: routeView.name,
                    // params: routeView.params,
                    // query: { tabId: routeView.id },
                }
            );
        }
        console.log('routeView:', routeView);
    }

    /**
     * Controla el despliegue de las pestañas que se repiten
     */
    const handleLayoutRepeat = async (name: any) => {

        //? Almacena todas las rutas
        let totalRoutes = [...openComponents.value, ...hiddenComponents.value];
        
        //? Busca la pestaña
        let moduleFind = await totalRoutes.find((route) => route.name == name);
        
        //? Verifica si la pestaña esta oculta
        let isHiddenTab = await hiddenComponents.value.some((route: any) => route.name == name);

        if(moduleFind){
            console.log('moduleFind:',moduleFind);

            //? Verifica si la pestaña esta oculta para desplazarla a las abiertas
            if(isHiddenTab) {
                await handleLayoutHidden(moduleFind);
            }

            return {...moduleFind};
        }

    }

    const handleLayoutRepeatFixed = async (name: any) => {

        //? Almacena todas las rutas
        let totalRoutes = [...openFixedComponents.value];
        
        //? Busca la pestaña
        let moduleFind = await totalRoutes.find((route) => route.name == name);
        
        // ? Verifica si la pestaña esta oculta
        // let isHiddenTab = await hiddenComponents.value.some((route: any) => route.name == name);

        if(moduleFind){
            console.log('moduleFind:',moduleFind);

            //? Verifica si la pestaña esta oculta para desplazarla a las abiertas
            // if(isHiddenTab) {
            //     await handleLayoutHidden(moduleFind);
            // }

            return {...moduleFind};
        }

    }

    // TODO: Verificar si sera necesario integrar un handler para abrir Supermodules, modules and submodules

    /**
     * NOTE: Deprecado
     * Se manejara una forma diferente de mostrar las pestañas ocultas de acuerdo al enrutador
     */
    const openTab = async (route: any) => {

        try{
            // console.log('openComponents:',openComponents.value);
            // console.log('hiddenComponents:',hiddenComponents.value);
            // console.log('route:',route);

            /**
             // TODO: Validar lo necesario para desplegar la pestaña
             * 1- Permisos.
             */

            let validateRoute = await validateTabs(route);

            if(!validateRoute) return;

            let tabId = generateTabId();
            let tabNumberRepeat;
            let routeViewRepeat;
            let configTab = {
                id: tabId,
                title: route.meta.title,
                name: route.name,
                path: route.path,
                tabHistory: [],
                isAlwaysOpen: route.meta?.isAlwaysOpen || false,
                // lastFullPath: router.resolve(route).fullPath,
                // params: { id: tabId },
            };

            //? Verificar si la pestaña es fija
            if(route.meta?.isAlwaysOpen){

                //? Verificar si la pestaña se repite
                if(!route.meta.isRepeat){
                    
                    //? Verificar si la pestaña se repite
                    tabNumberRepeat = [...openFixedComponents.value].filter((tab: any) => route.name === tab.name);

                    //? Busca la ruta repetida
                    routeViewRepeat = await tabNumberRepeat.find((tab: any) => tab.name === route.name);

                    // let routeViewRepeat = await componentsRepeat.value.hasOwnProperty(route.name);
                    // console.log('routeViewRepeat:',routeViewRepeat);
                    //? Verificar si se encontro la pestaña
                    if(routeViewRepeat){
                        layoutSelected.value = await handleLayoutRepeatFixed(route.name);
            
                        //? Redirige a la ruta seleccionada
                        router.replace(
                            {
                                name: layoutSelected.value.name,
                                // query: route.meta.isRepeat ? { tabId: configTab.id } : {},
                                query: { tabId: configTab.id },
                            }
                        );
                        return
                    }
                }

                layoutSelected.value = configTab;
                await openFixedComponents.value.unshift(configTab);

                //? Redirige a la ruta seleccionada
                router.replace(
                    {
                        name: configTab.name,
                        // query: route.meta.isRepeat ? { tabId: configTab.id } : {},
                        query: { tabId: configTab.id },
                    }
                );
                console.log('entro')

                await handleDisplaceTabs();

                return
            }

            //? Verificar si la pestaña se repite
            if(!route.meta.isRepeat){
                
                //? Verificar si la pestaña se repite
                tabNumberRepeat = [...openComponents.value,...hiddenComponents.value].filter((tab: any) => route.name === tab.name);

                //? Busca la ruta repetida
                routeViewRepeat = await tabNumberRepeat.find((tab: any) => tab.name === route.name);

                // let routeViewRepeat = await componentsRepeat.value.hasOwnProperty(route.name);
                // console.log('routeViewRepeat:',routeViewRepeat);
                //? Verificar si se encontro la pestaña
                if(routeViewRepeat){
                    layoutSelected.value = await handleLayoutRepeat(route.name);
        
                    //? Redirige a la ruta seleccionada
                    router.replace(
                        {
                            name: layoutSelected.value.name,
                            // query: route.meta.isRepeat ? { tabId: configTab.id } : {},
                            query: { tabId: configTab.id },
                        }
                    );
                    return
                }
            }

            //? Verificar y asignar el contador de las pestañas repetidas
            // console.log('componentsRepeat.value:',componentsRepeat.value);
            // componentsRepeat.value.hasOwnProperty(route.name) ? componentsRepeat.value[route.name]++ : componentsRepeat.value[route.name] = 0;
            tabNumberRepeat = [...openComponents.value,...hiddenComponents.value].filter((tab: any) => route.name === tab.name);

            //? Verificar y asignar el contador de las pestañas repetidas
            // componentsRepeat.value[route.name] >  0 
            // ? configTab.title = configTab.title + ' (' + componentsRepeat.value[route.name] + ')' 
            // : '';
            tabNumberRepeat.length > 0 ? configTab.title = configTab.title + ' (' + tabNumberRepeat.length + ')' : '';


            // console.log('configTab:',configTab);
            //? Verificar si hay pestañas fijas
            // let fixedTabs = openComponents.value.filter((tab: any) => tab.isAlwaysOpen);
            // console.log('fixedTabs:',fixedTabs)

            //? Almacena la ruta de la pestaña enfocada
            layoutSelected.value = configTab;

            // if(fixedTabs.length > 0){
            //     await openComponents.value.splice(fixedTabs.length, 0, configTab);
            // }
            // else{
                //? Almacena la ruta de la pestaña abierta
                await openComponents.value.unshift(configTab);
            // }
            // console.log('openComponents:',openComponents.value);

            //? Redirige a la ruta seleccionada
            router.replace(
                {
                    name: configTab.name,
                    // query: route.meta.isRepeat ? { tabId: configTab.id } : {},
                    query: { tabId: configTab.id },
                }
            );
            /**
             * NOTE:
             * 1- Verificar si sera una pestaña individual NOTE: Listo
             * 2- Verificar si sera una pestaña multiple(repeatModule)(tabs) NOTE: Listo
             *! 3- Verificar si se pasaran props
             *! 4- Verificar que la ruta tenga nombre del permiso, nombre de ruta 
             *! 5- Verificar que tenga un parametro para controlar todos los permisos
             * 6- Verificar si tendra propiedad para controlar la visibilidad del sidebar NOTE: Listo
             * 7- Verificar que el número de pestaña no se repita
             */

            await handleDisplaceTabs();
        }
        catch (error) {
            // console.log('error:',error);
        }

    }

    // TODO: Verificar si sera necesario integrar un handler para abrir Supermodules, modules and submodules

    // CRÍTICO: Se ejecuta DESPUÉS de una navegación exitosa para guardar el destino.
    router.afterEach((to) => {
        if(to.meta?.isAlwaysOpen) return;

        const tabId = to.query.tabId as string;
        const tabToUpdate = openComponents.value.find((tab: any) => tab.id === tabId); 

        if (tabToUpdate) {
            // Guarda la URL completa (incluye sub-ruta, params y queries)
            tabToUpdate.lastFullPath = to.fullPath;
        }
    });

    // TODO: Seguir con el almacenamiento de las rutas
    // const pushToHistory = (id_tab: any, path: any) => {

    //     // tab
    // }

    // const repeatModule = async (route: any, configTab: any) => {

    //     let tabNumberRepeat;

    //     // Verificar si la pestaña se repite
    //     if(route.meta.isRepeat){
    //         tabNumberRepeat = await openComponents.value.filter((tab: any) => route.name === tab.name);
    //         tabNumberRepeat.length > 0 ? configTab.title = configTab.title + ' (' + tabNumberRepeat.length + ')' : '';
    //     }
    //     else{
    //         let routeViewRepeat = await openComponents.value.find((tab: any) => route.name === tab.name);
    //         if(routeViewRepeat){
    //             layoutSelected.value = routeViewRepeat;
    //             // console.log('layoutSelected:',layoutSelected.value);
    //             return
    //         }
    //     }
    // }

    // const currentTabKey = computed(() => {
    //     // Encuentra la pestaña activa en tu store, buscando por el nombre de la ruta y un identificador único
    //     const activeTab = openComponents.value.find(( tab: any ) => tab.name === route.name && tab.id === route.query.tabId); // <-- Usar route.query
        
    //     // Usa el 'id' de la pestaña como clave, o el `fullPath` como fallback
    //     return activeTab ? activeTab.id : route.fullPath;
    // });

    // const cacheTabKey = computed(() => {
    //     return openComponents.value.map((tab: any) => tab.name);
    // })

    // TODO: Controlar las pestañas y sus estados con localStorage(vueCookies)
    const saveToStorage = () => {
        let data = {
            openComponents: openComponents.value,
            currentTabId: layoutSelected.value?.id,
            // NOTE: Definir los estados
        }
        localStorage.setItem('tabs-state', JSON.stringify(data));
    }

    const initializeFromStorage = () => {

        const storedOpenComponents = localStorage.getItem('tabs-state')
        if (storedOpenComponents) {
            openComponents.value = JSON.parse(storedOpenComponents)
        }

    }

    // Generar ID único para la pestaña
    const generateTabId = () => {
        return `tab-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    }
    
    /**
     * NOTE: Deprecado
     * Se manejara una forma diferente de mostrar las pestañas ocultas de acuerdo al enrutador
     */
    const closeTab = async (routesVisible: any, index: number) => {
        // console.log('routesVisible:', routesVisible);
        // console.log('layoutSelected:',layoutSelected.value);

        let routesTemp;

        /**
         * NOTE: 
         * 1 - Cerrar la pestaña visible. ✅
         * 2 - Validar si la pestaña actual es la que se cierra. ✅
         *   + Si la pestaña actual es la que se cierra, y no hay mas visibles redirigir a la raiz. ✅
         *   + Si la pestaña actual es la que se cierra, se debe desplazar a otra pestaña visible. ✅
         */

        
        console.log('openComponents.value.length:',openComponents.value.length);
        
        //? Si hay más de una pestaña abierta
        if(openComponents.value.length > 0){

            //? Cerrar la pestaña visible (ID)
            openComponents.value = await openComponents.value.filter((tab: any) => routesVisible.id != tab.id);
        
            //? Validar si la pestaña actual es la que se cierra
            if(layoutSelected.value?.id === routesVisible.id){
                
                //? Mostrar el que se encuentra en la posición actual
                routesTemp = openComponents.value[index];
                
                //? Si no existe mostrar uno anterior
                if(!routesTemp) routesTemp = openComponents.value[index - 1];

                //? Si no existe ninguna pestaña 
                if(!routesTemp) {
                    layoutSelected.value = null;
                    return router.replace({ name: 'dashboard' }); // TODO: Redirigir a la raiz
                };

                //? Seleccionar la nueva pestaña
                layoutSelected.value = {...routesTemp};

                console.log('routesVisible:',routesVisible);
                //? Redirigir a la nueva pestaña
                router.replace({ 
                    // name: routesTemp.name,
                    path: routesTemp.lastFullPath ?? routesTemp.path,
                    query: { tabId: routesTemp.id },
                });

            }
            // //? Si la pestaña actual no es la que se cierra
            // else{
            //     // TODO: Verificar que hacer cuando cierra pestañas que no sean seleccionadas
            // }

        }

        // TODO: Implementar el cerrado de las pestañas visibles y desplazamiento de pestañas
        await handleDisplaceTabs();
    }

    /**
     * NOTE: Deprecado
     * Se manejara una forma diferente de mostrar las pestañas ocultas de acuerdo al enrutador
     */
    const closeTabHidden = async (routesHidden: any) => {
        console.log('routesHidden:', routesHidden);
        
        hiddenComponents.value = await hiddenComponents.value.filter((tab: any) => routesHidden.id != tab.id);

        // TODO: Implementar el cerrado de las pestañas ocultas y desplazamiento de pestañas
        await handleDisplaceTabs();

    }

    return {
        //* STATES
        openComponents,
        openFixedComponents,
        hiddenComponents,
        isShowTabHidden,
        isOpenCloseHiddenModal,
        // currentTabKey,
        // cacheTabKey,
        layoutSelected,
        isFirstLoad,
        route,
        router,
        isPopState,
        // tabHistory,

        //* ACTIONS
        openTabHidden,
        openConfirmCloseHidden,
        closeTabsHiddenAll,
        handleLayout,
        handleLayoutHidden,
        handleDisplaceTabs,
        handleBreadcrumbLayout,
        colorTab,
        openTab,
        closeTab,
        closeTabHidden,

        dragStart,
        dragEnd,
        dragOver,
        dragLeave,
        dragExit,
        drop,
    }
})