//* Importaciones
import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useButtonUpDownStore = defineStore('ButtonUpDown',() => {

    //* STATES

    /**
     * Variable que guarda la posición numerica de la pantalla.
     * @type {Ref<number>}
     */
    const scrollLocated = ref(0);

    /**
     * Variable que guarda el valor booleano que determina si se muestra o no el boton.
     * @type {Ref<boolean>}
     */
    const isShowButtonUp = ref(false);

    /**
     * Variable que guarda el valor booleano que determina si se muestra o no el boton.
     * @type {Ref<boolean>}
     */
    const isShowButtonDown = ref(false);

    /**
     * Valor que indica la altura del contenido completo de la página.
     * @type {number}
     */
    const scrollHeight = ref();

    //* ACTIONS
    
    /**
     * Muestra u oculta los botones de scroll basado en la posición de desplazamiento y en el tamaño de altura total incluyendo los
     * pixeles ocultos por el scroll.
     * @function
     * @name showButtonScroll
     * @returns {undefined}
     */
    const showButtonScroll = () => {

        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;

        // Obtiene la ubicación en pixeles de la ubicación del desplazamiento vertical
        scrollLocated.value = window.scrollY

        // Obtiene el tamaño total del contenedor incluyendo el tamaño oculto por desplazamiento(scroll)
        scrollHeight.value = document.documentElement.scrollHeight;

        // console.log('scrollHeight:',scrollHeight.value);
        
        // Evalua cuando pasa la ubicación de desplazamiento vertical para hacer aparecer el botón de desplazamiento superior
        if(scrollLocated.value > 500){
            isShowButtonUp.value = true
        }
        else{
            isShowButtonUp.value = false
        }
        
        // Evalua cuando se ubica en la posición extrema inferior para desaparecer el botón de desplazamiento inferior
        if((scrollY + windowHeight) >= document.documentElement.scrollHeight){
            isShowButtonDown.value = false;
        }
        // Evalua cuando pasa el limite del tamaño del contenedor para aparecer el botón de desplazamiento inferior
        else if(document.documentElement.scrollHeight > 2000){
            isShowButtonDown.value = true;
        }
        else{
            isShowButtonDown.value = false;
        }
    }

    /**
     * Desplaza la ventana hacia arriba de manera suave (smooth scroll).
     * @function
     * @name scrollUp
     * @returns {undefined}
     */
    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    /**
     * Desplaza la ventana hacia abajo de manera suave (smooth scroll).
     * @function
     * @name scrollUp
     * @returns {undefined}
     */
    const scrollDown = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
        });
    }

    /**
     * Observa los cambios en el DOM y realiza acciones específicas cuando ocurren cambios relevantes.
     * @type {MutationObserver}
     */
    const observer = new MutationObserver(() => {

        // console.log('document.documentElement.scrollHeight:',document.documentElement.scrollHeight);

        // Verificar si el scrollHeight ha cambiado
        if (document.documentElement.scrollHeight !== scrollHeight.value) {
            
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;

            // console.log('scrollY:',scrollY);
            // console.log('windowHeight:',windowHeight);

            // Actualizar el valor de scrollHeight
            scrollHeight.value = document.documentElement.scrollHeight;

            // console.log('scrollHeight:',scrollHeight.value);

            if(scrollHeight.value > 2000){
                isShowButtonDown.value = true;
            }
            else{
                isShowButtonDown.value = false;
            } 

        }

    });
    
    return {
        // Properties
        isShowButtonUp,
        isShowButtonDown,
        
        // Methods
        showButtonScroll,
        scrollUp,
        scrollDown,
        observer,
    }
})