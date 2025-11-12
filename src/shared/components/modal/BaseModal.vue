<script setup>

    // Definición de Props
    const props = defineProps({
        modalConfig: { type: Object },
        width: { type: String },
        heigth: { type: String },
        widthMobile: { type: String },
        heigthMobile: { type: String }
    });

    const { modalConfig } = props;

</script>

<template>
    <div class="modal-container">
        <div class="modal-wrapper">
            <div class="btn--close" v-show="modalConfig.btnClose.show">
                <slot name="close"></slot>
            </div>
            <div class="header" v-show="modalConfig.head.show">
                <slot name="header"></slot>
            </div>
            <div class="body" v-show="modalConfig.body.show">
                <slot name="body"></slot>
            </div>
            <div class="footer" v-show="modalConfig.footer.show">
                <slot name="footer"></slot>
            </div>
        </div>
    </div>
</template>

<style>

/** Base Modal **/

.modal-container {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 100%;
    padding:20px 0; 

    transition: all .5s ease;
    background-color: rgba(0, 0, 0, 0.24);
    z-index: 2;
    overflow: auto;
}

.btn--close {
    position: relative;
    width: 100%;
}

.header {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}

.body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}

.footer {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
}

.modal-wrapper {
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #FFFFFF;
    padding:20px 20px;
    width:  v-bind(widthMobile);
    height: v-bind(heigthMobile);
    border-radius: 10px;
}

/* ESTILOS PARA ESCRITORIO */

@media screen and (min-width: 768px) {
    .modal-wrapper {
        width: v-bind(width);
        height: v-bind(heigth);
    }
}
</style>