<script setup>

    // Definiciones de props
    const props = defineProps({
        data: {type: null},
    })

</script>

<template>
    <div class="container-submodule">
        
        <div class="container-submodule-title">
            <h4>Agregar Perfil</h4>
            {{ props.data }}
        </div>

    </div>
</template>

<style scoped>

    @import url('../css/formProfile.css');

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