//* Importaciones
import { ref } from 'vue';

export const useSidebarValidation = () => {

    //* Properties

    //* Methods

    const verifyModuleVisibility = (route: any) => {

        if(route?.meta?.isShow === false) return false

        // Verifica si tiene módulos a mostrar
        if(route?.children?.length > 0){
            return route?.children?.some((child: any) => child.meta.isShow === true);
        }

        return true
    }

    return {
        //* Properties
        
        //* Methods
        verifyModuleVisibility,
    }

}