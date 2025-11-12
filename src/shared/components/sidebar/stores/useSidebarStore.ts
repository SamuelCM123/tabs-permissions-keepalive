//* Importaciones
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { defineStore } from "pinia";
import { routesSidebar } from '@/router/routes';

export const useSidebarStore = defineStore("Sidebar", () => {
  
  //* STATES

  // const router = useRouter();
  // const route = useRoute();

  /**
   * -Define la ruta de la imagen o logo a mostrar en el sidebar
   */
  const pathLogo = ref("../../../../assets/img/cistem.svg");

  /**
   * -Controla el colapso del menu lateral
   */
  let isSidebarCollapse = ref(false);

  /**
   * -Almacena las rutas del menu lateral
   */
  let routes = ref([]);

  /**
   * -Lista de componentes disponibles
   */
  // const menuComponents = ref([
  //     {
  //         title: 'Botones',
  //         name: 'buttons',
  //         path: '/botones',
  //         name: 'buttons-sidebar',
  //         component: () => import('@/modules/buttons/layouts/ButtonsLayout.vue'),
  //         meta: { title: 'Botones'},
  //         icon: 'touch_app',
  //         keyword: ['buttons','button','boton','botones'],
          // children: [
          //     {
          //         title: 'Split Button',
          //         name: 'split-button',
          //         path: '',
          //         icon: 'view_agenda',
          //         keyword: ['split'],
          //     },
          //     {
          //         title: 'Button Loading',
          //         name: 'loading-button',
          //         path: '',
          //         icon: 'refresh',
          //         keyword: ['loading','carga','boton'],
          //     },
          // ],
  //         dropdownOpen: false,
  //     },
      // {
      //     title: 'Select',
      //     name: 'selects',
      //     path: '',
      //     icon: 'arrow_drop_down',
      //     keyword: ['select','selectores'],
      //     children: [
      //         {
      //             title: 'Select Buscador',
      //             name: 'search-select',
      //             path: '',
      //             icon: 'search',
      //             keyword: ['search'],
      //         }
      //     ],
      //     dropdownOpen: false,
      // },
      // {
      //     title: 'Acordeones',
      //     name: 'accordions',
      //     path: '',
      //     icon: 'menu',
      //     keyword: ['acordeones','accordion','acordeon'],
      //     dropdownOpen: false,
      // }
  // ])

  //* ACTIONS
  /**
   * Colapsa o despliega el menu lateral
   * @function
   * @name collapseSidebar
   * @returns {undefined}
   */
  const collapseSidebar = () => {
    isSidebarCollapse.value = !isSidebarCollapse.value;
    console.log("isSidebarCollapse:", isSidebarCollapse.value);
  };

  const getItemModules = () => {
    routes.value = <any>[...routesSidebar];
  };

  return {
    //* PROPERTIES
    isSidebarCollapse,
    pathLogo,
    routes,
    // menuComponents,

    //* METHODS
    collapseSidebar,
    getItemModules,
  };
});