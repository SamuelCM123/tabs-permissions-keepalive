<script setup>

    // Importaciones Generales
    import { onMounted } from 'vue';

    // Importaciones de Stores
    // import { useAuthStore } from '@/shared/stores/auth/useAuthStore.ts';
    import { useTabStore } from '@/shared/components/tabs/stores/useTabStore.ts';

    // Asignaciones de Stores    
    // const AuthStore = useAuthStore();
    const TabStore = useTabStore();

    // Ciclos de vida
    onMounted(() => {
        // TODO: Despliega una vista de inicio
        TabStore.openTabByNameUniversal('websocket-public');
    })

</script>

<template>
    <!-- TODO: BORRAMOS TRANSITION -->
    <router-view v-slot="{ Component }">
        <component :is="Component" />
    </router-view>
</template>

<style scoped>
    
</style>