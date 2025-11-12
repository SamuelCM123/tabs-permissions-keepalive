<script setup>

</script>

<template>
    <div>
        Buttons Action Layout
        <router-view v-slot="{ Component }">
            <keep-alive>
                <component :is="Component"/>
            </keep-alive>
        </router-view>
    </div>
</template>

<style scoped>
    
</style>