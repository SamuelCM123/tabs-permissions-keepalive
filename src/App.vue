<script setup lang="ts">

  // Importaciones Generales
  import { defineAsyncComponent, onMounted, ref } from 'vue';

  const currentTheme = ref('light');

  const setRootTheme = (theme: any) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    currentTheme.value = theme;
  };

  const toggleTheme = () => {
    const newTheme = currentTheme.value === 'dark' ? 'light' : 'dark';
    setRootTheme(newTheme);
  };

  // Se ejecuta al montar el componente
  onMounted(() => {

    // 1. Cargar preferencia de localStorage
    const storedTheme = localStorage.getItem('theme');
    
    if (storedTheme) {
      setRootTheme(storedTheme);
      return;
    }
    
    // 2. Si no hay preferencia, usar la del sistema
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setRootTheme('dark');
    } else {
      setRootTheme('light'); // Establecer el tema por defecto si no hay preferencia oscura
    }
  });


  // Componentes
  const BaseToast = defineAsyncComponent(() => import('@/shared/components/toast/components/Toast.vue'));
</script>

<template>
  <transition name="fade">
    <div class="container-main">
      <!-- TODO: Verificar el uso correcto de la renderizacion y transiciones -->
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </transition>
  <BaseToast></BaseToast>
  <div class="btn-toggle-theme" @click="toggleTheme">
    <Transition name="fade" mode="out-in">
      <span v-if="currentTheme === 'light'" class="material-symbols-rounded">dark_mode</span>
      <span v-else-if="currentTheme === 'dark'" class="material-symbols-rounded">light_mode</span>
    </Transition>
  </div>
</template>

<style scoped>

  .fade-enter-active,
  .fade-leave-active {
    transition: all .1s ease;
  }

  .btn-toggle-theme{
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 999;
    right: 15px;
    bottom: 15px;
    width: 40px;
    height: 40px;
    background-color: #293277;
    cursor: pointer;
    border-radius: 30px;
    transition: all ease .3s;
    color: #fff;
  }

  .btn-toggle-theme:hover{
    background-color: #293277ad;
    transition: all ease .3s;
  }

</style>
