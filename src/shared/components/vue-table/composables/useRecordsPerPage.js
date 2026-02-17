import { ref } from 'vue';

export const useRecordsPerPage = ( emits ) => {

    const records = ref(10);

    const recordsPage = () => {
        records.value = parseInt(records.value);
        emits('page',1);

        //? Se emite el emit para cerrar el modal
        emits('update:modelValue', records.value);
    };

    const resetTable = () => {
        emits('defaultTable',true);
    }

    return {
        //* Properties
        records,
        //* Methods
        recordsPage,
        resetTable,
    }

}