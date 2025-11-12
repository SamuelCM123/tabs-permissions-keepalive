<script setup>
    // Importaciones nativas
    import { onMounted } from "vue";

    // Importaciones de Pinia
    import { storeToRefs } from "pinia";

    // Importaciones de Stores
    import { useButtonUpDownStore } from '@/shared/components/buttons/stores/useButtonUpDownStore.ts';

    // Asignaciones y desestructuraciones de Stores
    const ButtonUpDownStore = useButtonUpDownStore();
    const { isShowButtonUp, isShowButtonDown } = storeToRefs( ButtonUpDownStore );
    const { 
        scrollUp, 
        scrollDown,
        showButtonScroll, 
        observer,
    } = ButtonUpDownStore;

    // Ciclos de vida
    onMounted(()=>{

        // Aparecer y desaparecer boton para scroll.
        window.addEventListener('scroll',showButtonScroll);
        window.addEventListener('resize',showButtonScroll);

        // Observa constantemente el cambio del elemento HTML general
        observer.observe(document.documentElement, { subtree: true, childList: true });
    })

</script>

<template>
    <div class="container-buttons" v-if="isShowButtonUp || isShowButtonDown">
        <div class="container-button-up" :class="{'show-button-up': isShowButtonUp}" @click="scrollUp">
            <span class="material-symbols-rounded">
                vertical_align_top
            </span>
        </div>
        <div class="container-button-up" :class="{'show-button-bottom': isShowButtonDown}" @click="scrollDown">
            <span class="material-symbols-rounded">
                vertical_align_bottom
            </span>
        </div>
    </div>
</template>

<style scoped>
    .container-buttons{
        display: flex;
        flex-direction: column;
        position: fixed;
        bottom: 45%;
        right: 2%;
        gap: 20px;
        user-select: none;
        z-index: 1;
    }

    .container-button-up{
        display: flex;
        align-items: center;
        justify-content: center;
        border: solid 2px #293277;
        /* background-color: #293277ad; */
        background-color: #fff;
        /* color: #fff; */
        color: #293277;
        width: 35px;
        height: 35px;
        border-radius: 30px;
        opacity: 0;
        pointer-events: none;

        cursor: pointer;
        transition: all .5s ease;
    }

    .container-button-up:hover{
        /* background-color: #293277ad; */
        background-color: #293277;
        color: #fff;
        transition: all .5s ease;
    }

    .show-button-up{
        pointer-events: initial;
        opacity: 1;
        transition: all .5s ease;
    }

    .show-button-bottom{
        pointer-events: initial;
        opacity: 1;
        transition: all .5s ease;
    }

</style>