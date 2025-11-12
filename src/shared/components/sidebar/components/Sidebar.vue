<script setup>

    // Importaciones Generales
    import { defineAsyncComponent, onMounted, ref } from 'vue';

    // Importaciones de Composables
    import { useSidebarStore } from '@/shared/components/sidebar/stores/useSidebarStore.ts';

    // Importaciones de Pinia
    import { storeToRefs } from 'pinia';
    
    // Asignaciones de Stores
    const SideBarStore = useSidebarStore();
    const {
        // Properties
        isSidebarCollapse,
        pathLogo,
        routes,
    } = storeToRefs(SideBarStore);
    const {
        collapseSidebar,
        getItemModules
    } = SideBarStore;

    // Componentes
    const ButtonCollapse = defineAsyncComponent(() => import ('@/shared/components/sidebar/components/ButtonCollapse.vue'));
    const SidebarLogo = defineAsyncComponent(() => import('@/shared/components/sidebar/components/SidebarLogo.vue'));
    const SidebarMenu = defineAsyncComponent(() => import('@/shared/components/sidebar/components/SidebarMenu.vue'));
    const SidebarConfig = defineAsyncComponent(() => import('@/shared/components/sidebar/components/SidebarConfig.vue'));

    onMounted(() => {
        // TODO: Obtención de rutas 
        getItemModules();
    })

</script>

<template>
    <div 
        class="container-sidebar"
        :class="{'collapse':isSidebarCollapse}"
        >
        
        <ButtonCollapse 
            :isSidebarCollapse="isSidebarCollapse"
            :collapse-sidebar="collapseSidebar"
            >
        </ButtonCollapse>

        <!-- TODO: Sección de Logo -->
        <SidebarLogo 
            :isSidebarCollapse="isSidebarCollapse"
            :pathImage="pathLogo">
        </SidebarLogo>

        <!-- TODO: Sección de Buscador de Componentes -->
        <!-- <Transition>

            <div v-if="!isSidebarCollapse" class="wrapper-search">
                
                <div class="container-wrapper-general">
                    
                    <div class="wrapper-input">

                        <input 
                        placeholder="Buscar"
                        class="input-form"
                        type="text"
                        >
                        
                        <span class="material-symbols-rounded prefix-icon">search</span>

                    </div>

                </div>
                
            </div>

        </Transition> -->
        <SidebarMenu 
            :isSidebarCollapse="isSidebarCollapse"
            :menu="routes"
            >
        </SidebarMenu>
        
        <!-- TODO: (OPCIONAL) Sección del módulo del usuario -->
        <SidebarConfig></SidebarConfig>
        
    </div>
</template>

<style scoped>

    @import url('../css/forms.css');

    .container-sidebar{
        display: flex;
        /* justify-content: center; */
        align-items: center;
        flex-direction: column;
        background-color: var(--color-a);
        position: fixed;
        z-index: 100;
        width: 250px;
        height: 100vh;
        padding-bottom: 50px;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        transition: all .3s ease;
    }

    .collapse{
        width: 50px;
        transition: all .3s ease;
    }

    .wrapper-search{
        display: flex;
        align-items: center;
        justify-content: center;
        /* border: 1px solid black; */
        height: 50px;
        width: 100%;
        padding: 10px;
    }

    .container-wrapper-general {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .general-wrapper {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 500px;
    }

    .wrapper-input {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        flex-direction: column;
        width: 100%;
        margin-bottom: 5px;
        margin-top: initial;
    }

    .input-form {
        width: 100%;
        height: 45px;
        padding-left: 40px;
        font-size: 13px;
        border-radius: 5px;
        outline: .5px solid #EAEAEA;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.24);
        color: #000;
        transition: outline .5s ease;
        font-weight: 400;
    }

</style>