<script setup>

    // Importaciones Generales
    import { onMounted } from 'vue';
    

    onMounted(() => {
        console.log('websockets montado');
    })
</script>

<template>
    <div class="container">
        <!-- TODO: Hacer uso de keep-alive -->
        <router-view v-slot="{ Component }">
            <keep-alive>
                <component 
                :is="Component" 
                />
            </keep-alive>
        </router-view>
    </div>
</template>

<style scoped>
    .container{
        /* display: flex; */
        width: 100%;
        height: 100%;
    }
</style>