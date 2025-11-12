<script setup>
    
    // Definiciones de Props
    const props = defineProps({
        pathImage: {type: String},
        isSidebarCollapse: {type: Boolean},
    })

</script>

<template>
    <div class="sidebar-logo">
        <a><img src="../../../../assets/img/cistem.svg" height="50px" alt="Logo" class="logo"></a>
    </div>
</template>

<style scoped>
    .sidebar-logo{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 83px;
        width: 100%;
        user-select: none;
    }

    .logo { 
        width: 150px; 
        opacity: 1;
        transition: all 1.5s ease;
    }

    .collapse .logo{
        opacity: 0;
        transition: opacity .3s ease;
    }
</style>