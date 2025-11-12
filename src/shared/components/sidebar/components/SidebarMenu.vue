<script setup>
    
    // Importaciones de Composables
    import { useSidebarMenu } from '@/shared/components/sidebar/composables/useSidebarMenu.ts';

    // Importaciones de Stores
    import { useTabStore } from '@/shared/components/tabs/stores/useTabStore.ts';

    // Importaciones de Pinia
    import { storeToRefs } from 'pinia';

    // Definiciones de Props
    const props = defineProps({
        menu: {type:Object},
        isSidebarCollapse: {type:Boolean},
    });

    // Desestructuraciones de Stores
    const {
        // Actions
        openTab,
    } = useTabStore();
    
    const {
        
    } = storeToRefs(useTabStore());

    // Desestructuraciones de Composables
    const {
        // Properties
        // Methods
        mouseLeaveHorizontal,
        mouseLeaveVertical,
        mouseOverHorizontal,
        mouseOverVertical,
        isExpandSubmenu,
        handleModuleAction,
        verifyModuleVisibility,
    } = useSidebarMenu(props);

</script>

<template>
    <div class="wrapper-menu">
        
        <div class="wrapper">
            <ul 
                class="navbar-desktop"
                :class="props.isSidebarCollapse ? 'collapse': 'no-collapse'"
            >
            <template 
                    v-for="(supermodule,index) in props.menu"
                    :key="index"
                >
                <li     
                    v-if="verifyModuleVisibility(supermodule)"
                    class="supermodule-item" 
                    @mouseleave="mouseLeaveHorizontal($event)"
                    :class="[
                        { 'active': supermodule.meta.dropdownOpen && supermodule.children?.length > 0 }
                    ]"
                    >
                    <div 
                        class="supitem-content" 
                        :title="supermodule.meta.title"
                        @mouseenter="mouseOverHorizontal($event)"
                        @mousemove="mouseOverHorizontal($event)"
                        @click="handleModuleAction(supermodule)"
                        >
                        <span class="material-symbols-rounded item-icon">{{ supermodule.meta.icon }}</span>
                        <span class="item-title">{{ supermodule.meta.title }}</span>
                        <div class="icon-expand-supermodule">
                            <span 
                                v-if="supermodule.children?.length > 0 && !props.isSidebarCollapse"
                                class="material-symbols-rounded icon-expand"
                                :class="isExpandSubmenu(supermodule.meta.dropdownOpen)"
                                >
                                expand_more
                            </span>
                            <span 
                                v-else-if="supermodule.children?.length > 0 && props.isSidebarCollapse"
                                class="material-symbols-rounded icon-expand"
                                >
                                arrow_right
                            </span>
                        </div>
                    </div>
                    <div 
                        v-if="supermodule?.children?.length > 0"
                        class="container-wrapper" 
                    >
                        <div 
                            class="wrapper wrapper-module">
                            <ul class="sub-list">
                                <template 
                                    v-for="(moduleI,index) in supermodule.children"
                                    :key="index"
                                >
                                    <li 
                                        v-if="verifyModuleVisibility(moduleI)"
                                        class="module-item"
                                        @mouseleave="mouseLeaveVertical($event)"
                                        :class="[
                                            { 'active-sub': moduleI.meta?.dropdownOpen && moduleI?.children?.length > 0 }
                                        ]"
                                    >
                                        <div 
                                            @click="handleModuleAction(moduleI)"
                                            class="item-content" 
                                            :title="moduleI.meta.title"
                                            @mousemove="mouseOverVertical($event)"
                                            @mouseenter="mouseOverVertical($event)"
                                            >
                                            <span class="material-symbols-rounded">{{ moduleI.meta?.icon }}</span>
                                            <span class="item-title">{{ moduleI.meta?.title }}</span>
                                            <!-- <span 
                                                v-if="moduleI?.children?.length > 0"
                                                class="material-symbols-rounded icon-expand"
                                                >
                                                expand_more
                                            </span> -->
                                            <div class="icon-expand-module">
                                                <span 
                                                    v-if="moduleI?.children?.length > 0 && !props.isSidebarCollapse"
                                                    class="material-symbols-rounded icon-expand"
                                                    :class="isExpandSubmenu(moduleI.meta?.dropdownOpen)"
                                                    >
                                                    expand_more
                                                </span>
                                                <span 
                                                    v-else-if="moduleI?.children?.length > 0 && props.isSidebarCollapse"
                                                    class="material-symbols-rounded icon-expand"
                                                    >
                                                    arrow_right
                                                </span>
                                            </div>
                                        </div>
                                        <div 
                                            v-if="moduleI?.children?.length > 0"
                                            class="container-subwrapper"
                                            >
                                            <div 
                                                class="wrapper wrapper-submodule"
                                                >
                                                <ul class="sub-list">
                                                    <li 
                                                        v-for="(subModuleI,index) in moduleI.children"
                                                        :key="index"
                                                        class="submodule-item"
                                                        >
                                                        <div 
                                                            v-if="verifyModuleVisibility(subModuleI)"
                                                            @click="handleModuleAction(subModuleI)"
                                                            class="subitem-content" 
                                                            :title="subModuleI.meta.title"
                                                            @mousemove="mouseOverVertical($event)"
                                                            @mouseenter="mouseOverVertical($event)"
                                                            >
                                                            <span class="material-symbols-rounded">{{ subModuleI.meta?.icon }}</span>
                                                            <span class="item-title">{{ subModuleI.meta?.title }}</span>
                                                            <!-- <span 
                                                                v-if="subModuleI?.children?.length > 0"
                                                                class="material-symbols-rounded icon-expand-submodule"
                                                                >
                                                                arrow_right
                                                            </span> -->
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                            
                                        </div>

                                    </li>
                                </template>
                            </ul>
                        </div>
                    </div>

                </li>
            </template>
                <!-- <li class="supermodule-item" @mouseleave="mouseLeaveHorizontal($event)">
                    <div class="supitem-content" @mousemove="mouseOverHorizontal($event)"
                        @mouseout="mouseOverHorizontal($event)">
                        <span class="material-symbols-rounded">manufacturing</span>
                        <span>Configuración</span>
                    </div>
                </li> -->
            </ul>

        </div>

    </div>
