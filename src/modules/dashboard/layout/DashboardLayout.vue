<script setup>

    // Importaciones Generales
    import { defineAsyncComponent } from 'vue';

    // Importaciones de Stores
    import { useSidebarStore } from '@/shared/components/sidebar/stores/useSidebarStore.ts';

    // Asignaciones de Stores
    const SideBarStore = useSidebarStore();

    // Componentes
    const Sidebar = defineAsyncComponent(() => import('@/shared/components/sidebar/layout/SidebarLayout.vue'));
    const Tabs = defineAsyncComponent(() => import('@/shared/components/tabs/components/TabsComponent.vue'));
</script>

<template>
    <div class="container-main">
        <Sidebar></Sidebar>
        <!-- TODO: Integrar componentes para pestañas de navegación -->
        <div 
            class="container-content"
            :class="{'reside':SideBarStore.isSidebarCollapse}">
            <Tabs></Tabs>
        </div>
        <!-- <div 
            class="container-content"
            :class="{'reside':SideBarStore.isSidebarCollapse}">
            <RouterView></RouterView>
        </div> -->
        <!-- TODO: Verificar el uso correcto de la rederizacion y transiciones -->
        <!-- <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
                <component :is="Component" />
            </transition>
        </router-view> -->
    </div>
</template>

<style scoped>

    .container-content{
        transition: all ease .3s;
        height: 100vh;
        width: calc(100% - 250px);
        /* left: 300px; */
        left: 250px;
        position: relative;
        z-index: 1;
    }

    .reside{
        transition: all ease .3s;
        width: calc(100% - 50px);
        z-index: 1;
        left: 50px;
    }
</style>