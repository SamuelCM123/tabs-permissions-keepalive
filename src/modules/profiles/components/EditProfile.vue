<script setup>

    // Importaciones Generales
    import { defineAsyncComponent, onMounted, watchEffect } from 'vue'; 

    // Importaciones de Composables
    import { useEditProfile } from '@/modules/profiles/composables/useEditProfile.ts';

    // Importaciones de Enrutador
    import { useRouter, useRoute } from 'vue-router';
    
    // Definiciones de Props
    const props = defineProps({
        data: { type: null },
    });

    const router = useRouter();
    const route = useRoute();

    // Desestructuraciones de Composables
    const {
    } = useEditProfile();

    // Desestructuraciones de Enrutador
    const Router = useRouter();

    // Componentes
    // const ActiveProfileModal = defineAsyncComponent(() => import('@/modules/dashboard/configurations/profiles/views/ActiveProfileModal.vue'));
    // const InactiveProfileModal = defineAsyncComponent(() => import('@/modules/dashboard/configurations/profiles/views/InactiveProfileModal.vue'));
    // const EditProfileModal = defineAsyncComponent(() => import('@/modules/dashboard/configurations/profiles/views/EditProfileModal.vue'));
    // const CustomCheckbox = defineAsyncComponent(() => import('@/shared/components/custom-checkbox/components/CustomCheckbox.vue'));
    // const InputSwitch = defineAsyncComponent(() => import('@/shared/components/input-switch/components/InputSwitch.vue'));
    // const ButtonLoading = defineAsyncComponent(() => import('@/shared/components/buttons/components/ButtonLoading.vue'));

    // Hooks
    watchEffect(async () => {

        // // Redirecciona al obtener perfiles
        // if(!props.permissions?.profiles?.edit ?? false) return Router.push({ name: 'get-profiles' });

        // // Validar si se está cargando los datos
        // if(profileChargeData.value) {

        //     // Asigna los valores a los campos correspondientes para su edición si existe un ID de perfil
        //     if(Route.params.id_profile) await asignValues();

        //     // Desactiva la carga de datos para editar
        //     profileChargeData.value = false;
        // }

    })

</script>

<template>
    <div class="container-submodule">
        
        <div class="container-submodule-title">
            <h4>Editar Perfil ID: {{ route.params.id_profile }}</h4>
            {{ props.data }}
        </div>


    </div>
</template>

<style scoped>

    @import url('../css/formProfile.css');

    .wrapper-form-profile{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        gap: 20px;
    }

    .container-switch{
        display: flex;
        justify-content: center;
        /* outline: solid 1px black; */
        margin-top: 10px;
        height: 45px;
        width: auto;
    }

    .wrapper-btn-return{
        display: flex;
        justify-content: center;
        align-items: center;
        /* background-color: red; */
        position: absolute;
        width: 100%;
        height: 44px;
        /* top: -80px; */
    }

    .btn-return{
        position: absolute;
        top: 0px;
        /* left: 20px; */
        margin-bottom: 20px;
    }

    /* Estilos para dispositivos móviles con pantalla de 768px a 1024px */
    @media screen and (min-width: 768px) and (max-width: 1024px) {

        .btn-return{
            position: static;
            font-size: 13px;
            margin-bottom: initial;
        }

    }

    /* Estilos para tablets con pantalla de hasta 768px */
    @media screen and (max-width: 768px) {

        .btn-return{
            position: static;
            font-size: 13px;
            margin-bottom: initial;
        }

        .container-submodule{
            gap: 10px;
        }

    }

    /* Estilos para móviles con pantalla de hasta 460px */
    @media screen and (max-width: 460px) {

        .container-submodule{
            gap: 10px;
            padding-bottom: 20px;
        }

        .title-section{
            font-size: 22px;
            /* white-space: nowrap; */
        }

        .btn-form{
            font-size: 13px;
            min-width: initial;
        }

    }

</style>