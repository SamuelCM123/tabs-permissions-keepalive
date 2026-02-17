<script setup>

    //* --> Props
    const props = defineProps({
        header: { type: null, default: 1 },
        body: { type: null, default: 10 },
        rows: { type: Array },
        width: { type: String }
    });

</script>

<template>
    <div class="container-table-skeleton">
        <table class="table-skeleton">

            <thead>

                <tr>
                    <td v-for="(head, i) in props.header" :key="i">
                        <div class="loading table-head"></div>
                    </td>
                </tr>

            </thead>

            <tbody>

                <tr 
                    class="body-skeleton" v-for="(body, i) in props.body" :key="i">
                    <td colspan="9">
                        <div class="loading table-body"></div>
                    </td>
                </tr>
            </tbody>

        </table>
    </div>

</template>

<style scoped>
    .container-table-skeleton {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        outline: 1px solid #DDDDDD;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        width: v-bind(width);
        width: 100%;
        /* border-radius: 10px; */
    }

    .loading {
        position: relative;
        background-color: #f5f5f5;
        overflow: hidden;
        border-radius: 3px;
    }

    .loading::after {
        display: block;
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        transform: translateX(-100%);
        animation: 1.4s loading linear 0.8s infinite;
        background: linear-gradient(90deg, transparent, #DDDDDD, transparent);
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
        transform: translateX(-100%);
        /* z-index: 1; */
    }

    @keyframes loading {
        0% {
            transform: translateX(-100%);
        }

        60% {
            transform: translateX(100%);
        }

        100% {
            transform: translateX(100%);
        }
    }

    .table-skeleton {
        background-color: #fff;
        height: auto;
        width: 100%;
        overflow: hidden;
        border-radius: 3px;
    }


    .body-skeleton {
        border-top: 1px solid #DDDDDD;
    }

    .table-head {
        display: none;
        height: 22px;
        /* margin: 1rem; */
    }

    .table-body {
        height: 22px;
        /* margin: 25px; */
    }

    tr{
        display: flex;
        flex-direction: row;
        height: 40px;
    }

    td{
        display: grid;
        align-items: center;
        height: 40px;
        width: 100%;
        padding: 10px;
    }

    @media screen and (min-width: 1000px) {
        .table-head {
            display: block;
            height: 22px;
            /* padding: 5px; */
            /* margin: 1rem; */
        }
    }
</style>