<script setup>
    
    // Importaciones Generales
    import { onMounted, ref, watch, watchEffect } from 'vue';  

    const formData = ref({
        inputCustomAction: {
            field: '',
            setValue: '',
        }
    })

    // Hooks
    // watchEffect(() => {

        // Obtener los permisos de perfiles
        // console.log('permissionsProfiles.value:',permissionsProfiles.value);
    // })

    // watch(() => route.query.tabId, (newId) => {
    //     console.log("Cambié a la pestaña:", newId);
    //     // Aquí podrías cargar los datos específicos de esta pestaña desde tu store
    // }, { immediate: true });
    onMounted(() => {
        console.log('montado');
    })

</script>

<template>
    <div class="container-module">

        <div class="container-submodule">
            <div class="container-submodule-title">
                <h4>Perfiles</h4>
            </div>

            <input class="input" type="text" v-model="formData.inputCustomAction.setValue">
        </div>

        <!--* VISTA PRINCIPAL -->
        <router-view v-slot="{ Component }">
            <component
                :data="formData.inputCustomAction.setValue"
                :is="Component"
            />
        </router-view>
        
    </div>
</template>

<style scoped>
    .container-module{
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        width: 100vw;
    }

    .input{
        width: 100px;
        background-color: red;
        outline: 2px solid green;
    }
</style>