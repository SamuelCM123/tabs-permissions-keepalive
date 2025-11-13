//* Importaciones
import { ref } from 'vue';
import { useTabStore } from '@/shared/components/tabs/stores/useTabStore.ts';
import { useSidebarValidation } from '@/shared/components/sidebar/composables/useSidebarValidation.ts';

export const useSidebarMenu = (props: any) => {

    //? Desestructuraciones de Composables
    const {
        //* Methods
        verifyModuleVisibility,
    } = useSidebarValidation();

    //? Desestructuraciones de Stores
    const {
        // Actions
        openTab,
    } = useTabStore();

    //* PROPERTIES

    //* METHODS

    const mouseOverHorizontal = (e: any) => {

        if(!props.isSidebarCollapse) return;

        let liElement = e.target.parentElement;
        let divWrapper = liElement.querySelector('.wrapper');
        let position = liElement.getBoundingClientRect()
    
        // console.log('e.target.parentElement:', position);
        // console.log('divWrapper:', divWrapper);
    
        if (divWrapper) {
            console.log('position:', position);
    
            divWrapper.style.top = `${position.top - 75}px`;
            divWrapper.style.right = `${-150}px`;
            // divWrapper.style.left = `0px`;
    
        }
    
    }
    
    const mouseLeaveHorizontal = (e: any) => {

        if(!props.isSidebarCollapse) return;

        let liElement = e.target;
        let divWrapper = liElement.querySelector('.wrapper');
        let position = liElement.getBoundingClientRect()
    
        console.log('e.target.parentElement:', position);
        console.log('divWrapper:', divWrapper);
    
        if (divWrapper) {
            console.log('position:', position);
    
            divWrapper.style.top = `${position.top - 75}px`;
            divWrapper.style.right = `${position.right}px`;
    
        }
    
    }
    
    const mouseOverVertical = (e: any): void => {

        if(!props.isSidebarCollapse) return;

        let liElement = e.target.parentElement;
        let divWrapper = liElement.querySelector('.wrapper');
        let position = liElement.getBoundingClientRect()
    
        if (divWrapper) {
            console.log('position:', position);
            // console.log('e.target:', e.target);
    
            divWrapper.style.top = `${position.top - 76.5}px`;
            divWrapper.style.left = `${100}%`;
        }
    
    }
    
    const mouseLeaveVertical = (e: any): void => {

        if(!props.isSidebarCollapse) return;

        let liElement = e.target;
        let divWrapper = liElement.querySelector('.wrapper');
        let position = liElement.getBoundingClientRect()
    
        if (divWrapper) {
            // console.log('position:', position);
            // console.log('e.target:', e.target);
    
            // divWrapper.style.top = `-${10}px`;
            divWrapper.style.top = `${position.top - 76.5}px`;
            divWrapper.style.left = `0`;
            // divWrapper.style.left = `${100}%`;
        }
    
    }

    const isExpandSubmenu = (isOpen: any) => {

        if(isOpen){
            return 'rotate'
        }
        else{
            return '';
        }

    }

    const handleModuleAction = (item: any) => {
        // console.log('item:',item);
        if(item?.children?.length > 0){
            item.meta.dropdownOpen = !item?.meta?.dropdownOpen
        }
        else{
            openTab(item);
        }
    }

    return {
        //* PROPERTIES
            
        //* METHODS
        mouseOverHorizontal,
        mouseLeaveHorizontal,
        mouseOverVertical,
        mouseLeaveVertical,
        isExpandSubmenu,
        handleModuleAction,
        verifyModuleVisibility,
    }

}