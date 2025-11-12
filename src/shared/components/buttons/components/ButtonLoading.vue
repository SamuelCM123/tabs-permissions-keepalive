<script setup>

    // Importaciones Generales
    import { ref } from 'vue';
    
    // Definición de Props
    const props = defineProps({
        nameButton: {type:String},
        actionButton: {type:[Promise,Function]},
        timeBtn: {type: Number, default: 1000},
        isDisabled: {type:null, default: false},
        background: {type: null, default: '#475097'},
        borderColor: {type: null, default: '#475097'},
        hoverColor: {type: null, default: '#293277'},
        width: {type: null, default: '150px'},
        minWidth: {type: null, default: 'initial'},
        maxWidth: {type: null, default: 'initial'},
        height: {type: null, default: '50px'},
        padding: {type: null, default: '0px 20px'},
        isLoadingInactive: {type: null},
        icon: {type: null},
        iconSize: {type: null, default: '20px'},
    })
    
    /**
     * @type {import('vue').Ref<boolean>} -Controla la animación de carga al realizar peticiones
    */
    let stateButtonLoad = ref(false);

    /**
     * Manejador de la animación para el botón de carga
     * @function
     * @name handleButtonAnimation
     * @returns {undefined}
     */
    const handleButtonAnimation = async () => {
            
        // console.log('props.isDisabled:',props.isDisabled);

        if(props.isLoadingInactive) return;
        if(props.isDisabled) return;
        if(stateButtonLoad.value) return;

        // Habilitar animación de carga en el botón
        stateButtonLoad.value = true;

        // Peticiones generales
        if(props.actionButton ?? false) await props.actionButton();
        
        // Deshabilitar animación de carga en el botón
        setTimeout(() => {
            stateButtonLoad.value = false
        }, props.timeBtn|4000);

    }

</script>

<template>
    <div class="wrapper-btn" :class="{'btn-not-allowed': props.isDisabled}">

        <button 
            class="btn-form-lg" 
            :class="[
                {'btn-loading': stateButtonLoad},
                {'btn-form-blocked': props.isDisabled}
            ]" 
            :disabled="stateButtonLoad" 
            type="submit"
            @click.prevent="handleButtonAnimation"
        >
            <Transition name="fade" mode="out-in">
                    <span v-if="stateButtonLoad" class="wrapper-icon-loading">
                        <div class="material-symbols-rounded icon-loading">refresh</div>
                    </span>
                    <span v-else class="wrapper-btn-content white-s">
                        <span v-if="props.icon" class="material-symbols-rounded icon-btn">{{ props.icon }}</span>
                        <span>{{ props.nameButton }}</span>
                    </span>
            </Transition>
        </button>

    </div>
</template>

<style scoped>

    .fade-enter-active,
    .fade-leave-active {
        transition: all .1s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }

    .wrapper-btn-content{
        display: flex;
        align-items: center;
        gap: 5px;
    }

    .icon-btn{
        font-size: v-bind(iconSize);
    }

    .wrapper-btn{
        width: v-bind(width);
        height: v-bind(height);
        min-width: v-bind(minWidth) !important;
        max-width: v-bind(maxWidth);
        min-height: 45px;
        max-height: 50px;
    }

    .btn-form-lg{
        display: flex;
        justify-content: center;
        align-items: center;
        /* margin: 0 auto; */
        border-radius: 5px;
        /* width: 400px; */
        color: #ffffff;
        font-size: 16px;
        letter-spacing: 2px;
        cursor: pointer;
        text-transform: uppercase;
        width: v-bind(width);
        height: v-bind(height);
        min-width: v-bind(minWidth) !important;
        max-width: v-bind(maxWidth);
        min-height: 45px;
        max-height: 50px;
        padding: v-bind(padding);
        background-color: v-bind(background);
        box-shadow: 2px 3px 7px rgba(0, 0, 0, 0.24);
        transition: all .3s ease;
    }

    .btn-loading{
        cursor: not-allowed;
        background-color: v-bind(background+'99');
    }

    .btn-loading:hover{
        background-color: v-bind(background+'99') !important;
    }

    .btn-form-lg:hover{
        background-color: v-bind(hoverColor);
        transition: all .3s ease;
    }

    .btn-form-blocked {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        height: 50px;
        /* max-width: 400px; */
        /* min-width: 150px; */
        /* width: 100%; */
        color: #929292;
        font-size: 16px;
        letter-spacing: 2px;
        /* margin-top: 15px; */
        text-transform: uppercase;
        transition: all .1s ease;
        background-color: #dddddd;
        pointer-events: none;
        box-shadow: 2px 3px 7px rgba(0, 0, 0, 0.24);
        user-select: none;
    }

    .btn-form-blocked:hover {
        background-color: #dddddd;
        cursor: no-drop;
    }

    .btn-form-blocked:focus{
        background-color: #dddddd;
    }

    .btn-not-allowed{
        cursor: not-allowed;
    }

    .wrapper-icon-loading{
        display: flex;
        width: 100%;
        height: 100%;
        background-color: v-bind(bordebrColor + "99");
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
        font-size: 24px;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    /* Estilos para dispositivos móviles con pantalla de 768px a 1024px */
    @media screen and (min-width: 768px) and (max-width: 1024px) {

    }

    /* Estilos para tablets con pantalla de hasta 768px */
    @media screen and (max-width: 740px) {


    }

    /* Estilos para móviles con pantalla de hasta 460px */
    @media screen and (max-width: 460px) {

    }
</style>