</template>

<style scoped>
    @import url('../css/sidebar-menu.css');

    .rotate{
        transform: rotate(180deg);
        transform: all .3s ease;
    }

    .wrapper-menu{
        display: flex;
        /* border: 2px solid black; */
        width: 100%;
        height: 100%;
        /* background-color: var(--color-a); */
    }

    .container-navbar-user {
        width: 100%;
        background: #000;
    }

    /* .container-user-module{
        display: flex;
        justify-content: end;
        background-color: #fff;
        z-index: 1;
        width: 400px;
    } */

    .container-info-user{
        height: 100%;
    }

    .wrapper-user{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        z-index: 1;
        background-color: #fff;
        width: 100%;
        /* min-width: 220px; */
        max-width: 300px;
        height: 100%;
        /* margin-right: 100px; */
        overflow: hidden;
        padding: 0px 10px;
        /* margin-right: 5px; */
    }

    .wrapper-user:hover{
        background-color: #E7E9FB;
    }

    .submodule-wrapper-user {
        display: flex;
        flex-direction: column;
        position: absolute;
        pointer-events: none;
        width: 100%;
        min-width: 200px;
        bottom: 0;
        right: 0;
        opacity: 0;
        z-index: -1;
        transition: all .5s ease;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        background-color: #f9f9f9;
    }

    .wrapper-user-info:hover .submodule-wrapper-user {
        display: flex;
        flex-direction: column;
        position: absolute;
        pointer-events: initial;
        z-index: -1;
        width: 100%;
        min-width: 200px;
        opacity: 1;
        right: 0;
        /* height: 45px; */
        transform: translateY(100%);
        transition: all .5s ease;
        box-shadow: -2px 2px 10px rgba(0, 0, 0, 0.24);
    }

    .wrapper-user-info:hover .name-module{
        color: #293277;
        transition: all .3s ease;
    }

    .wrapper-user-info:hover .expand-icon{
        transform: rotate(180deg);
        color: #293277;
        transition: all .5 ease;
    }

    .submodule-item-user {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        background-color: #fff;
        width: 100%;
        height: 45px;
        gap: 10px;
        padding: 10px 20px;
        text-align: left;
        cursor: pointer;
        transition: background-color .3s ease;
    }

    .submodule-item-user:hover {
        background-color: #E7E9FB;
    }

    .submodule-item-user:hover .name-submodule-user {
        color: #293277;
        transition: all .3s ease;
    }

    .submodule-item-user:hover .icon-module {
        color: #293277;
        transition: all .3s ease;
    }

    .name-submodule-user {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 14px;
        transition: all .3s ease;
    }

    .wrapper-user-info {

        position: relative;

        /* Changes */
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        gap: 5px;
        height: 45px;
        /* padding-right: 10px; */
        /* padding: 10px; */
        /* height: 100%; */
        z-index: 1;
    }

    .wrapper-user-info:hover {
        /* background-color: #E7E9FB; */
        transition: all .5s ease;
    }

    .letter-account {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 25px;
        min-width: 25px;
        height: 25px;
        border-radius: 30px;
        background-color: #293277;
        color: #fff;
        font-weight: 300;
    }

    .name-module {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #A3A3A3;
        font-size: 14px;
        transition: all .3s ease;
        width: 100%;
        text-align: center;
    }

    .name-sub-submodule,
    .name-submodule-user {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #A3A3A3;
        font-size: 14px;
        transition: all .3s ease;
        width: 100%;
        text-align: left;
    }

    .icon-module {
        color: #A3A3A3;
        transition: all .3s ease;
    }
</style>