<script setup>

    // Importaciones Nativas
    import { defineAsyncComponent } from 'vue';
    
    // Componente
    const Sidebar = defineAsyncComponent(() => import('@/shared/components/sidebar/components/Sidebar.vue'));

</script>

<template>
    <div class="container-sidebar">
        <Sidebar></Sidebar>
    </div>
</template>

<style scoped>
    
</style>