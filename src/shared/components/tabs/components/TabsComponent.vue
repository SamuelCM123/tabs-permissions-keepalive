<script setup>

  // Importaciones Generales
  import { defineAsyncComponent, onDeactivated, onMounted, onUnmounted } from 'vue';

  // Importaciones de Pinia
  import { storeToRefs } from 'pinia';

  // Importaciones de Stores
  import { useTabStore } from '@/shared/components/tabs/stores/useTabStore.ts';

  // Desestructuraciones de Stores
  const {
    // Actions
    openTabHidden,
    openConfirmCloseHidden,
    closeTabsHiddenAll,
    handleLayout,
    handleLayoutHidden,
    handleDisplaceTabs,
    handleBreadcrumbLayout,
    colorTab,
    closeTab,
    closeTabHidden,
    route,
    router,

    dragStart,
    dragEnd,
    dragOver,
    dragLeave,
    dragExit,
    drop,
  } = useTabStore();
  
  const {
    // States
    openComponents,
    openFixedComponents,
    hiddenComponents,
    isShowTabHidden,
    isOpenCloseHiddenModal,
    layoutSelected,
  } = storeToRefs(useTabStore());

  // Componentes 
  const ConfirmCloseHiddenModal = defineAsyncComponent(() => import('@/shared/components/tabs/views/ConfirmCloseHiddenTabsModal.vue'));

  // Ciclos de vida
  onMounted( async () => {
    
    // Se ejecuta la funcionalidad de desplazamiento de pestañas
    window.addEventListener('resize', () => {
      handleDisplaceTabs();
    });

  })

  onDeactivated( async () => {
    console.log('deactivated')
    router.push({ name: 'dashboard' });
    openComponents.value = [];
    hiddenComponents.value = [];
  })

  // onActivated( async () => {
  //   console.log('Activated');
  // })

  // onDeactivated( async () => {
  //   console.log('Deactivated');
  // })

</script>

