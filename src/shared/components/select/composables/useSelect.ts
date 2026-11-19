//* --> Importaciones Dependencias
import { ref, type Ref } from "vue";

// INTERFACES
export interface ISelectedData {
    id: string,
    name: string,
    alt_name: any
}

/**
** Composable para controlar el select 
*
*/
export const useSelect = ( emits: any ) => {

    /**
     * @constant {Ref<String>} searchData
    */
    const searchData   = ref('');

    /**
     ** Datos filtrados
    */
    const filteredData: Ref<Array<ISelectedData>> = ref([]);

    /**
     ** Datos filtrados
    */
    let   dataFiltered: Ref<Array<ISelectedData>> = ref([]);

    /**
     * @constant {Ref<Boolean>} dataClick
    */
    const dataClick = ref(false);

    /**
     ** Datos de la opción seleccionada
    */
    let data: Ref<ISelectedData> = ref({ id: '', name: '', alt_name: '' });

    /**
     * @constant {Ref<Array>} fullData
    */
    const fullData: Ref<Array<ISelectedData>> = ref([]);

    // const onFocus: Ref<Function | null> = ref(null);

    /**
     * Obtiene la información.
     * 
     * @function
     * @name getData
    */
    const getData = async ( data: any ) => {
        fullData.value = await data;
        dataFiltered.value = fullData.value;
    }
    
    /**
     * Filtra la información
     * 
     * @function
     * @name handleDataSearch
    */
    const handleDataSearch = () => { 
        filteredData.value =  fullData.value.filter(data => data.name.toLowerCase().includes(searchData.value.toLowerCase()));
        dataFiltered.value = filteredData.value;
    }

    /**
     * Asigna la información
     * 
     * @function
     * @name handleData
    */
    const handleData = ( dataSelected: ISelectedData ) => {
        data.value = {...dataSelected}; 
        dataClick.value = false;
        //? Se emite el emit para cerrar el modal
        emits('update:modelValue', data.value);
        emits('executeFunction');
    }

    /**
     * Resetea el Select
     * 
     * @function
     * @name resetDataSelect
    */
    const resetDataSelect = () => {
        dataClick.value = !dataClick.value;
        searchData.value = '';
        dataFiltered.value = fullData.value;
    }

    return {
        //* PARAMS
        data,
        searchData,
        dataFiltered,
        dataClick,
        // onFocus,

        //* FUNCTIONS
        getData,
        handleDataSearch,
        handleData,
        resetDataSelect,
    }
}