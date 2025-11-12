<script setup>

    // Definición de Props
    const { actionButton, nameButton } = defineProps({
        nameButton: {type:String},
        actionButton: {type:[Promise,Function]},
    });

    /**
     * Manejador de la animación para el botón de carga
     * @function
     * @name handleButtonAnimation
     * @returns {undefined}
     */
    const handleButtonAnimation = async () => {
            
        // Peticiones generales
        await actionButton();

    }

</script>

<template>
    <button 
        class="btn-return" 
        @click.prevent="handleButtonAnimation">
        <span class="material-symbols-rounded">arrow_back</span>
        <span>Regresar</span>
    </button>
</template>

<style scoped>
    /* Estilos para tablets con pantalla de hasta 768px */
    @media screen and (max-width: 768px) {
        .btn-return{
            position: static;
            font-size: 13px;
            margin-bottom: 20px;
        }
    }
</style>