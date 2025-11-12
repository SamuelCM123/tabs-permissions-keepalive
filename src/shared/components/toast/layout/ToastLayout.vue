<script setup>

    // Importaciones Nativas
    import { defineAsyncComponent } from 'vue';
    
    // Importaciones de Stores
    import { useToastStore } from '@/modules/toast/stores/useToastStore.js';

    // Asignaciones y Desestructuraciones de Stores
    const ToastStore = useToastStore();

    // Componentes
    const Toast = defineAsyncComponent(() => import("@/modules/toast/components/Toast.vue"));

    const openToast = () => {
        ToastStore.openToast({
            type: 'info',
            title: 'Configuración No Editada',
            message: 'No se detectaron cambios en su formulario',
            duration: 5000,
        });
    }

</script>

<template>
    <div class="container-toast">
        <button class="btn-form" @click="openToast">Abrir Modal</button>
        <Toast></Toast>
    </div>
</template>

<style scoped>
    .container-toast{
        display: flex;
        justify-items: center;
        align-items: center;
        height: 100%;
    }

    .btn-form{
        max-width: 300px;
    }
</style>