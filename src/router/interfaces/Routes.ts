import type { RouteRecordRaw, RouteMeta } from "vue-router";
import { permissions } from '../guards/permissions';

// ===========================================
// 1. Tipado del Objeto de Breadcrumb
// ===========================================

/**
 * Define la estructura de las opciones de Breadcrumb.
 */
export interface MyBreadcrumbMeta {
    isShow: boolean;
    isSelected: boolean;
}

export interface PermissionsRoute {
    name: string;
    value: string;
}

// -------------------------------------------

// ===========================================
// 2. Extensión de RouteMeta
// ===========================================

/**
 * Extiende la interfaz RouteMeta de Vue Router para incluir todas tus propiedades
 * personalizadas (como title, icon, isShow, keepAlive, etc.).
 */
export interface MyRouteMeta extends RouteMeta {
    title: string; // Título de la ruta (requerido para el menú o pestaña)
    icon: string; // Ícono de la ruta
    keyword: string[]; // Palabras clave para búsqueda
    dropdownOpen?: boolean; // Estado del dropdown en el sidebar
    isShow: boolean; // Si se muestra en el sidebar/menú
    keepAlive: boolean; // Si debe usarse con <KeepAlive>
    isRepeat?: boolean; // (Opcional) Indica si la ruta puede abrirse múltiples veces como pestaña
    limitTabs?: number; // (Opcional) Límite de pestañas repetibles
    isAlwaysVisible?: boolean; // TODO: Verificar si es necesario
    isAllPermissions?: boolean; // TODO: Verificar si es necesario
    isBreadcrumb?: MyBreadcrumbMeta; // Configuración del Breadcrumb
    permissions?: PermissionsRoute;
}

// -------------------------------------------

// ===========================================
// 3. Tipado de la Ruta Completa
// ===========================================

/**
 * Extiende la interfaz RouteRecordRaw para asegurar que todas las rutas
 * utilicen nuestra MyRouteMeta personalizada.
 */
export interface MyRouteRecordRaw
    extends Omit<RouteRecordRaw, "meta" | "children"> {
    // Sobrescribe 'meta' con nuestro tipo personalizado y lo hace obligatorio
    meta: MyRouteMeta;
    // Permite que los hijos utilicen el mismo tipo (recursividad)
    children?: MyRouteRecordRaw[];
}
