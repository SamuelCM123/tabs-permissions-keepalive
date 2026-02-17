//* Importaciones
import { ref } from 'vue';
import { errorScheme } from '../composables/useErrorScheme.js';

/**
* Composable de propiedades y funciones para 'Manejador de Errores'.
*
* @param {object} formData - Definición de inputs de formulario.
* @param {string} formData.name_profile - Nombre del perfil.
* @returns {object} Propiedades del Composable 'ErrorHandler'.
*/
export const useHandleErrors = ( formData ) => {

    //* PROPERTIES

    /**
     * @constant {Ref<object>} schemeErrors Esquema de errores.
     */
    const schemeErrors = ref({ 
        name_profile: '',
    });

    //* METHODS

    /**
     * Ejecuta el bloque de validación según el input.
     * 
     * @function
     * @name validateField
     * @param {string} field - Campo de formulario.
     * @returns {undefined}
     */
    const validateField = ( field ) => {

        const validateFields = {
            'name_profile': () => schemeErrors.value.name_profile = errorScheme[formData.value.name_profile.field](formData.value.name_profile.setValue).find(error => error != ""),
        };

        return validateFields[field]();

    }

    /**
     * Verifica si hay un error en el campo específicado.
     * 
     * @function
     * @name hasError
     * @param {string} field - Campo de formulario.
     * @returns 'true' si hay un error, 'false' todo lo contrario.
     */
    const hasError = ( field ) => !!schemeErrors.value[field];

    /**
     * Verifica si hay algún error en cualquier campo.
     * 
     * @function
     * @name hasErrors
     * @returns 'true' si hay un errorm 'false' todo lo contrario.
     */
    const hasErrors = () => Object.values( schemeErrors.value ).some( error => !!error );

    /**
     * Obtiene el mensaje de error del campo específico.
     * 
     * @function
     * @name getErrorMessage
     * @param {string} field - Campo de formulario.
     * @returns {string} Mensaje de Error.
     */
    const getErrorMessage = ( field ) => schemeErrors.value[field];

    /**
     * Resetea el valor de los errores.
     * 
     * @function
     * @name resetGetErrorMessage
     * @param {string} field - Campo de formulario.
     * @returns {string} Mensaje de Error vacio.
     */
    const resetGetErrorMessage = ( field ) => schemeErrors.value[field] = '';

    return {
        //* PROPERTIES
        schemeErrors,

        //* METHODS
        validateField,
        hasError,
        hasErrors,
        getErrorMessage,
        resetGetErrorMessage,
    }

}