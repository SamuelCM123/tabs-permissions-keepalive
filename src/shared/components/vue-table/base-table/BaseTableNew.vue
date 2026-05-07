<script setup>

    // Importaciones Generales
    import { defineAsyncComponent } from 'vue';

    // Definiciones de Props
    const props = defineProps({
        tableSkeletonLoad: { type: Boolean },
        numberColumns: { type: Number, default: 1 },
        isMobile: { type: Boolean, default: true },
        // TODO: Definir el max-width para cambiar de desktop a mobile
        // maxWidthMobile: { type: Number, default: '768px' },
    })

    // Componentes
    const TableForDesktop = defineAsyncComponent(() => import('@/shared/components/vue-table/components/TablerForDesktop.vue'));
    const TableForMobile = defineAsyncComponent(() => import('@/shared/components/vue-table/components/TableForMobile.vue'));
    const TableSkeleton = defineAsyncComponent(() => import('@/shared/components/vue-table/components/TableSkeletonNew.vue'));
    const SkeletonMobile = defineAsyncComponent(() => import('@/shared/components/skeletons-loaders/components/SkeletonMobile.vue'));

</script>

<template>
    <div class="table-desktop">
        <Transition name="fade">
            <!--* SKELETON -->
            <template v-if="props.tableSkeletonLoad">
                <TableSkeleton :header="props.numberColumns" :body="props.numberColumns"></TableSkeleton>
            </template>
            <template v-else>
                
                <TableForDesktop>
                    <template #tbody>
                        <slot name="thead-desktop"></slot>
                        <slot name="tbody-desktop"></slot>
                    </template>
                </TableForDesktop>
            </template>
        </Transition>
    </div>
    <div class="table-mobile">
        <Transition name="fade">
            <template v-if="props.tableSkeletonLoad">
                <!-- <TableSkeleton :header="props.numberColumns" :body="props.numberColumns"></TableSkeleton> -->
                <SkeletonMobile></SkeletonMobile>
            </template>
            <template v-else>
                <TableForMobile v-if="props.isMobile">
                    <template #content-mobile>
                        <slot name="content-mobile"></slot>
                    </template>
                </TableForMobile>
            </template>
        </Transition>
    </div>
</template>

<style scoped>
    .table-mobile {
        display: none;
        max-width: 100%;
    }

    .table-row-wrapper-mobile {
        max-width: 100%;
    }

    .container-table {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    /* Controlls */
    .controlls {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        margin-bottom: 10px;
        gap: 30px;
    }

    .column-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        align-items: center;
    }

    .table-column {
        cursor: pointer;
        padding: 8px;
        border-bottom: 1px solid #DDDDDD;
        transition: color .5s ease;
    }

    .table-column:hover {
        color: #6a73b3;
    }

    .icon-sort {
        font-size: 14px;
        font-weight: 400;
        color: #A3A3A3;
    }

    .no-filter {
        cursor: initial;
    }

    .no-filter:hover {
        color: #293277;
    }

    .table-row-mobile {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 4px 0px;
        max-width: 100%;
        /* overflow: hidden; */
    }

    .table-row-mobile:last-of-type {
        border: none;
    }

    .table-row-value-mobile {
        display: flex;
        font-size: 14px;
        gap: 7px;
        padding: 1px 0px;
        width: 100%;
        max-width: 100%;
        /* overflow: hidden; */
    }

    .table-column-wrapper {
        background-color: #FFFFFF;
        color: #293277;
        text-align: center;
        font-weight: bold;
        font-size: 15px;
    }

    .container-table-wrapper {
        display: flex;
        min-height: 80px;
        position: relative;
    }

    .flex-wrapper {
        display: flex;
        align-items: center;
        gap: 5px;
    }

    .table-desktop {
        width: 100%;
        /* overflow: scroll; */
    }

    /* Estilos para dispositivos móviles con pantalla de 768px a 1024px */
    /* @media screen and (min-width: 768px) and (max-width: 1024px) {} */

    /* TODO: Investigar como pasar variables al max-width del media query */
    /* Estilos para tablets con pantalla de hasta 768px */
    @media screen and (max-width: 768px) {

        .table-desktop {

            display: none;

        }

        .table-mobile {

            display: flex;
            flex-direction: column;
            width: 100%;
            max-width: 100%;
            text-align: left;

        }

        .status {
            display: initial;
        }

    }
</style>