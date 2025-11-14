<script setup>
    // Importaciones de Stores
    import { useTabStore } from '@/shared/components/tabs/stores/useTabStore.ts';

    const TabStore = useTabStore();
</script>

<template>
    <div>
        Split Button 1
        <router-link class="btn btn-form" :to="{ name: 'split-button-2', params: { id: 1 } }" replace>Split Button 2 Router link</router-link>
        <button class="btn btn-form" @click="TabStore.openTabByName('split-button-2', { params: { id: 2 } })">Split Button 2 Button</button>
        <router-link class="btn btn-form" :to="{ name: 'loading-button' }" replace>Button Loading(BUTTON)</router-link>
    </div>
</template>

<style scoped>
    
</style>