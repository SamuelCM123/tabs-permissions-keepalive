//* Importaciones
import { useToastStore } from '@/shared/components/toast/stores/useToastStore.js';

// type errorResponse = {
//     response: {
//         config: {
//             headers: {
//                 title: string;
//             };
//         };
//         data: {
//             error: {
//                 code: string;
//                 message: string;
//                 details: object;
//             };
//         };
//     }
// }

// type errorRequest = {
//     request: any
// }

// type error = errorResponse | errorRequest;

export const errorCaught = ( error: any ) => {

    //? Desestructuración de composables
    // const { repositoryErrors } = useRepositoryErrors();

    //? Stores
    const toast = useToastStore();

    if ( error.response ) {
        // console.log('✅ RESPONSE_SERVER: ', error.response);

        /**
         * @type {SchemeErrorBackend} Obtención de errores de backend.
         */
        const setError = error.response.data;

        /**
         * Definición de esquema de error backend.
         * 
         * @typedef {object} customError
         * @property {string} title - Título del error capturado.
         * @property {string} message - Descripción del error capturado.
         * @property {object} details - Detalle del error capturado.
        */
        const customError = {
            title: error.response.config.headers.title || 'Error',
            message: error.response.data.error.message || 'Error',
            details: error.response.data.error.details || {}
        };

        // repositoryErrors.value[setError.error.code](customError);

        toast.openToast({
            message: customError.message,
            title: customError.title,
            type: 'error'
        });
        
        return;
    }

    if ( error.request ) {
        // console.log('❌ NOT_RESPONSE_SERVER: ', error.request);
        toast.openToast({
            message: 'Oops! Estamos experimentando problemas con el servicio, intente de nuevo más tarde.',
            title: 'Error de Servidor',
            type: 'error'
        });
        return;
    }

    // console.log('👀 UNKNOWN_ERROR...', error);
    toast.openToast({
        message: `${ error }`,
        title: 'Error Desconocido',
        type: 'error'
    });
    return;

}