<script setup>

    //* --> Props
    const props = defineProps({
        header: { type: null, default: 1 },
        body: { type: null, default: 5 },
        rows: { type: Array },
        width: { type: String }
    });

</script>

<template>
    <div class="container-table-skeleton">
        <div class="accordion-skeleton" v-for="(head, i) in props.body" :key="i">
            <div class="loading"></div>
        </div>
    </div>

</template>

<style scoped>
    .container-table-skeleton {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        /* outline: 1px solid #DDDDDD; */
        position: absolute;
        top: 0;
        left: 0;
        gap: 20px;
        z-index: 2;
        width: v-bind(width);
        width: 100%;
        /* border-radius: 10px; */
    }

    .accordion-skeleton {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        width: 100%;
        padding: 10px;
        height: 60px;
        outline: 1px solid #DDDDDD;
        border-radius: 5px;
    }

    .loading {
        z-index: 100;
        position: relative;
        background-color: #f5f5f5;
        overflow: hidden;
        border-radius: 3px;
        width: 100%;
        height: 30px;
    }

    .loading::after {
        display: block;
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        transform: translateX(-100%);
        animation: 1.4s loading linear 0.8s infinite;
        background: linear-gradient(90deg, transparent, #DDDDDD, transparent);
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
        transform: translateX(-100%);
        /* z-index: 1; */
    }

    @keyframes loading {
        0% {
            transform: translateX(-100%);
        }

        60% {
            transform: translateX(100%);
        }

        100% {
            transform: translateX(100%);
        }
    }

</style>