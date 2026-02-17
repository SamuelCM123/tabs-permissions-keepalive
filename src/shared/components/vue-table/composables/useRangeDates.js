//* Importaciones
import { ref } from 'vue';
import { currentDate } from '@/shared/utils/date/currentDate.js';
import { useToastStore } from '@/shared/components/toast/stores/useToastStore.js';
import { useHandleErrors } from '@/shared/components/vue-table/composables/useHandleErrors.js';

export const useRangeDate = ( emits, props ) => {

    //? Asignaciones de Stores
    const ToastStore = useToastStore();


    //* PROPERTIES
    let isTimeActive = ref(props.isLoading ?? false);

    let formDataRangeDate = ref({
        initialDate:{
            field: 'initialDate',
            setValue: '',
        },
        finalDate:{
            field: 'finalDate',
            setValue: '',
        },
    })

    //? Desestructuraciones del manejador de errores
    const {
        //* Properties
        schemeErrors,

        //* Methods
        validateField,
        hasError,
        hasErrors,
        getErrorMessage,
        resetGetErrorMessage,
    } = useHandleErrors(formDataRangeDate);

    //* METHODS
    const getData = async () => {
    
        //? Validación de campos
        validateField(formDataRangeDate.value.initialDate.field);
        validateField(formDataRangeDate.value.finalDate.field);

        if(hasErrors() === false){

            if(isTimeActive.value === false){

                emits("update:modelValue",{
                    initialDate: formDataRangeDate.value.initialDate.setValue,
                    finalDate: formDataRangeDate.value.finalDate.setValue,
                })
                emits("page",1);
                
                await props.getData();

                // Activa el deshabilitado de la petición en la busqueda
                isTimeActive.value = true;

                setTimeout(() => {
                    isTimeActive.value = false;
                },1000);
            }
        }

    }

    const emitValueRange = () => {
        emits("update:modelValue",{
            initialDate: formDataRangeDate.value.initialDate.setValue,
            finalDate: formDataRangeDate.value.finalDate.setValue,
        })
    }

    const verifyFinalDate = () => {

        // Validar que la fecha final no sea menor a la fecha inicial
        if(formDataRangeDate.value.finalDate.setValue < formDataRangeDate.value.initialDate.setValue){
            formDataRangeDate.value.finalDate.setValue = formDataRangeDate.value.initialDate.setValue;

            ToastStore.openToast({
                title: `${props.titleModule}`,
                message: 'No se permite seleccionar una <span class="letter-bold">Fecha Final</span> anterior a la fecha inicial',
                type: 'info',
            })

        }

        // Validar que la fecha final no sea mayor a la fecha actual
        if(formDataRangeDate.value.finalDate.setValue > currentDate()){
            formDataRangeDate.value.finalDate.setValue = currentDate();

            ToastStore.openToast({
                title: `${props.titleModule}`,
                message: 'No se permite seleccionar una <span class="letter-bold">Fecha Final</span> posterior a la fecha actual',
                type: 'info',
            })

        }

    }

    const verifyInitialDate = () => {

        // Validar que la fecha inicial no sea mayor a la fecha final
        if(formDataRangeDate.value.initialDate.setValue > formDataRangeDate.value.finalDate.setValue){
            formDataRangeDate.value.initialDate.setValue = formDataRangeDate.value.finalDate.setValue;

            ToastStore.openToast({
                title: `${props.titleModule}`,
                message: 'No se permite seleccionar una <span class="letter-bold">Fecha Inicial</span> posterior a la fecha final',
                type: 'info',
            })

        }

    }

    return {
        //* PROPERTIES
        formDataRangeDate,
        isTimeActive,
        schemeErrors,

        //* METHODS
        getData,
        verifyFinalDate,
        verifyInitialDate,
        currentDate,
        emitValueRange,
        validateField,
        hasError,
        hasErrors,
        getErrorMessage,
        resetGetErrorMessage,
    }

}