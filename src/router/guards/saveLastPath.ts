import { useTabStore } from "@/shared/components/tabs/stores/useTabStore";

export const saveLastPath = (router: any) => {
    const TabStore = useTabStore();

    //? 1. GESTIÓN DEL BOTÓN ATRÁS (POPSTATE)
    window.addEventListener('popstate', (event) => {
        TabStore.isPopState = true;
        const currentTab = TabStore.layoutSelected;

        if (currentTab?.tabHistory?.length > 0) {
            const previousPath = currentTab.tabHistory.pop();
            
            if (previousPath) {
                router.replace({ 
                    path: previousPath, 
                    query: { tabId: currentTab.id } 
                }).finally(() => {
                    TabStore.isPopState = false;
                });
                return;
            }
        }
        
        TabStore.isPopState = false;
    });

    //? 2. GUARDIA DE NAVEGACIÓN
    router.beforeEach((to: any, from: any, next: any) => {

        // TODO: Controlar el despliegue de la pestaña de inicio
        // if(TabStore.openComponents.length === 0) {
        //     TabStore.openTabByNameUniversal('websocket-public');
        //     return next();
        // };

        //* Si es una navegación provocada por el botón atrás, ignoramos la lógica de registro
        if (TabStore.isPopState) {
            return next();
        }

        //* Obtiene los ID de la ruta actual(from) y la nueva(to)
        const toTabId = to.query.tabId;
        const fromTabId = from.query.tabId;

        //* Caso A: Navegación interna (dentro de la misma pestaña)
        if (toTabId && fromTabId && toTabId === fromTabId) {
            TabStore.pushToTabHistory(toTabId, from.fullPath);
            
            //* Actualizamos la última ruta conocida de la pestaña
            const tab = TabStore.openComponents.find((t: any) => t.id === toTabId);
            if (tab) tab.lastFullPath = to.fullPath;
            
            return next();
        }

        //* Caso B: Si intentamos navegar a una ruta sin tabId pero venimos de una con tabId
        //* (Forzamos a que la nueva ruta se abra dentro de la pestaña actual)
        if (!toTabId && fromTabId) {
            return next({
                ...to,
                query: { ...to.query, tabId: fromTabId }
            });
        }

        next();
    });

    //? 3. ACTUALIZACIÓN POST-NAVEGACIÓN
    router.afterEach((to: any) => {
        const tab = TabStore.openComponents.find((t: any) => t.id === to.query.tabId);
        if (tab) {
            tab.lastFullPath = to.fullPath;
            TabStore.layoutSelected = tab;
        }
    });
};