<template>
  <div>
    <div class="container-views-tabs">

      <div class="container-tabs">

        <!--* CONTENEDOR DE PESTAÑAS FIJAS -->
        <!-- <div 
          v-for="(component, index) in openFixedComponents" 
          :key="index" 
          :class="[
            colorTab(component)[0],
            component.isAlwaysOpen ? 'no-close' : ''
          ]"
          > -->

          <!--* NOMBRE DE PESTAÑA -->
          <!-- <div class="wrapper-tab-name" @click="handleLayout(component)" :title="component.title">

            <span class="tab-name" v-html="component.title"></span>

          </div>

        </div> -->

        <!--* CONTENEDOR DE PESTAÑAS -->
        <div 
          v-for="(component, index) in openComponents" 
          :key="component.id" 
          :draggable="component.isAlwaysOpen ? false : true"
          @dragstart="dragStart($event, index)" 
          @dragend="dragEnd($event, index)"
          @dragover.prevent="dragOver($event, component, index)" 
          @dragleave="dragLeave($event)"
          @dragexit="dragExit($event)" 
          @drop="drop(index)"
          :class="[
            colorTab(component)[0],
            component.isAlwaysOpen ? 'no-close' : ''
          ]"
          >

          <!--* NOMBRE DE PESTAÑA -->
          <div class="wrapper-tab-name" @click="handleLayout(component)" :title="component.title">

            <span class="tab-name" v-html="component.title"></span>

          </div>

          <!--* ICONO PARA CERRAR PESTAÑA -->
          <!-- TODO: Implementar el cerrado de pestañas visibles y considerar el desplazamiento de las pestañas ocultas -->
          <button 
            v-if="!component.isAlwaysOpen"
            class="tab-close" 
            @click="closeTab(component,index)"
            >

            <span class="material-symbols-rounded icon-tab">
              close
            </span>

          </button>
        </div>


      </div>

      <!--* CONTENEDOR DE PESTAÑAS OCULTAS -->
      <div class="container-tabs-hidden" v-if="hiddenComponents.length > 0"
        :class="{ 'tab-hidden-show': isShowTabHidden }">

        <!--* NÚMERO DE PESTAÑAS OCULTAS -->
        <div class="wrapper-number-tabs">
          {{ hiddenComponents.length }}
        </div>

        <span class="material-symbols-rounded icon-hidden" :class="{ 'open-tabs-hidden': isShowTabHidden }"
          @click="openTabHidden()">
          more_horiz
        </span>

        <!--* CERRAR PESTAÑAS OCULTAS -->
        <div class="wrapper-close-tabs" @click="openConfirmCloseHidden">
          <span class="material-symbols-rounded icon-close">
            close
          </span>
        </div>

        <!--* WRAPPER PARA CONJUNTO DE PESTAÑAS OCULTAS -->
        <div class="wrapper-tabs-hidden">

          <template v-for="(tabHidden, index) in hiddenComponents" :key="index">

            <div class="tabs-hidden">
              <!-- <div class="wrapper-name-hidden"> -->

              <span 
                class="tab-name-hidden" 
                :class="{'tab-hidden-noclose': tabHidden.isAlwaysOpen}"
                :title="tabHidden.title"
                v-html="tabHidden.title"
                @click="handleLayoutHidden(tabHidden)"
                >
              </span>

              <!-- </div> -->

              <!--* ICONO PARA CERRAR PESTAÑA -->
              <button
                v-if="!tabHidden.isAlwaysOpen"
                class="tab-close-hidden" 
                @click.prevent="closeTabHidden(tabHidden)">

                <span class="material-symbols-rounded icon-tab">
                  close
                </span>

              </button>
            </div>

          </template>

        </div>

      </div>

      <div class="breadcrumb">
        <template v-for="(r, index) in route.matched" :key="index">
          <div v-if="r.meta.hasOwnProperty('isBreadcrumb')">
            <div 
              v-if="
                (r.meta.title) && 
                (index < route.matched?.length - 1) && 
                r.meta.isBreadcrumb.isShow
              "
              class="breadcrumb-link" 
              :class="{ 'no-selected-breadcrumb': !r.meta.isBreadcrumb?.isSelected }"
              @click="handleBreadcrumbLayout(r)"
              >
              <span class="breadcrumb-name">
                {{ r.meta.title }}
              </span>
              >
            </div>
            <div 
              v-else-if="r.meta.isBreadcrumb.isShow"
              class="breadcrumb-link"
              :class="{ 'no-selected-breadcrumb': !r.meta.isBreadcrumb?.isSelected }"
              @click="handleBreadcrumbLayout(r)"
              >
              <span class="breadcrumb-name">
                {{ r.meta.title }}
              </span>
            </div>
          </div>
          <div
            v-else
          >
          <div 
              v-if="
                (r.meta.title) && 
                (index < route.matched?.length - 1)
              "
              class="breadcrumb-link" 
              :class="{ 'no-selected-breadcrumb': !r.meta.isBreadcrumb?.isSelected }"
              @click="handleBreadcrumbLayout(r)"
              >
              <span class="breadcrumb-name">
                {{ r.meta.title }}
              </span>
              >
            </div>
            <div 
              v-else
              class="breadcrumb-link" 
              :class="{ 'no-selected-breadcrumb': !r.meta.isBreadcrumb?.isSelected }"
              @click="handleBreadcrumbLayout(r)"
              >
              <span class="breadcrumb-name">
                {{ r.meta.title }}
              </span>
            </div>
        </div>
        </template>
      </div>
      <div class="container-views">

        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" :key="$route.fullPath" />
          </keep-alive>
        </router-view>

      </div>

      <Transition name="fade" mode="out-in">

        <!--* MODAL -->
        <ConfirmCloseHiddenModal 
          :modal-state="isOpenCloseHiddenModal"
          :closeTabs="closeTabsHiddenAll"
          @close-modal="isOpenCloseHiddenModal = $event" 
          ></ConfirmCloseHiddenModal>

      </Transition>

    </div>
  </div>
</template>

