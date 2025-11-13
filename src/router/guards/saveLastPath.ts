import { useTabStore } from "@/shared/components/tabs/stores/useTabStore.ts";

/**
 * @function
 * @name saveLastPath
 * @param {Object} router - Objeto del router de Vue.js.
 * @returns {void}
 */
export const saveLastPath = ( router: any ) => {

    const TabStore = useTabStore();

    //? 1. REGISTRO DEL OYENTE POPSTATE (Lógica de POP)
    //? Se ejecuta una sola vez al cargar la aplicación para gestionar el botón "Atrás".
    window.addEventListener('popstate', (event) => {
        
        //? 1.1. Establecer la bandera: Esto detendrá la lógica de PUSH en el beforeEach
        TabStore.isPopState = true;
        // console.log('--- POPSTATE EVENT DETECTED (BACK/FORWARD) ---');
        // console.log('event:', event);
        
        //? Asumiendo que TabStore.layoutSelected es la pestaña que estaba activa ANTES del back
        const currentTab = TabStore.layoutSelected; 
        // console.log('currentTab:', currentTab);
        // console.log('openComponents:', TabStore.openComponents);
        
        //? 1.2. Lógica para retroceder en el historial interno de la pestaña
        if (currentTab && currentTab.tabHistory && currentTab.tabHistory.length > 0) {
            
            //? Obtener y remover la ruta anterior de la pila interna
            const previousPath = currentTab.tabHistory.pop(); 
            
            if (previousPath) {
                //? Forzar la navegación a la ruta anterior, manteniendo el tabId de la pestaña actual.
                //? Usamos 'replace' para no agregar una entrada al historial global.
                router.replace({ 
                    path: previousPath, 
                    query: { tabId: currentTab.id } 
                })
                .catch(() => {
                    // console.error('Error al navegar al historial interno de la pestaña.');
                    //? Redirige al dashboard de la pestaña si el path falla
                    router.replace({ name: 'dashboard', query: { tabId: currentTab.id } });
                });
                TabStore.isPopState = false; 
                return;
            }
        }
        
        //? Si no hay historial interno o lógica de pestañas, el popstate 
        //? continúa automáticamente con la URL que el navegador ya cargó.
        router.replace({ path: currentTab?.lastFullPath ?? currentTab?.path, query: { tabId: currentTab.id } });
        TabStore.isPopState = false; 
        return 
    });

    router.beforeEach((to: any, from: any, next: any) => {
    
        // console.log('to:', to);
        // console.log('from:', from);
        
        //? 2.1. Bloqueo y Reseteo: Si es un popstate, evita la lógica de PUSH/reutilización.
        if (TabStore.isPopState) {
            //? Se resetea la bandera para la siguiente navegación normal
            // TabStore.isPopState = false; // TODO: Pendiente verificar si se elimina
            //? Permite que el popstate avance
            next(); 
            return;
        }

        if (TabStore.openComponents.length === 0) {
            next();
            return;
        }

        //? Busca si ya existe una pestaña abierta con el tabId de la RUTA DE DESTINO ('to')
        let openTab = TabStore.openComponents.find((tab: any) => tab.id === to.query.tabId);
        // console.log('openTab:',openTab);
        //? Verifica que sea una pestaña nueva / existente (navegación normal)
        if (openTab) {
            // console.log('true');
            //? La pestaña de destino existe, permite la navegación.
            next();


            /**
             *? NOTE: Siempre entrara en esta condición porque tiene el mismo ID al navegar sobre la misma pestaña ya que existe el componente
             * 1- c
             */

            return;
        }
        //? Cambia la vista en la misma pestaña (reutilización)
        else {
            // console.log('false');
            
            /**
             *? 1 - Asignar el query param de la pestaña ACTUAL ('from.query.tabId') 
             *? a la nueva ruta de DESTINO ('to').
             *? Esto fuerza a la nueva ruta a abrirse "dentro" de la pestaña existente.
             */
            
            //? Verificamos que tengamos un tabId en la ruta "from" para asignar
            if (from.query.tabId) {

                // TODO: Almacena el historial de la pestaña
                let sameTab = TabStore.openComponents.find((tab: any) => tab.id === from.query.tabId);

                sameTab.tabHistory.push(from.fullPath);

                // TODO: Seccionar codigo en otros guards

                //? Controlar cuando se navega a la misma vista de la pestaña
                if(from.name === to.name) {
                    next({ 
                        name: to.name,
                        params: {...from.params}, // Mantiene cualquier parámetro de ruta (si existe)
                        query: { 
                            ...to.query, // Mantiene cualquier otro query param
                            tabId: from.query.tabId // <-- ¡Aquí está la clave!
                        } 
                    });
                    return;
                }

                //? Creamos el objeto de destino, reutilizando el 'tabId' de la pestaña actual ('from')
                next({ 
                    name: to.name, 
                    params: to.params, // Mantiene cualquier parámetro de ruta (si existe)
                    query: { 
                        ...to.query, // Mantiene cualquier otro query param
                        tabId: from.query.tabId // <-- ¡Aquí está la clave!
                    } 
                });
                return;
            } 
            //? Si 'from' no tiene un 'tabId', no hay una pestaña para reutilizar.
            //? Se cae al 'next()' por defecto.
        }

        //? Si ninguna de las condiciones anteriores se cumplió (p. ej., es la primera navegación,
        //? o no se encontró el tabId y no había un tabId previo para reutilizar), 
        //? se permite la navegación por defecto.
        next();
    });
}