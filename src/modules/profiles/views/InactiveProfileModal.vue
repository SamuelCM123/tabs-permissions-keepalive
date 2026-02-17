<script setup>
    
    // Importaciones Nativas
    import { defineAsyncComponent } from 'vue';

    // Importaciones Composables
    import { useStatusProfileModal } from '@/modules/dashboard/configurations/profiles/composables/useStatusProfileModal.js';

    // Definiciones de Props
    const props = defineProps({
        modalState: {type:Boolean, default: true},
        nameProfile: {type:String, default: true},
        submitEditProfile: {type:null},
        activityProfile: {type:null},
        activitySession: {type:Function},
    })

    // Definición de Emits
    const emits = defineEmits(["modalS"]);

    // Desestructuraciones de Composables
    const {
        // Properties
        widthMobile,
        widthWeb,
        modalConfig,
            
        // Methods
        closeModal,
        formSubmitModal,
    } = useStatusProfileModal(props,emits);

    // Componentes
    const BaseModal = defineAsyncComponent(() => import('@/shared/components/modal/BaseModal.vue'));
    const ButtonLoading = defineAsyncComponent(() => import('@/shared/components/buttons/components/ButtonLoading.vue'));

</script>

<template>
    <BaseModal
        v-if="props.modalState"
        :modal-config="modalConfig"
        :widthMobile="widthMobile" 
        :width="widthWeb"
    >
        <!--* SLOT PARA CERRAR -->
        <template #close>
            <button 
                class="btn-close material-symbols-rounded" 
                @click="closeModal"
                >
                Close
            </button>
        </template>

        <!--* SLOT PARA ENCABEZADO -->
        <template #header>

            <h1 class="title-modal" :title="props.nameProfile">INACTIVAR PERFIL {{ props.nameProfile }}</h1>

        </template>

        <!--* SLOT PARA CUERPO DEL CONTENIDO -->
        <template #body>

            <div class="container-description-modal">

                <!--* DESCRIPCIÓN -->
                <span class="description-modal">
                    <p>Al inactivar el perfil, los usuarios quedarían sin acceso al sistema, considere que hay:</p>
                    <p>
                        Número de usuarios asignados a este perfil: <span class="letter-bold">{{ props.activityProfile?.total_users_profile ?? false ? props.activityProfile?.total_users_profile : 0 }}</span>
                        Número de usuarios con sesión activa con el perfil: <span class="letter-bold">{{ props.activityProfile?.total_users_session_active ?? false ? props.activityProfile?.total_users_session_active : 0 }}</span>
                    </p>
                    <p>¿Desea inactivar al perfil?</p>
                </span>

            </div>

        </template>

        <!--* SLOT PARA PIE DE MODAL -->
        <template #footer>

            <div class="button-container">

                <!--* BOTÓN CANCELAR -->
                <button 
                    class="btn-form btn-secundary"
                    @click="closeModal"
                    >
                    <span>NO</span>
                </button>

                <!--* BOTÓN GUARDAR -->
                <ButtonLoading
                    :name-button="'SI'"
                    :time-btn="3000"
                    width="100%"
                    max-width="140px"
                    :action-button="formSubmitModal"
                >
                </ButtonLoading>

            </div>

        </template>

    </BaseModal>
</template>

<style scoped>
    
    .description-modal{
        display: flex;
        flex-direction: column;
        text-align: center;
        padding: 10px 0px;
        margin-top: 0;
        gap: 15px;
        margin-top: 10px;
        color: #000;
    }

    .title-modal{
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 90%;
    }

    .button-container{
        width: 300px;
        margin-top: 10px;
        gap: 20px;
    }

    .btn-form{
        width: 100%;
        max-width: 200px;
    }

</style>