<script setup>

    // Importaciones Generales
    import { onMounted, onUnmounted } from 'vue';

    // Importaciones de Composables
    import { useDesk } from '@/modules/web-sockets/composables/useDesk.ts';

    // Desestructuraciones de Composables
    const {
        // Properties
        ticketPending,
        id_desk,
        workingTicket,

        // Methods
        loadInitialCount,
        // WsStore,
        handleIncomingMessages,
        wsService,
        getTicket,
        finishTicket,
    } = useDesk();

    // Ciclo de vida
    onMounted(() => {
        loadInitialCount();
        // wsService.connect();
        // wsService.subscribe('on-ticket-count-changed', handleIncomingMessages);
        
    })

    // onUnmounted(() => {
    //     wsService.unsubscribe('on-ticket-count-changed');
    // })

</script>

<template>
    <div class="container">
        <h1 class="title-section">Escritorio {{ id_desk }}</h1>
        <hr>
        <div class="row">
            <div class="wrapper-left">
                <h4 class="title-header">Atendiendo a 
                    <small v-if="workingTicket" class="text-primary">{{ workingTicket }}</small>
                    <small v-else="workingTicket" class="text-primary">...</small>
                </h4>

                <div class="button-container">
                    <button class="btn-form" @click="getTicket">
                        Atender siguiente
                    </button>
                    <button class="btn-form" @click="finishTicket">
                        Terminar
                    </button>
                </div>
            </div>

            <div class="wrapper-right">
                <h4 class="title-header">En cola</h4>

                <div v-if="ticketPending === 0" class="alert-info">
                    <span>Ya no hay tickets</span>
                </div>

                <h1 v-else class="lbl-pending">{{ ticketPending }}</h1>
            </div>
        </div>
        <router-link :to="{ name: 'websocket-index-layout' }" class="btn-form" style="width: 300px;">Regresar</router-link>
    </div>
</template>

<style scoped>

    .container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        gap: 10px;
    }

    .title-section{
        font-size: 40px;
        font-weight: 500;
    }

    hr{
        width: 800px;
        height: 1px;
        background-color: #ddd;
    }

    .row{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 800px;
        gap: 20px;
        /* height: 100%; */
    }

    .wrapper-left,
    .wrapper-right
    {
        display: flex;
        flex-direction: column;
        /* justify-content: center; */
        align-items: center;
        gap: 10px;
        width: 100%;
        height: 100%;
        text-align: center;
    }

    .btn-form{
        padding: 5px;
        font-size: 12px;
    }

    .alert-info{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 5px;
        padding: 5px;
        background-color: #ddd;
        border-radius: 5px;
        height: 60px;
        width: 200px;
    }

    .lbl-pending{ 
        font-size: 25px;
        font-weight: 500;
        margin-top: 10px;
    }

    .title-header{
        font-size: 20px;
        font-weight: 500;
    }

    .text-primary{
        color: #0076fd;
        font-size: 22px;
    }

    @media screen and (max-width: 1000px) {
        
        .row{
            display: flex;
            flex-direction: column;
            width: 80%;
        }

        hr{
            width: 80%;
        }
    }

</style>