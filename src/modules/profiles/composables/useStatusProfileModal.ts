//* Importaciones
import { ref } from 'vue';

export const useStatusProfileModal = (props,emits) => {

    //* PROPERTIES

    /**
     * @type {string} - Anchura del modal en versión movil
     */
    const widthMobile = '340px';

    /**
     * @type {string} - Anchura del modal en versión web
     */
    const widthWeb = '400px';

    /**
     * @type {object} - Configuración del modal
     */
    const modalConfig = {
        btnClose: {
            show: true
        },
        head: {
            show: true
        },
        body: {
            show: true
        },
        footer: {
            show: true
        },
    }

    //* METHODS

    /**
     * Cierra el modal
     * @function
     * @name closeModal
     * @returns {undefined}
     */
    const closeModal = () => {

        // Emite el valor para cerrar modal
        emits('modalS',false)
    }

    /**
     * Realiza la petición para editar el perfil
     * @function
     * @name formSubmitModal
     * @returns {boolean} -Devuelve el estado de la petición
     */
    const formSubmitModal = () => {

        return props.submitEditProfile(props.activitySession);
    }

    return {
        //* PROPERTIES
        widthMobile,
        widthWeb,
        modalConfig,
            
        //* METHODS
        closeModal,
        formSubmitModal,
    }

}