import { useAuthStore } from '@/shared/stores/auth/useAuthStore.ts';

/**
 * @function
 * @name permissions
 * @param {Object} router - Objeto del router de Vue.js.
 * @returns {void}
 */
export const permissions = ( to: any,from: any,next: any ) => {

    // console.log('to:',to);
    // console.log('from:',from);
    //? Asignaciones de Stores
    const AuthStore = useAuthStore();

    //? Validar que tenga permisos definidos
    if(!to.meta?.permissions) return next();

    //? Obtener los permisos configurados del usuario
    let hasPermission = AuthStore.validatePermissions(to);

    //? Validar si el usuario tiene permiso para ingresar a la ruta
    if(hasPermission){
        
        // NOTE: Tiene permiso
        return next();
        
    }

    //? Si no tiene permiso, redirige a la página anterior manteniendo el tabId
    if (from.query.tabId) {

        //? Busca si ya existe una pestaña abierta con el tabId de la RUTA DE DESTINO ('to')
        // let openTab = TabStore.openComponents.find((tab: any) => tab.id === to.query.tabId);

        // if(openTab) {
        return next({ 
            name: from.name,
            params: {...from.params}, // Mantiene cualquier parámetro de ruta (si existe)
            query: { 
                ...from.query, // Mantiene cualquier otro query param
                tabId: from.query.tabId // <-- ¡Aquí está la clave!
            } 
        });
            
        // }
    }
    
    next();

}