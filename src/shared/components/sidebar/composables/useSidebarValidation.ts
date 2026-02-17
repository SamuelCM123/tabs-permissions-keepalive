//* Importaciones
import { ref } from 'vue';

export const useSidebarValidation = () => {

    //* Properties

    //* Methods

    const verifyModuleVisibility = (route: any) => {

        //? Verificar los permisos de los módulos
        // console.log('route:',route);
        
        if(route?.meta?.isShow) return true

        // Verifica si tiene módulos a mostrar
        if(!route?.meta?.isShow){
            if(route?.children?.length > 0){
                return route?.children?.some((child: any) => child.meta.isShow === true);
            }
        }

        return false
    }

    const verifyActionVisibility = (route: any) => {
        return route?.children?.some((child: any) => child.meta.isShow === true);
    }

    return {
        //* Properties
        
        //* Methods
        verifyModuleVisibility,
        verifyActionVisibility,
    }

}