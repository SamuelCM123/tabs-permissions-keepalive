<script setup>

    defineProps({
        title: {type: String},
        description: {type: String},
    });

</script>

<template>
    <div class="mg-container">
        <div class="button">
            <div class="arrow-card">
                <span class="material-symbols-rounded icon">arrow_back_ios</span>
            </div>
            <div class="flex-wrapper">
                <p class="text title">{{ title }}</p>
                <p class="text">{{ description }}</p>
                <slot name="btn-container">

                </slot>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .mg-container {
        position: fixed;
        top: 47%;
        right: 0;
        transform: translateX(270px);
        transition: all 0.5s;
    }

    .mg-container:hover {
        transform: translateX(0);
        transition: all 0.5s;
    }

    .button {
        display: flex;
        align-items: center;
        width: auto;
        color: white;
        text-decoration: none;
        height: 100%;
        max-width: 300px;
        -webkit-transition: max-width 0.5s;
        transition: max-width 0.5s;
        transition: ease 0.5s;
    }

    .arrow-card {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #293277;
        border-radius: 8px 0 0 8px;
        cursor: pointer;
    }

    .flex-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #293277;
        padding: 10px;
        border-radius: 8px 0 0 8px;
    }
    
    .icon {
        font-size: 16px;
        height: 40px;
        width: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .title {
        font-size: 18px;
        letter-spacing: 0;
    }

    .text {
        text-align: center;
        font-size: 13px;
    }

    .btn {
        margin: 10px 0px;
        background-color: white;
        color: #293277;
        width: 80px;
        height: 30px;
        font-size: 13px;
        /* font-weight: bold; */
        cursor: pointer;
    }

</style>