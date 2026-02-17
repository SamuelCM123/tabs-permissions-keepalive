//* Importaciones globales
import { ref } from 'vue';

export const usePagination = ( emits, props ) => {

    //* States
    /**
     * Captura la paginacióm.
     * 
     * @constant
     * @name pagination
     * 
    */
    const pagination = ref();

    /**
     * Captura la página.
     * 
     * @constant
     * @type {Number}
     * @name page
     * 
    */
    const page = ref(1);

    /**
     * Captura los datos por pagina.
     * 
     * @constant
     * @type {Number}
     * @name recordsPerPage
     * 
    */
    const recordsPerPage = ref(10);

    //* Getters
    
    /**
     * Función para obtener la paginación.
     * 
     * @function
     * @param {Number} totalRecords contiene el numero de registros
     * @name getPagination
     * 
    */
    const getPagination = (totalRecords) => {
        pagination.value = Math.ceil(totalRecords / recordsPerPage.value);

        if(page.value > pagination.value){
            page.value = 1;
            emits('update:modelValue', page.value);
        }
    }

    //* Actions
    /**
     * Función para obtener la primera página.
     * 
     * @function
     * @name firtPage
     * 
    */
    const firtPage = () => {
        page.value = 1;
        emits('update:modelValue', page.value);
        props.getData();
    }

    /**
     * Función para obtener la página anterior.
     * 
     * @function
     * @name previousPage
     * 
    */
    const previousPage = () => {
        page.value = page.value !== 1 
                    ? page.value - 1 
                    : 1;
        emits('update:modelValue', page.value);
        props.getData();
    }

    /**
     * Función para obtener el número de página.
     * 
     * @function
     * @name numberPage
     * 
    */
    const numberPage = (getPage) => {
        if(page.value === (getPage + 1)) return;

        page.value = ( getPage + 1 );
        emits('update:modelValue', page.value);
        props.getData(false);
    }

    /**
     * Función para obtener la siguiente página.
     * 
     * @function
     * @name nextPage
     * 
    */
    const nextPage = () => {
        page.value = page.value !== pagination.value
                    ? page.value + 1 
                    : pagination.value;
        emits('update:modelValue', page.value);
        props.getData();
    }

    /**
     * Función para obtener la última página.
     * 
     * @function
     * @name lastPage
     * 
    */
    const lastPage = () => {
        page.value = pagination.value;
        emits('update:modelValue', page.value);
        props.getData();
    }

    return {
        //* States
        pagination,
        page,
        recordsPerPage,

        //* Getters
        getPagination,
        
        //* Actions
        firtPage,
        previousPage,
        numberPage,
        nextPage,
        lastPage
    }

};