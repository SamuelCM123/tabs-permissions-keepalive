<script setup>

    // Importaciones Generales 
    import { onMounted } from 'vue';

    // Importaciones de Composables
    import { useNewTicket } from '@/modules/web-sockets/composables/useNewTicket.ts';

    // Desestructuraciones de Composables
    const {
        // Properties
        lastTicket,

        // Methods
        newTicket,
        createTicket,
    } = useNewTicket();

    // Ciclo de vida
    onMounted(() => {
        newTicket();
    })

</script>

<template>
    <div class="container">
        <table class="table-form">
            <thead>
                <tr>
                    <td>
                        <span v-if="lastTicket" id="lbl-new-ticket">
                            {{ lastTicket }}
                        </span>
                        <span v-else id="lbl-new-ticket">
                            Cargando...
                        </span>
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <button @click="createTicket" class="btn-form">
                            Generar nuevo ticket
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
@import url('../css/style.css');

.container {
    width: 100%;
    height: 100%;
}

.btn-form {
    width: 300px;
}

.table-form{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    height: 100%;
}
</style>