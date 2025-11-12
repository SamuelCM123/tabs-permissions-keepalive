import { useTabStore } from '@/shared/components/tabs/stores/useTabStore.ts';

let firstLoad = true;

/**
 * @function
 * @name redirectTabs
 * @param {Object} router - Objeto del router de Vue.js.
 * @returns {void}
 */
export const redirectTabs = ( router: any ) => {

    router.beforeEach( async (to:any,from:any,next:any) => {
        
        // console.log('firstLoad:',firstLoad);
    
        const TabStore = useTabStore();

        // TODO: Despliega una pestaña de inicio
        if(firstLoad) {

            let isDashboard = await to.matched.some((route:any) => route.name === 'dashboard');
            if(isDashboard && to.name !== 'dashboard') {
                console.log('to:',to)
                TabStore.openTab(to);
                firstLoad = false;
            }
            
        }

        if(!to.meta?.isAlwaysOpen) {
            if(TabStore.openComponents.length === 0 && to.name !== 'dashboard') {
            // if(to.name !== 'dashboard') {
                return next({ name: 'dashboard' });
            }
        }
        
        next();
    });

}