<style scoped>

  .breadcrumb{
    display: flex;
    gap: 5px;
    transition: all .3s ease;
  }

  .breadcrumb-link{
    cursor: pointer;
    transition: all .3s ease;
  }

  .breadcrumb-link:hover .breadcrumb-name{
    text-decoration: underline;
    transition: all .3s ease;
  }

  .no-selected-breadcrumb{
    transition: all .3s ease;
    cursor: default;
  }

  .no-selected-breadcrumb:hover .breadcrumb-name{
    text-decoration: none;
  }

  .container-buttons-modules {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        z-index: 1;
        width: 100%;
        height: 50px;
        background-color: #fff;
        box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);
    }

    .btn-form {
        width: auto;
        margin: 0;
        gap: 10px;
        padding: 10px;
    }

    .container-views-tabs {
        display: flex;
        flex-direction: column;
        position: relative;
        width: 100%;
        height: 100vh;
        /* margin-top: 60px; */
    }

    .container-tabs{
        display: flex;
        align-items: end;
        position: relative;
        min-height: 35px;
        width: calc(100% - 90px);
        gap: 5px;
    }

    .container-tabs::-webkit-scrollbar{
        display: none;
        width: 5px;
        height: 5px;
    }

    .wrapper-tab-name {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-left: 10px;
        width: 100%;
        max-width: 195px;
        height: 100%;
        cursor: pointer;
    }

    .tab-name {
        /* display: flex; */
        /* align-items: center; */
        /* justify-content: center; */
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 14px;
        pointer-events: none;
        /* gap: 5px; */
    }

    .wrapper-name-hidden{
        width: 100%;
    }

    .tab-name-hidden{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 14px;
        height: 100%;
        padding: 9px 10px;
        min-width: 190px;
        max-width: 190px;
        /* background-color: red; */
        /* pointer-events: none; */
    }

    .tab-hidden-noclose{
      max-width: initial;
      min-width: 100%;
    }

    .tabs {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        background-color: rgb(255, 255, 255);
        background-color: #293277;
        color: #fff;
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
        padding-right: 30px;
        /* transition: all .3s ease; TODO: Verificar si se comentara */
    }

    .tabs-selected {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        background-color: var(--color-a);
        border-top: solid .5px #E7E9FB;
        border-right: solid .5px #E7E9FB;
        border-left: solid .5px #E7E9FB;
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
        padding-right: 30px;
    }

    .tabs, .tabs-selected{
        min-width: auto;
        height: 35px;
    }

    .tabs-dropdown-selected{
        background-color: #E7E9FB;
        transition: all .5s ease;
    }

    .container-tabs-hidden{
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        height: 35px;
        min-width: 65px;
        background-color: #E7E9FB;
        color: #293277;
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
        cursor: pointer;
        right: 10px;
        transition: all .3s ease;
    }

    .wrapper-number-tabs{
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        background-color: #293277;
        outline: solid 3px #F1F5F7;
        color: #fff;
        font-size: 12px;
        width: 20px;
        height: 20px;
        border-radius: 100%;
        top: -7px;
        left: -7px;
        cursor: default;
    }

    .wrapper-close-tabs{
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        background-color: #EA5B5B;
        outline: solid 3px #F1F5F7;
        color: #fff;
        width: 20px;
        height: 20px;
        border-radius: 100%;
        top: -7px;
        right: -7px;
    }

    .wrapper-close-tabs:hover{
        background-color: rgb(233, 59, 59);
    }

    .icon-close{
        font-size: 16px;
    }

    .wrapper-tabs-hidden{
        display: none;
        flex-direction: column;
        position: absolute;
        top: 100%;
        right: 0;
        height: 0;
        /* max-width: 150px; */
        /* min-width: 200px; */
        z-index: 100;
        background-color: #fff;
    }

    .tab-hidden-show .wrapper-tabs-hidden{
        display: flex;
        text-align: left;
        flex-direction: column;
        position: absolute;
        box-shadow: -2px 2px 10px rgba(0, 0, 0, 0.24);
        height: auto;
        z-index: 2;
        max-height: 500px;
        overflow-y: auto;
    }

    .tab-hidden-show .wrapper-tabs-hidden::-webkit-scrollbar{
        width: 5px;
    }

    .tabs-hidden{
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        width: 100%;
        /* min-height: 40px; */
        /* height: 40px; */
        padding: 0px 0px 0px 0px;
        color: #000;
    }

    .tab-name-hidden:hover, .tab-close-hidden:hover {
        background-color: #E7E9FB;
        transition: all .5s ease;
    }

    .grow-tab {
        transform: scale(.9,.9);
        transition: all .3s ease;
    }

    .tabs:hover {
        background-color: #475097;
        color: #fff;
        cursor: pointer;
        transition: all .3s ease;
    }

    .icon-tab {
        font-size: 15px;
    }

    .icon-hidden{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
        font-size: 30px;
        font-weight: 800;
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
        transition: all .3s ease;
    }

    .icon-hidden:hover{
        background-color: #293277;
        color: #fff;
    }

    .open-tabs-hidden{
        background-color: #293277;
        color: #fff;
    }

    .tabs-selected .icon-tab {
        background-color: #EA5B5B;
        color: #fff;
        border-radius: 30px;
    }

    .tabs-selected .icon-tab:hover {
        background-color: #da0000;
    }

    .no-close{
      padding-right: 10px;
    }

    .tab-close {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        right: 5px;
        height: 100%;
        cursor: pointer;
    }

    .tab-icon{
        font-size: 5px;
    }

    .tab-close-hidden {
        display: flex;
        justify-content: center;
        align-items: center;
        right: 5px;
        padding: 13px 10px;
        /* width: 40px; */
        cursor: pointer;
        pointer-events: fill;
        /* background-color: blue; */
    }

    .container-views {
        display: flex;
        justify-content: center;
        background-color: var(--color-a);
        position: relative;
        height: 100%;
    }
</style>