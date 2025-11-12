<script setup>

    // Importaciones de Stores
    import { useToastStore } from '@/shared/components/toast/stores/useToastStore.ts';

    // Importaciones de Pinia
    import { storeToRefs } from 'pinia';

    // Importaciones Nativas
    import { onMounted, watchEffect } from 'vue';

    // Asignaciones y Desestructuraciones de Stores
    const ToastStore = useToastStore();
    const {
        // ACTIONS
        removeToast,
        handleDeleteToast,
    } = ToastStore;
    const {
        // STATES
        toasts,
    } = storeToRefs(ToastStore);

    // Ciclos de vida
    // onMounted(async () => {

    //     // await loadComponentsStorage();

    //     // Borrar las tabs
    //     // window.addEventListener('resize',() => {
    //         handleDeleteToast();
    //     // });

    // })

</script>

<template>
    <div class="toast-container">
        <div 
            v-for="(toast, index) in toasts" 
            :key="index" 
            :class="[
                'toast', toast.type, toast.progress === 0 ? 'hidden-toast': ''
            ]">
            <div class="toast-content">
                <span :class="['material-symbols-rounded', 'toast-icon',toast.type]">{{ toast.icon }}</span>

                <div class="toast-message-wrapper">
                    <span :class="['title',toast.type]">{{ toast.title }}</span>
                    <span class="message" v-html="toast.message"></span>
                </div>

                <span class="material-symbols-rounded toast-close" @click="removeToast(index)">close</span>
            </div>

            <div class="progress-bar" :style="{ width: toast.progress + '%' }"></div>
        </div>
    </div>
</template>

<style scoped>
.toast-container {
    display: flex;
    flex-direction: column-reverse;
    position: fixed;
    /* height: 100vh; */
    width: auto;
    top: 0px;
    right: 0px;
    padding-top: 20px;
    padding-right: 10px;
    z-index: 9999;
    pointer-events: none;
    /* background-color: red; */
}

.toast {
    background-color: white;
    /* border-left: 5px solid; */
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    padding: 15px 25px 15px 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    position: relative;
    overflow: hidden;
    animation: activeToast .5s cubic-bezier(0.68, -0.55, 0.25, 1.35);
}

@keyframes activeToast {
    0%{
        transform: translateX(100%);
        opacity: 0;
    }
    100% {
        transform: translateX(0%);
        opacity: 1;
    }
}

.toast-content {
    display: flex;
    flex-direction: row;
    max-width: 450px;
    border-radius: 5px;
    opacity: 0.90;
    width: auto;
    height: auto; 
}

.toast-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    font-size: 40px;
}

.toast-icon.success{
    color: #42B883;
}

.toast-icon.error{
    color: #FF4D4D;
}

.toast-icon.info{
    color: #293277;
}

.toast-icon.warning{
    color: #facc15;
}

.toast-message-wrapper {
    display: flex;
    flex-direction: column;
    margin: 0 20px;
}

.toast.success {
    outline: .5px solid #42B883;
}

.toast.error {
    outline: .5px solid #FF4D4D;
}

.toast.info {
    outline: .5px solid #293277;
}

.toast.warning {
    outline: .5px solid #facc15;
}

.title{
    font-size: 16px;
    text-transform: uppercase;
    font-weight: bold;
}

.message {
    color: #2C2C2C;
    font-size: 12px;
}

.title.success {
    color: #42B883;
}

.title.error {
    color: #FF4D4D;
}

.title.info {
    color: #293277;
}

.title.warning {
    color: #facc15;
}

.toast-header {
    display: flex;
    flex-direction: column;
    margin: 0 20px;
}

.toast button {
    background: none;
    border: none;
    cursor: pointer;
    color: gray;
    font-size: 14px;
    margin-left: 10px;
}

.progress-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    background-color: rgba(0, 0, 0, 0.2);
    transition: width 0.1s linear;
}

.toast.success .progress-bar {
    background-color: #42B883;
}

.toast.error .progress-bar {
    background-color: #FF4D4D;
}

.toast.info .progress-bar {
    background-color: #293277;
}

.toast.warning .progress-bar {
    background-color: #facc15;
}

.hidden-toast{
    transform: translateX(120%);
    opacity: 0;
    pointer-events: none;
    transition: all .5s ease;
    animation: inactiveToast 1s forwards;
}

@keyframes inactiveToast {
    100% {
        position: absolute;
        /* transform: translateX(120%); */
    }
}

.toast-close {
    position: absolute;
    z-index: 100000;
    top: 5px;
    right: 5px;
    padding: 5px;
    cursor: pointer;
    opacity: 0.7;
    color: #A4A4A4;
    pointer-events: visibleFill;
    transition: opacity .5s ease;
}

.toast-close:hover { opacity: 1; }

/* @keyframes inactiveToast {
    0% {
        transform: translateX(100%);
        display: none;
    }
    100% {
        transform: translateX(100%);
        display: none;
    }
} */
</style>