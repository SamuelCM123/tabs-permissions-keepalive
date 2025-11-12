<script setup>

    // Definiciones de Props
    const props = defineProps({
        isSidebarCollapse: {type:Boolean},
        collapseSidebar: {type:Function},
    })

</script>

<template>
    <button
        :class="{'rotate': props.isSidebarCollapse}"
        class="sidebar-button" 
        @click="props.collapseSidebar"
        >
        <span class="material-symbols-rounded icon-toggle">arrow_forward_ios</span>
    </button>
</template>

<style scoped>
    .sidebar-button{
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        right: -20px;
        top: 20px;
        background-color: #41B883;
        width: 40px;
        height: 40px;
        z-index: 100;
        border-radius: 50px;
        cursor: pointer;
        pointer-events: all;
        transition: background-color .5s ease;
        box-shadow: rgba(0, 0, 0, 0.191) 1px 1px 10px 5px;
        user-select: none;
    }

    .sidebar-button:hover { background-color: #bfbfbf; }

    .icon-toggle {
        font-size: 14px;
        pointer-events: none;
        color: #FFFFFF;
        transform: rotate(180deg);
    }

    .rotate{
        transform: rotate(180deg);
        transform: all .3s ease;
    }
</style>