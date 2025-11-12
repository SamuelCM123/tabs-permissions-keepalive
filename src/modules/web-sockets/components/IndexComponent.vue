<script setup>

    // Importaciones Generales
    import { onMounted, ref } from 'vue';

    // Importaciones de Composables
    import { useIndexComponent } from '@/modules/web-sockets/composables/useIndexComponent.ts';

    // Importaciones de Stores
    import { useTabStore } from '@/shared/components/tabs/stores/useTabStore.ts';

    // Asignaciones de Stores
    const TabStore = useTabStore();

    // Desestructuraciones de Composables
    const {
        // Properties
        fieldDesk,
        ticketWorkingOn,

        // Methods
        wsService,
        getTicketWorkingOn,
        handleTicketsTile,
    } = useIndexComponent();

    onMounted(() => {
        getTicketWorkingOn();
        // wsService.connect();
        // wsService.subscribe('on-ticket-tile', handleTicketsTile);
    })

</script>

<template>
    <div class="container">
        <h1 class="title-section">Programa de Colas</h1>

        <div class="row">
            <div class="wrapper-buttons">

                <router-link class="btn-form" :to="{ name:'websocket-public' }">Pantalla pública</router-link>
                <router-link class="btn-form secundary" :to="{ name: 'websocket-new-ticket' }">Crear Tickets</router-link>
                <router-link class="btn-form secundary" :to="{ name: 'websocket-index-inter' }" replace>Index Inter</router-link>

            </div>
            <div class="btn-form" @click="() => console.log('openComponents:', TabStore.openComponents)">
                Visualizar
            </div>
            <div class="wrapper-form">
                
                <p>Tickets en Proceso</p>
                <div class="container-tickets">

                    <div 
                        class="wraper-ticket" v-for="(ticket, i) in ticketWorkingOn"
                        :key="i"
                        >
                        <!-- <p class="lbl-pending">{{ ticket }}</p> -->
                        <p>ID: {{ ticket.id }}</p>
                        <p>Escritorio: {{ ticket.handleAtDesk }}</p>
                        <p>No. Ticket: {{ ticket.number }}</p>
                        <p>Creado el: {{ ticket.created_at }}</p>
                        <p>Finalizado: {{ ticket.done ? 'Si' : 'No' }} </p>
                    </div>

                </div>

                <keep-alive>
                    <input v-model="fieldDesk" name="escritorio" type="text" class="input-form" placeholder="No. Escritorio" autofocus>
                </keep-alive>

                <router-link 
                    :to="{ name: 'websocket-desk', params: { id_desk: fieldDesk } }" 
                    type="submit" 
                    class="btn-form"
                    replace
                    >
                    Ingresar
                </router-link>
            </div>
        </div>
    </div>
</template>

<style scoped>

    .container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        height: 100%;
        gap: 20px;
    }

    .title-section{
        text-align: center;
        font-size: 40px;
        font-weight: 500;
    }

    .wrapper-buttons{
        display: flex;
        flex-direction: column;
        width: 300px;
        gap: 10px;
    }

    .wrapper-form{
        display: flex;
        flex-direction: column;
        width: 300px;
        gap: 10px;
    }

    .container-tickets{
        height: 300px;
        max-height: 290px;
        outline: 2px solid #969696;
        overflow: auto;
    }

    .wraper-ticket{ 
        padding: 5px;
        border-bottom: .5px solid #969696;
    }

    .row{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 100%;
        gap: 40px;
        /* height: 100%; */
    }

    .btn-form{
        white-space: nowrap;
        margin: initial;
        width: 300px;
    }

    .secundary{
        background-color: #7a7a7a;
        color: #fff;
    }

    @media screen and (max-width: 1000px) {

        .row{
            display: flex;
            flex-direction: column;
        }
    }

</style>