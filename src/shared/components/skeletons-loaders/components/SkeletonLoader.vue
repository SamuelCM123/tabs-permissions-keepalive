<script setup>

    // Definición de Props
    const props = defineProps({
        isActive: {type: Boolean, default: false},
    });

</script>

<template>
    <div class="container-skeleton-loader">
        <slot name="content-skeleton"></slot>
    </div>
</template>


<style scoped>
    .container-skeleton-loader {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

</style>
