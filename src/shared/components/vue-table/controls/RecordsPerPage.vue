<script setup>

    //* --> Imports
    import { watchEffect } from 'vue';
    import { useRecordsPerPage } from '../composables/useRecordsPerPage.js';

    const prop = defineProps({
        resetRecord: { type: null }
    })

    const emits = defineEmits([
        'update:modelValue',        
        'page',
    ]);

    const {
        //* Properties
        records,
        //* Methods
        recordsPage,
        resetTable,
    } = useRecordsPerPage( emits );

    watchEffect(() => {
        if( prop.resetRecord !== records ) {
            records.value = prop.resetRecord;
        }
    })

</script>

<template>

    <div class="records-per-page">

        <div class="select-container">
            <select class="select-item" @change="recordsPage" v-model="records">
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </select>
            <i class="material-symbols-rounded icon-select">expand_more</i>
        </div>

    </div>

</template>

<style scoped>

    .records-per-page {
        display: flex;
        align-items: end;
        justify-content: center;
        align-items: center;
        gap: 5px;
    }

    .select-container{
        position: relative;
        display: flex;
        align-items: center;
        justify-content: end;
        padding: 20px 33px;
        border-radius: 10px;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.24);
        opacity: 0.9;
    }

    .select-item {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 4px;
        cursor: pointer;
        padding: 10px;
    }

    .icon-select {
        position: absolute;
        left: 40px;
        z-index: -1;
    }

    .btn {
        height: 45px;
        width: 45px;
        cursor: pointer;
        box-shadow: 2px 3px 7px rgba(0, 0, 0, 0.24);
    }

    .btn-download {
        background-color: #42B883;
        color: #FFFFFF;
        text-transform: uppercase;
        letter-spacing: 5px;
        font-size: 14px;
    }
    .btn-download:hover {
        background-color: #2D9164;
        color: #FFFFFF;
    }
    .icon-refresh {
        font-weight: 300;
        font-size: 22px;
    }
    
</style>