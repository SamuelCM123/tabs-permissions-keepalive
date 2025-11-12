<script setup>
    
</script>

<template>
    <div class="container">
        <!-- Websocket Layout -->
        <router-view v-slot="{ Component }">
            <keep-alive>
                <component :is="Component"/>
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