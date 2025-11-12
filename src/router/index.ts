import { createRouter, createWebHistory } from 'vue-router'
import { routesView } from '@/router/routes';
import * as guards from './guards';

//? Nombre del proyecto
const PATH_NAME = 'CIL'

//? Configuración del enrutador
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routesView,
})


/**
 * Función central para aplicar todos los guards globales en orden.
 * Se llama en main.ts DESPUÉS de montar Pinia.
 */
export const setupRouterGuards = () => {

  router.beforeEach(guards.permissions);
  guards.redirectTabs(router);
  guards.saveLastPath(router);

}

export default router