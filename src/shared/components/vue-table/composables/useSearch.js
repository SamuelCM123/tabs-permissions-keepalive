import { computed, ref } from 'vue';

export const useSearch = ( emits, props ) => {

    const search = ref(null);
    const isDisabled = ref(false);
    const isTimeActive = ref(false);

    const searchData = () => {
        //? Se emite el emit para cerrar el modal
        emits('update:modelValue', search.value);
    };

    const HandleGetData = () => {

        if(isTimeActive.value === false){

            //? Realiza la busqueda si el campo tiene valor y si es diferente al valor anterior
            // if((search.value ?? false) && (props.searchInput !== search.value)){
            if(search.value ?? false){
                
                // Emite el cambio realizado en el campo de busqueda
                searchData();
                
                // Emite reinicio de paginación
                emits('page',1);
                
                // Reseteo de ordenamiento
                if(props.resetSort ?? false) props.resetSort();
                
                // Obtiene los registros con los filtros correspondientes
                props.getData();

                // Activa el deshabilitado de la petición en la busqueda
                isTimeActive.value = true;

                setTimeout(() => {
                    isTimeActive.value = false;
                },1000);
            }
        }
    }
            
    const resetTable = () => {
        
        isTimeActive.value = true;
        emits('defaultTable',true);
        
        isDisabled.value = true;

        setTimeout(() => {
            isDisabled.value = false;
            isTimeActive.value = false;
        }, 2000)
    }

    const classBtnRefresh = computed(() => {
        // Bloquea el botón si el valor es 0 o menor
        if(isDisabled.value === true) return 'btn-form-blocked';
        
        // Desbloquea el botón si el valor es mayor de 0
        if(isDisabled.value === false) return 'btn-download';
    });

    const classBtnSearch = computed(() => {
        // Bloquea el botón
        if(isTimeActive.value === true) return 'btn-form-blocked';
        
        // Desbloquea el botón
        if(isTimeActive.value === false) return 'btn-search';
    })

    return {
        //* Properties
        search,
        isDisabled,
        classBtnRefresh,
        classBtnSearch,
        isTimeActive,

        //* Methods
        searchData,
        HandleGetData,
        resetTable,
    }

}