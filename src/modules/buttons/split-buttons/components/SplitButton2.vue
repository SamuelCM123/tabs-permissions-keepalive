<script setup>
    
    // Importaciones de Enrutador
    import { useRouter, useRoute } from 'vue-router';
    
    const router = useRouter();
    const route = useRoute();

</script>

<template>
    <div>
        Split Button 2
        <router-link class="btn btn-form" :to="{ name: 'split-button-1' }" replace>Split Button 1</router-link>
        ID: {{ route.params.id }}
    </div>
</template>

<style scoped>
    
</style>