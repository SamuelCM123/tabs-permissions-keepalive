
<script setup>

    // Definiciones de Props
    const props = defineProps({
        image: { type: String },
        icon: { type: String },
        text: { type: String }
    });

</script>

<template>
    <div class="container-card-add">

        <!--* ICONO DE CARD -->
        <span class="material-symbols-rounded icon-card" v-if="props.icon !== undefined">
            {{ props.icon }}
        </span>

        <!--* IMAGEN DE CARD -->
        <img 
            v-if="props.image !== undefined"
            :src="props.image" 
            alt="svg image" 
            class="svg-card"
            >

        <!--* DESCRIPCIÓN DE CARD  -->
        <p class="description-card">{{ props.text }}</p>
        
    </div>
</template>

<style>
    .container-card-add {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 200px;
        height: 260px;
        border-radius: 25px;
        outline: 2px solid #293177;
        transition: ease .3s all;
        cursor: pointer;
        user-select: none;
    }

    .container-card-add:hover {
        opacity: 0.6;
        box-shadow: 2px 3px 7px rgba(0, 0, 0, 0.24);
    }

    .icon-card {
        font-size: 100px;
    }

    .svg-card {
        height: 100px;
    }

    .description-card {
        margin-top: 10px;
    }
</style>