<script setup lang="ts">

    //* --> Importaciones
    import { watchEffect } from 'vue';
    import { useSelect, type ISelectedData } from '@/shared/components/select/composables/useSelect';

    //* --> Definiciones de Props
    const props = defineProps({
        data             : { type: Array<ISelectedData> },
        hasError         : { type: Boolean },
        dataParams       : { type: Object },
        isDisable        : { type: Boolean },
        disableSelect    : { type: Boolean },
        titlePlaceHolder : { type: String },
        iconSelect       : { type: String },
        showId           : { 
            type: Boolean,
            default: false
        },
    });

    //* --> Definiciones de Emits
    const emits = defineEmits([
        'update:modelValue',
        'executeFunction'
    ]);

    //* --> Composables
    const {
        //* PARAMS
        data,
        searchData,
        dataFiltered,
        dataClick,
        // onFocus,

        //* METHODS
        getData,
        handleDataSearch,
        handleData,
        resetDataSelect,
    } = useSelect( emits );

    //* --> Ciclos de vida
    watchEffect( async () => {
        // if( props.hasError ) { onFocus.value?.focus(); }
        if( props.dataParams !== undefined && props?.data ) { 
            // console.log('props.data:',props?.data);
            // console.log('props.dataParams:',props.dataParams);
            const found = props.data.find((values) => values.id === props.dataParams?.id);
            if (found) {
                data.value = found;
            }
        }
        // console.log('data.value:',data.value);
        // console.log('props.dataParams:',props.dataParams);
        // if(data.value.id != props.dataParams?.id){
            // data.value = await props.data.find((values,index) => values.id === props.dataParams?.id)
        // } 
        await getData(props.data);
    });

</script>

<template>
    <!--* CONTENEDOR DE INPUTS *-->
    <div 
            class="wrapper-input" v-click-outside="()=> dataClick = false"
            :class="[
                props.isDisable ? 'disabled-clic': '',
            ]"
        > 
        <span class="material-symbols-rounded prefix-icon"> 
            {{ props.iconSelect }}
        </span>
        
        <!--* CONTENEDOR DE INPUT-SELECT y MENU DE SELECT -->
        <div class="container-select-search">
        
            <!--* CONTENEDOR INPUT-SELECT -->
            <span class="select-form-search" @click="resetDataSelect">
                <div                    
                    class="input-select-search"
                    :class="{ 
                        'input-disable': props.disableSelect || props.isDisable,
                        'error-outline': props.hasError 
                    }"
                >
                    <p class="text-mayus" v-if="data?.id !== undefined && data?.id !== '' && String(data?.id) !== ''">
                        <b class="letter-bold"  v-if="props.showId">{{ data.id }}</b> 
                        <span  v-if="props.showId && data?.id"> - </span>
                        {{ data.name }}
                    </p>
                    <p v-else class="placeholder-select">{{ props.titlePlaceHolder }}</p>
                </div>
            </span>
            
            <!--* CONTENEDOR MENU DESPLEGABLE DEL SELECT -->
            <div :class="[ dataClick ? 'expand-select' : 'content-select' ]" v-if="!props.disableSelect">

                <!--* CONTENEDOR ICONO Y CAMPO BÚSQUEDA -->
                <div class="wrapper-input select-search">
                    <!--* INPUT DE BÚSQUEDA -->
                    <input 
                        type="text" 
                        class="input-form"
                        v-model="searchData"
                        @keyup="handleDataSearch"
                        placeholder="Buscar"
                    >
    
                    <!--* ICONO DE BÚSQUEDA -->
                    <span class="material-symbols-rounded prefix-icon">
                        search
                    </span>
                </div>
    
                <!--* CONTENEDOR DE OPCIONES DEL SELECT -->
                <ul class="option-container" v-if="dataFiltered.length !== 0">
    
                    <!--* OPCIONES DEL SELECT -->
                    <template v-for="( data, i ) in dataFiltered" :key="i">
                    
                        <!--* OPCIÓN DE SELECT  -->
                        <li 
                            class="option-value text-mayus" 
                            @click="handleData(data)" 
                            :value="data.id">
                            <p class="option-value-p" :title="data.alt_name">
                                <b class="letter-bold" v-if="props.showId">{{ data.id }}</b> <span v-if="props.showId"> - </span> {{ data.name }}
                            </p>
                        </li>
                    
                    </template>
    
                </ul>
                <template v-else>
                    <div class="no-data">
                        <p>Sin Coincidencias</p>
                    </div>
                </template>

            </div>

        
        </div>
        <!--* ICONO SUFFIX PARA SELECT -->
        <span 
            class="material-symbols-rounded suffix-icon-select icon-in" 
            :class="[dataClick && !props.disableSelect ? 'rotate' : 'reset-rotate']">
            keyboard_arrow_down
        </span>

    </div>
    <!-- CONTENEDOR DEL SELECT -->
</template>

<style scoped>
    .input-select-search:focus {
        outline: .5px solid #293277;
    }
    .suffix-icon {
        background-color: transparent;
    }
    .icon-in {
        background-color: transparent;
    }
    .input-select-search {
        padding: 0 40px;
        /* outline: 1px solid red; */
    }
    .input-disable {
        color: #A3A3A3;
        cursor: not-allowed;
        outline: none;
        /* background-color: #dcdcdc; */
        /* outline: 1px solid red; */
    }

    .input-disable:focus {
        outline: none;
        /* outline: 1px solid red; */
    }

    .placeholder-select {
        color: #A3A3A3;
    }

    .reset-rotate {
        transform: rotate(0);
        transition: all .3s ease;
        /* outline: 1px solid red; */
    }
</style>