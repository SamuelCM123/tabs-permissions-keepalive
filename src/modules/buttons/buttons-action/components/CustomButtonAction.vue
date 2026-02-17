<script setup>

    // Importaciones Generales
    import { onMounted, ref, watch } from 'vue';

    // Importaciones de Router
    import { useRoute, useRouter } from 'vue-router';

    // Instancia de Router
    const route = useRoute();

    const formData = ref({
        inputCustomAction: {
            field: '',
            setValue: route.params.id,
        }
    })

    // watch(formData, () => {
    //     localStorage.setItem('inputCustomAction', JSON.stringify(formData.value))
    // }, { deep: true })

    // onMounted(() => {
    //     const stored = localStorage.getItem('inputCustomAction')
    //     const parsed = JSON.parse(stored)
    //     formData.value.inputCustomAction.setValue = parsed.inputCustomAction.setValue;
    // })

</script>

<template>
    <div>
        Custom Button Action

        <input class="input" type="text" v-model="formData.inputCustomAction.setValue">
    </div>
</template>

<style scoped>
    
    .input{
        width: 100px;
        background-color: red;
        outline: 2px solid green;
    }
</style>