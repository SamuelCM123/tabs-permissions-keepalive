//* Importaciones
import { ref, type Ref } from 'vue';

export const useDragTabs = (components: Ref<Array<any>>) => {

    //* PROPERTIES

    /**
     * -Número de índice arrastrado
     */
    const draggedIndex = ref<any>(null);

    //* METHODS

    /**
     * Controla las acciones cuando comienza el arrastre del elemento
     * @function
     * @name dragStart
     * @param {Object} e -Evento 
     * @param {Number} index -Indice del elemento arrastrado
     * @returns {undefined}
     */
    const dragStart = (e: any, index: any) => {
        draggedIndex.value = index;

        // Muestra el elemento con opacidad
        e.target.style.opacity = 0.1;
    }

    /**
     * Controla las acciones cuando terminar el arrastre del elemento
     * @function
     * @name dragEnd
     * @param {Object} e -Evento 
     * @returns {undefined}
     */
    const dragEnd = (e: any) => {

        // Muestra el elemento con la sin opacidad
        e.target.style.opacity = 1;

        /**
         * @type {Object} -Elemento de pestaña
         */
        let elementTab = document.querySelectorAll('.tabs');
        
        // Borra las clases de estilos al terminar el arrastre
        elementTab.forEach((inputTab,indexTabs) => {
            if(inputTab){
                inputTab.classList.remove('grow-tab');
            }
        })

    }

    /**
     * Controla las acciones cuando sale el arrastre del elemento
     * @function
     * @name dragExit
     * @param {Object} e -Evento 
     * @returns {undefined}
     */
    const dragExit = (e:any) => {
        /**
         * @type {Object} -Toma el elemento hijo del contenedor de la pestaña
         */
        let elementTab = e.target.closest('.wrapper-tab-name');

        if(elementTab){
            elementTab.parentElement.classList.remove('grow-tab');
        }

    }

    /**
     * Controla las acciones cuando estas encima de las pestañas arrastrando el elemento
     * @function
     * @name dragOver
     * @param {Object} e -Evento 
     * @param {Number} index -Indice del elemento arrastrado
     * @returns {undefined}
     */
    const dragOver = (e: any,component: any,index: any) => {
        /**
         * @type {Object} -Toma el elemento hijo del contenedor de la pestaña
         */
        let elementTab = e.target.closest('.wrapper-tab-name');

        // No aplicar el estilo a la misma pestaña que se arrastra
        if(draggedIndex.value !== index){

            if(elementTab){
                elementTab.parentElement.classList.add('grow-tab');
            }
        }
    }

    /**
     * Controla las acciones cuando estas sobre una pestaña y despues te sales con el arrastre del elemento
     * @function
     * @name dragLeave
     * @param {Object} e -Evento 
     * @returns {undefined}
     */
    const dragLeave = (e: any) => {
        /**
         * @type {Object} -Toma el elemento hijo del contenedor de la pestaña
         */
        let elementTab = e.target.closest('.wrapper-tab-name');

        if(elementTab){
            elementTab.parentElement.classList.remove('grow-tab');
        }
    }

    /**
     * Cuando se suelta el arrastre cambia de posición la pestaña dependiendo de donde se soltó
     * @function
     * @name drop
     * @param {Number} index 
     * @returns {undefined}
     */
    const drop = (index: any) => {
        
        /**
         * @type {Object} -Almacena el componente de la pestaña dependiendo del elemento arrastrado
         */
        const draggedItem = components.value[draggedIndex.value];

        // Borra el elemento que se arrastró de la posición en la que se ubicaba
        components.value = components.value.filter((value, idx) => idx !== draggedIndex.value);

        // Inserta el componente de la pestaña en el índice que se arrastró
        components.value.splice(index, 0, draggedItem);

        // Se resetea el índice del elemento arrastrado
        draggedIndex.value = null;
    }

    return {
        //* PROPERTIES
            
        //* METHODS
        dragStart,
        dragEnd,
        dragExit,
        dragOver,
        dragLeave,
        drop,
    }

}