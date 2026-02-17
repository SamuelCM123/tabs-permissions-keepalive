<script setup>
    //* --> Imports
    import { watchEffect } from 'vue';
    import { usePagination } from '../composables/usePagination';

    // Definiciones de Props
    const props = defineProps({
        recordsPerPage: { type: Number },
        totalRecords  : { type: Number },
        page          : { type: Number },
        getData       : { type: Function },
    })

    // Definiciones de Emits
    const emits = defineEmits(['update:modelValue']);

    const {
        //* States
        pagination,
        page,
        recordsPerPage,

        //* Getters
        getPagination,
        
        //* Actions
        firtPage,
        previousPage,
        numberPage,
        nextPage,
        lastPage
    } = usePagination( emits, props );

    // Watchers
    watchEffect(() => {
        if( props.recordsPerPage !== undefined ){
            recordsPerPage.value = props.recordsPerPage;
        }
        if(props.page !== page) page.value = props.page;

        getPagination(props.totalRecords);
    });
    

</script>

<template>

    <div class="pagination-container" v-show="pagination !== 0">

            <button class="material-symbols-rounded btn-icon"
                @click="firtPage" 
                :class="{'disabled-row': page === 1}"
                :disabled="page === 1">
                keyboard_double_arrow_left
            </button>

            <button class="material-symbols-rounded btn-icon" 
                @click="previousPage" 
                :class="{'disabled-row': page === 1}"
                :disabled="page === 1">
                chevron_left
            </button>

            <template v-for="(number, i) in pagination" :key="i">
                <button
                    class="btn-pagination"
                    v-if="number < page + 3 && number > page - 3"
                    @click="numberPage(i)"
                    :class="{'active-page': page === (i+1)}">
                    {{ number }}
                </button>   
            </template>

            <button class="material-symbols-rounded btn-icon" 
                @click="nextPage"
                :class="{'disabled-row': page === pagination}"
                :disabled="page === pagination">
                chevron_right
            </button>

            <button class="material-symbols-rounded btn-icon"
            @click="lastPage"
            :class="{'disabled-row': page === pagination}"
            :disabled="page === pagination">
                keyboard_double_arrow_right
            </button>

    </div>

</template>

<style scoped>

    .pagination-container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: 20px 0px;
        gap: 5px;
    }
    
    .btn-icon {
        color: #c1c1c1;
        cursor: pointer;
    }

    .disabled-row{ cursor: not-allowed; }

    .btn-pagination {
        width: 30px;
        height: 30px;
        font-size: 12px;
        border-radius: 25px;
        background-color: #ffffff;
        color: #9b9999;
        cursor: pointer;
        transition: box-shadow .3s ease;
    }

    .btn-pagination:hover { box-shadow: 0 0 5px #c1c1c1; }
    
    .active-page {
        background-color: #293277;
        color: #ffffff;
    }

    @media screen and (max-width: 768px) {

        .pagination-container{
            padding: 0px 0px;
        }
    }

    /* Estilos para móviles con pantalla de hasta 460px */
    @media screen and (max-width: 460px) {

        .pagination-container{
            padding: 0px 0px;
        }

    }  
    
</style>
