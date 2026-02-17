<script setup>

</script>

<template>
    <!-- TODO: Hacer uso de keep-alive y key es route.fullPath -->
    <router-view v-slot="{ Component, route }">
        <keep-alive>
            <component :is="Component" :key="route.fullPath" />
        </keep-alive>
    </router-view>
</template>

<style scoped></style>