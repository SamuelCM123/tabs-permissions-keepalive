<script setup>

    // Importaciones Nativas
    import { defineAsyncComponent, watchEffect } from 'vue';

    // Importaciones de Composables
    import { useRangeDate } from '@/shared/components/vue-table/composables/useRangeDates.js';

    // Definiciones de Emits
    const emits = defineEmits(["update:modelValue","page"]);

    // Definiciones de Props
    const props = defineProps({
        initialDate: {type:null},
        finalDate: {type:null},
        titleModule: {type:null, default: 'Rangos de Fechas'},
        getData: {type:Function},
        btnShow: {type: null},
        disableBtn: { type: null },
        isLoading: { type: null, default: false },
    })

    // Desestructuraciones de Composables
    const {
        // Properties
        formDataRangeDate,
        isTimeActive,

        // Methods
        getData,
        verifyFinalDate,
        verifyInitialDate,
        currentDate,
        emitValueRange,
        validateField,
        hasError,
        getErrorMessage,
    } = useRangeDate( emits, props );

    // Componentes
    const ButtonLoading = defineAsyncComponent(() => import('@/shared/components/buttons/components/ButtonLoading.vue'));

    // Watchers
    watchEffect(() => {

        // Asignar los valores de los rangos de fecha
        if(props.initialDate) formDataRangeDate.value.initialDate.setValue = props.initialDate;
        if(props.finalDate) formDataRangeDate.value.finalDate.setValue = props.finalDate;
        
    })

</script>

<template>
    <div class="range-dates-wrapper">
        
        <!--* INPUT FECHA INICIAL -->
        <div class="container-wrapper-general">

            <div class="label-form">
                Fecha Inicial
            </div>

            <div class="general-wrapper">

                <div class="wrapper-input">

                    <input 
                        v-model="formDataRangeDate.initialDate.setValue"
                        type="date" 
                        class="input-form input-date"
                        @change="emitValueRange"
                        @blur="[
                            validateField(formDataRangeDate.initialDate.field),
                            verifyInitialDate()
                        ]"
                        :class="{
                            'error-outline': hasError(formDataRangeDate.initialDate.field),
                            'input-disable': props.disableBtn === true
                        }"
                        :max="formDataRangeDate.finalDate.setValue"
                        :disabled="props.disableBtn"
                    >

                    <span class="material-symbols-rounded suffix-icon-calendar">
                        calendar_month
                    </span>

                </div>

                <span class="label-error">{{ getErrorMessage(formDataRangeDate.initialDate.field) }}</span>

            </div>

        </div>

        <!--* INPUT FECHA FINAL -->
        <div class="container-wrapper-general">

            <div class="label-form">
                Fecha Final
            </div>

            <div class="general-wrapper">

                <div class="wrapper-input">

                    <input 
                        type="date" 
                        class="input-form input-date"
                        v-model="formDataRangeDate.finalDate.setValue"
                        @change="emitValueRange"
                        @blur="[
                            validateField(formDataRangeDate.finalDate.field),
                            verifyFinalDate()
                        ]"
                        :class="{
                            'error-outline': hasError(formDataRangeDate.finalDate.field),
                            'input-disable': props.disableBtn === true
                        }"
                        :max="currentDate()"
                        :disabled="props.disableBtn"
                    >

                    <span class="material-symbols-rounded suffix-icon-calendar">
                        calendar_month
                    </span>

                </div>

                <span class="label-error">{{ getErrorMessage(formDataRangeDate.finalDate.field) }}</span>

            </div>

        </div>

        <!--* BOTÓN CONSULTAR  -->
        <ButtonLoading
            v-if="props.btnShow === undefined || props.btnShow === true"
            class="btn-form-ranges"
            background="#475097"
            hover-color="#293277"
            name-button="Consultar"
            min-width="200px"
            max-width="200px"
            width="100%"
            height="45px"
            :action-button="getData"
        ></ButtonLoading>
        <!-- <button 
            v-if="props.btnShow === undefined || props.btnShow === true"
            class="btn-form" 
            :class="{ 'btn-form-blocked': isTimeActive === true }"
            @click.prevent="getData"
        >
            Consultar
        </button> -->

    </div>
</template>

<style scoped>
    
    .range-dates-wrapper{
        display: flex;
        justify-content: center;
        align-items: end;
        flex-direction: row;
        gap: 20px;
    }

    .container-wrapper-general{
        width: 100%;
        max-width: 200px;
    }

    .wrapper-input{
        min-width: 200px;
        /* outline: 1px solid red; */
    }

    .label-form{
        white-space: nowrap;
    }

    .btn-form-ranges{
        /* box-shadow: 2px 3px 7px rgba(0, 0, 0, 0.24); */
        /* min-width: 200px; */
        /* height: 45px; */
        margin-bottom: 15px;
    }

    .input-disable {
        background-color: #EAEAEA;
        color: #A3A3A3;
        cursor: no-drop;
    }

    /* Estilos para tablets con pantalla de hasta 768px */
    @media screen and (max-width: 768px) {

        .range-dates-wrapper{
            flex-wrap: wrap;
            justify-content: center;
        }

    }

    /* Estilos para móviles con pantalla de hasta 460px */
    @media screen and (max-width: 460px) {
        
        .range-dates-wrapper{
            flex-direction: column;
            align-items: center;
            gap: 10px;
        }

        .btn-form{
            min-width: 200px;
            width: auto;
            font-size: var(--label_inputs_size_mobile);
        }

    }

</style>