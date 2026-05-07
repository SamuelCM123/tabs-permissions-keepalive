<script setup>
    //* --> Imports
    import { defineAsyncComponent, watchEffect } from 'vue';

    // Importaciones de Composables
    import { useSearch } from '../composables/useSearch.js';

    // Definiciones de Emits
    const emits = defineEmits(['update:modelValue','page','defaultTable']);

    // Definiciones de Props
    const props = defineProps({
        /**
         * @property {Function} getData -Obtiene los datos filtrados.
         * @returns {undefined} 
         */
        getData     : {type:Function},

        /**
         * @property {string} searchInput -Valor del campo de busqueda.
         */
        searchInput : {type:String},

        /**
         * @property {Function} resetSort -Valor del campo de busqueda.
         */
        resetSort   : {type:Function},
        records   : {type:null},

        /**
         * @property {string} placeholder -Texto para el placeholder del campo.
         */
        placeholder   : {type:null},
    });

    const {
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
    } = useSearch( emits, props );

    // Componentes 
    // const TooltipInput = defineAsyncComponent(() => import('@/shared/components/tooltips/components/TooltipInput.vue'));
    // const ButtonComplement = defineAsyncComponent(() => import('@/shared/components/buttons/components/ButtonComplement.vue'));

    // Watchers
    watchEffect(() => {

        // Resetea la busqueda si el campo de esta vacio y si anteriormente se busco algo
        if(search.value === '' && (props.searchInput ?? false)){

            isTimeActive.value = true;
            emits("update:modelValue",search.value);
            setTimeout(() => {
                if(props.resetSort ?? false) props.resetSort();
                emits('page',1);
                props.getData();
                isTimeActive.value = false;
            },1000)
        } 

        if( props.searchInput === null ) {
            search.value = '';
            emits('page',1);
            emits("update:modelValue",'');
        }
    })

</script>

<template>
    
    <div class="search-wrapper">

        <form class="form-container" @submit.prevent>

            <div class="wrapper-input">
                <input
                    autocomplete="off"
                    class="input-form tooltip-search text-mayus"
                    type="text"
                    id="rfc"
                    spellcheck="false"
                    :placeholder="props.placeholder ?? false ? props.placeholder : 'Buscar'"
                    v-model.trim="search"
                    @keypress.enter="HandleGetData"
                    >
                    <TooltipInput>
                        <template #tooltip-content>Presione enter para buscar</template>
                    </TooltipInput>
                <span class="material-symbols-rounded prefix-icon"> match_word </span>
            </div>
            
            <!-- <button 
                :class="classBtnSearch"
                @click="HandleGetData"
                >
                <span class="material-symbols-rounded icon-search"> search </span>
            </button> -->
            <ButtonComplement
                @click="HandleGetData"
                color="#293277"
                color-hover="#475097"
                icon="search"
                color-icon="#FFFFFF"
                border-radius="5px"
                height="45px"
                width="45px"
                min-height="45px"
                min-width="45px"
                font-size="12px"
                message-tooltip="Buscar"
                :is-loading="isTimeActive"
            ></ButtonComplement>

            <!-- <button 
                :class="classBtnRefresh"
                @click="resetTable" 
                title="Restablecer Tabla"
                >
                <span class="material-symbols-rounded  icon-refresh">
                    refresh
                </span>
            </button> -->
            <ButtonComplement
                :btn-function="resetTable"
                color="#2D9164"
                color-hover="#42B883"
                color-icon="#FFFFFF"
                border-radius="5px"
                height="45px"
                width="45px"
                min-height="45px"
                min-width="45px"
                message-tooltip="Restablecer Tabla"
                icon="refresh"
                :is-loading="isTimeActive"
            ></ButtonComplement>

        </form>

    </div>

</template>

<style scoped>
    .search-wrapper{
        height: auto;
        display: flex;
        align-items: center;
        justify-content: end;
        gap: 10px;
    }


    .container-search-tooltip{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }

    .wrapper-help{
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }

    .wrapper-help:hover{ cursor: pointer; }

    .wrapper-tooltip{
        display: flex;
        flex-direction: column;
        background-color: #ffffff;
        color: #000000;
        border-radius: 5px;
        padding: 10px;
        position: absolute;
        z-index: 1;
        top: 110%;
        right: 0;
        opacity: 0;
        pointer-events: none;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.24);
        transition: all 0.3s ease;
    }

    .wrapper-help:hover .wrapper-tooltip{
        cursor: default;
        opacity: 1;
        transition: all .3s ease;
        pointer-events: all;
    }

    .title-tooltip{
        color: #293277;
        font-size: 14px;
    }

    .text-tooltip{
        text-align: left;
        white-space: nowrap;
        font-size: 12px;
        color: #293277;
    }

    .icon-adjust{ font-size: 30px; }

    /* SEARCH */
    .form-container{
        display: flex;
        align-items: end;
        justify-content: center;
        flex-direction: row;
        /* max-width: 300px; */
        /* width: 300px; */
        width: 390px;
        height: 100%;
        gap: 5px
    }

    .wrapper-input{ margin: 0; }

    .input-form{
        margin: 0;
        padding: 0px 0px 0px 40px;
    }

    .btn-search{
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 45px;
        min-width: 45px;
        background-color: #293277;
        box-shadow: 2px 3px 7px rgba(0, 0, 0, 0.24);
        transition: .5s ease;
        color: #fff;
        border-radius: 5px;
        cursor: pointer;
    }

    .btn-search:hover{
        background-color: #475097;
        transition: background-color .5s ease;
    }

    .btn-search:focus{
        background-color: #475097;
        transition: background-color .5s ease;
    }

    .btn {
        min-height: 45px;
        min-width: 45px;
        cursor: pointer;
        box-shadow: 2px 3px 7px rgba(0, 0, 0, 0.24);
    }

    .btn-download {
        display: flex;
        justify-content: center;
        background-color: #42B883;
        text-transform: uppercase;
        align-items: center;
        color: #FFFFFF;
        letter-spacing: 5px;
        font-size: 14px;
        min-height: 45px;
        min-width: 45px;
        cursor: pointer;
        border-radius: 5px;
        transition: .5s ease;
        box-shadow: 2px 3px 7px rgba(0, 0, 0, 0.24);
    }

    .btn-download:hover {
        background-color: #2D9164;
        transition: .5s ease;
        color: #FFFFFF;
    }

    .btn-form-blocked{
        min-width: 45px;
        height: 45px;
    }

    .icon-search{
        font-weight: 300;
        font-size: 22px;
    }

    /* Tooltip */
    .wrapper-tooltip{
        width: auto;
        left: 0;
    }

    .text-tooltip-email{
        text-align: left;
        white-space: nowrap;
        font-weight: normal;
        font-size: 12px;
        color: #293277;
    }

    .icon-adjust{
        font-size: 24px;
    }

    @media screen and (max-width:1000px){
        .form-container{ 
            width: initial;
            max-width: 390px; 
        }

        .input-form{
            padding: 0px 0px 0px 40px;
        }
    }

    /* Estilos para dispositivos móviles con pantalla de 768px a 1024px */
    @media screen and (min-width: 768px) and (max-width: 1024px) {

    }

    /* Estilos para tablets con pantalla de hasta 768px */
    @media screen and (max-width: 768px) {


    }

    /* Estilos para móviles con pantalla de hasta 460px */
    @media screen and (max-width: 460px) {
        
        .search-wrapper{
            justify-content: center;
            width: 100%;
        }

    }

</style>