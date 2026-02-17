//* Importaciones
import { computed, ref, type Ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { defineStore } from "pinia";
import { routesSidebar } from '@/router/routes';
import type { MyRouteMeta, MyRouteRecordRaw } from "@/router/interfaces/Routes";

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
   * Almacena las rutas filtradas
   */
  let filteredRoutes: Ref<MyRouteRecordRaw[]> = ref([]);

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
    filteredRoutes.value = <any>[...routesSidebar];
  };

  const filterItemRoutes = (keyword: string) => {
    console.log('filtered keyword:',keyword);

    // TODO: Validar permisos del usuario por módulo o ruta
    const search = keyword.toLowerCase()

    const hasKeyword: Function = (route: MyRouteRecordRaw) => {

      const currentKeywords = route?.meta.keyword || [];
      const foundInCurrent = currentKeywords?.some((item) => item.toLowerCase().includes(search));

      if(foundInCurrent) return true

      if(route.children && route?.children?.length > 0){
        return route?.children?.some((child: MyRouteRecordRaw) => hasKeyword(child));
      }

      return false;
    }

    if(keyword === '') filteredRoutes.value = routesSidebar;
    filteredRoutes.value = routesSidebar.filter((route: MyRouteRecordRaw) => hasKeyword(route));

    // filteredRoutes.value = routesSidebar.filter((route: MyRouteRecordRaw) => {

    //   let validateKeyword = route?.meta.keyword.toString().toLowerCase()?.includes(keyword.toLowerCase())

    //   if(validateKeyword) return route

    //   // if(route?.children?.length > 0){
    //   return route?.children?.filter((child: MyRouteRecordRaw) => {
    //     filterItemRoutes(keyword);
    //   })
    //   // }

    // });
  }

  return {
    //* PROPERTIES
    isSidebarCollapse,
    pathLogo,
    routes,
    filteredRoutes,
    // menuComponents,

    //* METHODS
    collapseSidebar,
    getItemModules,
    filterItemRoutes,
  };
});