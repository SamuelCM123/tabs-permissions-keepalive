<script setup>
    // Importaciones Nativas
    import { defineAsyncComponent, ref } from 'vue';

    // Importaciones de Constantes
    import { TYPE_CLOSE_TABS } from '@/shared/components/tabs/constants/data-type-close.ts';

    // Definición de Props
    const props = defineProps({
        modalState: {type:Boolean, default: false},
        closeTabs: { type: null },
    });

    // Definición de Emits
    const emits = defineEmits(["closeModal"]);

    // Componentes
    const BaseModal = defineAsyncComponent(() => import('@/shared/components/modal/BaseModal.vue'));
    const ButtonLoading = defineAsyncComponent(() => import('@/shared/components/buttons/components/ButtonLoading.vue'));
    const CustomRadio = defineAsyncComponent(() => import('@/shared/components/custom-radio-button/components/CustomRadio.vue'));

    // Configuración de modal
    const modalConfig = {
        btnClose: {
            show: true
        },
        head: {
            show: true
        },
        body: {
            show: true
        },
        footer: {
            show: true
        },
    }

    let formDataTabs = ref({
        tabs_field: {
            field: 'tabs_field',
            setValue: '',
        }
    })

    // Definición de Medidas
    const widthMobile = '340px';
    const width = '400px';

    /**
     * Manda un emit para cerrado del modal
     * @function
     * @name closeModal
     * @returns {undefined}
     */
    const closeModal = () =>{

        // Se mandan los valores de los emits
        emits('closeModal', false);

    }

    const closeTabsModal = () => {
        // Cierra las pestañas
        props.closeTabs(formDataTabs.value.tabs_field.setValue)

        // Se mandan los valores de los emits
        emits('closeModal', false);

        formDataTabs.value.tabs_field.setValue = '';
    }

</script>

<template>
    <BaseModal 
        v-if="props.modalState" 
        :modal-config="modalConfig" 
        :widthMobile="widthMobile" 
        :width="width">

        <!--* BOTÓN CERRA MODAL *-->
        <template #close>
            <button class="btn-close material-symbols-rounded" @click="closeModal">Close</button>
        </template>
    
        <!--* MODAL HEADER *-->
        <template #header>
    
            <div class="header-moda1">
                <h1 class="title-modal">CERRAR PESTAÑAS OCULTAS</h1>
            </div>
    
        </template>

        <!--* BODY HEADER *-->
        <template #body>
    
            <!-- <div class="form-container"> -->
                
                <div class="body-modal">

                    <p class="description-modal">¿Desea cerrar multiples pestañas?</p>

                    <div class="wrapper-radio-tabs">

                        <CustomRadio
                            :name-radio="'TODAS LAS PESTAÑAS'"
                            :value-selected="formDataTabs.tabs_field.setValue"
                            :value-radio="TYPE_CLOSE_TABS.all"
                            @emitValueChange="formDataTabs.tabs_field.setValue = $event"
                        ></CustomRadio>
                        
                        <CustomRadio
                            :name-radio="'PESTAÑAS OCULTAS'"
                            :value-selected="formDataTabs.tabs_field.setValue"
                            :value-radio="TYPE_CLOSE_TABS.hidden"
                            @emitValueChange="formDataTabs.tabs_field.setValue = $event"
                        ></CustomRadio>

                    </div>

                </div>
                
            <!-- </div> -->
                
        </template>

        <!--* FOOTER HEADER *-->
        <template #footer>
            <div class="footer-btns">
                <button class="btn-form btn-secundary" @click="closeModal">NO</button>
                <button class="btn-form" @click="closeTabsModal">SI</button>
            </div>
        </template>

    </BaseModal>
</template>

<style scoped>

    .header-moda1 {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }

    .description-modal {
        width: 260px;
        text-align: center;
        color: #000000;
    }

    .form-container{
        display: flex;
        flex-direction: column;
    }

    .body-modal {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        margin: 20px 0;
    }

    .wrapper-radio-tabs{
        padding: 5px 0px;
    }

    .footer-btns {
        width: 300px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;
        margin: 0 10px;
        /* outline: 1px solid red */
    }

    .btn-form {
        width: 100%;
        font-size: 14px;
        box-shadow: 2px 3px 7px rgba(0, 0, 0, 0.24);
    }

    /* ESTILOS PARA ESCRITORIO */
    @media screen and (min-width: 768px) {
        .body-modal {
            padding: 0 50px;
        }
    }

</style>