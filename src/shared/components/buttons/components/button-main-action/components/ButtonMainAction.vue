<script setup>

    // Importaciones Generales
    import { ref } from 'vue';
    
    // Definiciones de Props
    const props = defineProps({
        buttonClass: {type: String},
        buttonWidth: {type: String},
        background: {type: null},
        borderColor: {type: null},
        icon: {type: null},
        message: {type: null},
        fontSize: {type: null, default: '24px'},
        isSVG: {type: null},
        btnSubmit: {type: null},
        timeout: {type:Number, default: 1000},
        isLoading: {type:Boolean},
        isLoadingInactive: {type:Boolean, default: false},
        isDisabled: {type:Boolean, default: false},
        loadingBgClass: { type: String },
        loadingBgColor: { type: String }
    })

    let background = ref(props.background);
    let borderColor = ref(props.borderColor);
    let fontSize = ref(props.fontSize);
    let isLoading = ref(false);

    const formSubmit = async () => {

        let response = ref();

        if(props.isLoadingInactive) return;
        if(props.isDisabled) return;
        if(isLoading.value === true) return;

        
        if(isLoading.value === false && (props.btnSubmit ?? false)) {
            isLoading.value = true;
            response.value = await props.btnSubmit(); 
        }
            
        setTimeout(() => {
            isLoading.value = false;
        },props.timeout|4000);

    }

</script>

<template>
    <button 
        @click="formSubmit"
        class="button-main-action"
        :class="[
            !isLoading && !props.isDisabled 
            ? props.buttonClass 
            : '',
            {'disabled-button' : props.isDisabled && !isLoading},
            isLoading && loadingBgClass 
            ? loadingBgClass 
            : {'action-loading' : isLoading },
            // {'action-loading' : isLoading },
        ]"
        :disabled="props.isDisabled || isLoading"
    >

        <Transition name="fade" mode="out-in">

            <span v-if="isLoading" class="wrapper-icon-loading">
                <span class="material-symbols-rounded icon-loading">refresh</span>
            </span>
            <section class="button-icon" v-else>
                <span v-if="props.isSVG" class="icon-action">
                    <slot  name="svg-action"></slot>
                </span>
                <span v-else class="material-symbols-rounded icon-action">{{ props.icon }}</span>
                <p class="tooltip-message">{{ props.message }}</p>
            </section>

        </Transition>

    </button>
</template>

<style scoped>
    @import url('../css/button-main-actions.css');

    .button-main-action {
        width: v-bind(buttonWidth);
        background-color: v-bind(background);
        color: v-bind(background);
        outline: 1px solid v-bind(borderColor);
    }

    .button-main-action:hover{
        background-color: v-bind(background);
        color: #fff;
    }

    .icon-action{
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: v-bind(background);
        color: v-bind(borderColor);
        font-size: v-bind(fontSize);
        transition: all .3s ease;
    }

    .button-main-action:hover .icon-action{
        background-color: v-bind(borderColor);
        color: v-bind(background);
        transition: all .3s ease;
    }

    .wrapper-icon-loading{
        display: flex;
        width: 100%;
        height: 100%;
        background-color: v-bind(borderColor + "99");
    }

    .icon-loading{
        display: flex;
        align-items: center;
        justify-content: center;
        transform: rotate(180deg);
        /* outline: 2px solid black; */
        height: 100%;
        width: 100%;
        color: #fff;
        font-size: v-bind(fontSize);
        animation: spin 1s linear infinite;
    }

    .action-loading {
        background-color: v-bind(loadingBgColor + "99") !important;
        cursor: not-allowed;
    }

    /* DISABLED */
    .action-disabled{
        outline: 1px solid #DCDCDC;
        cursor: not-allowed;
    }

    .action-disabled:hover{
        outline: 1px solid #DCDCDC;
    }

    .action-disabled:hover .icon-action{
        background-color: #DCDCDC;
        color: #A3A3A3;
    }

    .action-disabled .icon-action{
        background-color: #DCDCDC;
        color: #A3A3A3;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

</style>