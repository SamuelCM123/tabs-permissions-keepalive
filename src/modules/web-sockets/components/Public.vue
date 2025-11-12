<script setup>

    // Importaciones Generales
    import { onMounted } from 'vue';

    // Importaciones de Composables
    import { usePublic } from '@/modules/web-sockets/composables/usePublic.ts';

    // Desestructuraciones de Composables
    const {
        // Properties
        ticketPending,
        ticketProcess,

        // Methods
        getTicketOnProcess,
        getTicketsPending,
        handleIncomingTicketWork,
        wsService,
    } = usePublic();

    // Ciclos de vida
    // onMounted(() => {
    //     getTicketOnProcess();
    //     getTicketsPending();
    //     wsService.connect();
    //     wsService.subscribe('on-working-on-ticket', handleIncomingTicketWork);
    // })

</script>

<template>
    <table>
        <tbody>
            <tr class="wrapper-tr-ticket">
                <td valign="middle" class="ticket-current">
                    <span id="lbl-ticket-01" class="ticket-current-number">Ticket {{ ticketPending[0]?.number }}</span>
                    <br>
                    <!-- TODO: Ticket en Proceso -->
                    <span id="lbl-desk-01" class="ticket-current-desk">Escritorio {{ ticketPending[0]?.handleAtDesk }}</span>
                </td>
                <!-- TODO: Ticket en cola -->
                <td class="wrapper-ticket-right">
                    <table>
                        <tbody>

                            <tr v-for="(ticket, index) in ticketPending.slice(1, 4)" :key="index">
                                <td>
                                    <span id="lbl-ticket-02" class="ticket-secondary">Ticket {{ ticket?.number }}</span>
                                    <br>
                                    <span id="lbl-desk-02">Escritorio {{ ticket?.handleAtDesk }}</span>
                                </td>
                            </tr>
                            <!-- <tr>
                                <td>
                                    <span id="lbl-ticket-03" class="ticket-secondary">Ticket Y</span>
                                    <br>
                                    <span id="lbl-desk-03">Escritorio Y</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span id="lbl-ticket-04" class="ticket-secondary">Ticket Z</span>
                                    <br>
                                    <span id="lbl-desk-04">Escritorio Z</span>
                                </td>
                            </tr> -->
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>
    @import url('../css/style.css');

    .wrapper-tr-ticket{
        display: flex;
        width: 100%;
        height: 100%;
    }

    .wrapper-ticket-right{
        width: 50%;
    }

    table{
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    tbody{
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
    }

    tr{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }

    td{
        display: flex;
        flex-direction: column;
        align-content: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }
</style>