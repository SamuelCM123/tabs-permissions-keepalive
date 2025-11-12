import type { MyRouteRecordRaw } from '@/router/interfaces/Routes.ts';

/**
 * NOTE:
 * 1- Si la ruta se quiere mostrar en pestañas independientes solo separarla del padre y colocarla a la par, ejemplo: 
 *    Ruta usuarios general(Parent): /users 
 *    Ruta usuarios editar(Parent-children): /users/edit/:id
 * 2- Si la ruta se quiere mostrar dentro de la ruta padre
 *    Ruta padre usuarios(Parent): /users  
 *    Ruta hija editar usuario(Children): edit/:id
 */

export const routesSidebar: MyRouteRecordRaw[] =[
  {
    path: "/botones",
    name: "buttons",
    component: () => import("@/modules/buttons/layouts/ButtonsLayouts.vue"),
    meta: {
      title: "Botones",
      icon: "touch_app",
      keyword: ["buttons", "button", "boton", "botones"],
      dropdownOpen: false,
      isShow: true,
      keepAlive: true,
      isBreadcrumb: {
        isShow: false,
        isSelected: false,
      },
    },
    redirect: { name: "split-button" },
    children: [
      {
        path: "/split-button",
        name: "split-button",
        component: () =>
          import(
            "@/modules/buttons/split-buttons/layouts/SplitButtonsLayout.vue"
          ),
        meta: {
          title: "Split Button",
          icon: "view_agenda",
          keyword: ["split"],
          dropdownOpen: false,
          isShow: true,
          keepAlive: true,
          isBreadcrumb: {
            isShow: true,
            isSelected: true,
          },
        },
        children: [
          {
            name: "split-button-1",
            path: "split-button-1",
            component: () => import("@/modules/buttons/split-buttons/components/SplitButton1.vue"),
            meta: {
              title: "Split Button 1",
              icon: "refresh",
              keyword: ["refresh"],
              dropdownOpen: false,
              isShow: true,
              isRepeat: true,
              keepAlive: true,
              limitTabs: 2,
              isBreadcrumb: {
                isShow: true,
                isSelected: true,
              },
              permissions: {
                name: "split_button_1",
                value: "read",
              }
            },
          },
          {
            name: "split-button-2",
            path: "split-button-2",
            component: () => import("@/modules/buttons/split-buttons/components/SplitButton2.vue"),
            meta: {
              title: "Split Button 2",
              icon: "refresh",
              keyword: ["refresh"],
              dropdownOpen: false,
              isShow: true,
              isAlwaysVisible: true, // TODO: Verificar si es necesario
              isAllPermissions: true, // TODO: Verificar si es necesario
              isRepeat: false,
              keepAlive: true,
              limitTabs: 2,
              isBreadcrumb: {
                isShow: true,
                isSelected: false,
              },
              permissions: {
                name: "split_button_2",
                value: "read",
              }
            },
          },
        ],
      },
      {
        path: "/loading-button",
        name: "loading-button",
        component: () =>
          import(
            "@/modules/buttons/buttons-loading/layouts/ButtonLoadingLayout.vue"
          ),
        meta: {
          title: "Button Loading",
          icon: "refresh",
          keyword: ["loading", "carga", "boton"],
          isShow: true,
          keepAlive: true,
          limitTabs: 2,
          isBreadcrumb: {
            isShow: false,
            isSelected: false,
          },
        },
      },
      {
        path: "/action-button",
        name: "action-button",
        component: () =>
          import(
            "@/modules/buttons/buttons-action/layouts/ButtonsActionLayout.vue"
          ),
        meta: {
          title: "Button Action",
          icon: "refresh",
          keyword: ["loading", "carga", "boton"],
          dropdownOpen: false,
          isShow: true,
          keepAlive: true,
          isBreadcrumb: {
            isShow: false,
            isSelected: false,
          },
        },
        children: [
          {
            path: "/action-button-1",
            name: "action-button-1",
            component: () =>
              import(
                "@/modules/buttons/buttons-action/components/CustomButtonAction.vue"
              ),
            meta: {
              title: "Button Action 1",
              icon: "refresh",
              keyword: ["refresh"],
              isShow: true,
              isRepeat: true,
              keepAlive: true,
              limitTabs: 2,
            }
          },
        ],
      },
    ],
  },
  {
    path: "/selects",
    name: "selects",
    component: () =>
      import(
        "@/modules/buttons/buttons-action/layouts/ButtonsActionLayout.vue"
      ),
    meta: {
      title: "Select",
      icon: "arrow_drop_down",
      keyword: ["select", "selectores"],
      dropdownOpen: false,
      isShow: true,
      keepAlive: true,
      isBreadcrumb: {
        isShow: false,
        isSelected: false,
      },
    },
    children: [
      {
        path: "/search-select",
        name: "search-select",
        component: () =>
          import(
            "@/modules/buttons/buttons-action/layouts/ButtonsActionLayout.vue"
          ),
        meta: {
          title: "Select Buscador",
          icon: "search",
          keyword: ["search"],
          dropdownOpen: false,
          isShow: true,
          keepAlive: true,
          isBreadcrumb: {
            isShow: false,
            isSelected: false,
          },
        },
      },
    ],
  },
  {
    path: "/accordions",
    name: "accordions",
    component: () =>
      import(
        "@/modules/buttons/buttons-action/layouts/ButtonsActionLayout.vue"
      ),
    meta: {
      title: "Acordeones",
      icon: "menu",
      keyword: ["acordeones", "accordion", "acordeon"],
      dropdownOpen: false,
      isShow: true,
      keepAlive: true,
      isBreadcrumb: {
        isShow: false,
        isSelected: false,
      },
    },
  },
  {
    path: '/websocket',
    name: 'websocket',
    component: () => import("@/modules/web-sockets/layouts/WebsocketLayout.vue"),
    meta: {
      title: 'Websocket',
      icon: 'refresh',
      keyword: ['websocket'],
      dropdownOpen: false,
      isShow: true,
      keepAlive: true,
      isBreadcrumb: {
        isShow: false,
        isSelected: false,
      },
    },
    children: [
      {
        path: 'index-layout',
        name: 'websocket-index-layout',
        component: () => import("@/modules/web-sockets/components/IndexLayout.vue"),
        meta: {
          title: 'Websocket Layout Index',
          icon: 'refresh',
          keyword: ['websocket'],
          dropdownOpen: false,
          isRepeat: true,
          isShow: true,
          keepAlive: true,
          limitTabs: 2,
          isBreadcrumb: {
            isShow: true,
            isSelected: true,
          },
        },
        redirect: { name: 'websocket-index' },
        children:[
          {
            path: 'index-component',
            name: 'websocket-index',
            component: () => import("@/modules/web-sockets/components/IndexComponent.vue"),
            meta: {
              title: 'Websocket Index Component',
              icon: 'refresh',
              keyword: ['websocket'],
              dropdownOpen: false,
              isShow: true,
              isRepeat: true,
              keepAlive: true,
              limitTabs: 2,
              isBreadcrumb: {
                isShow: true,
                isSelected: true,
              },
            }
          },
          {
            path: 'index-inter',
            name: 'websocket-index-inter',
            component: () => import("@/modules/web-sockets/components/IndexInter.vue"),
            meta: {
              title: 'Websocket Index Inter',
              icon: 'refresh',
              keyword: ['websocket'],
              dropdownOpen: false,
              isShow: true,
              isRepeat: true,
              isAlwaysOpen: true,
              keepAlive: true,
              limitTabs: 2,
              isBreadcrumb: {
                isShow: true,
                isSelected: true,
              },
            }
          },
          {
            path: 'desk/:id_desk?',
            name: 'websocket-desk',
            component: () => import("@/modules/web-sockets/components/Desk.vue"),
            meta: {
              title: 'Websocket Desk',
              icon: 'refresh',
              keyword: ['websocket'],
              dropdownOpen: false,
              isShow: false,
              keepAlive: true,
              isBreadcrumb: {
                isShow: true,
                isSelected: true,
              },
              permissions: {
                name: "websocket_desk",
                value: "add",
              }
            }
          },
        ]
      },
      {
        path: 'new-ticket',
        name: 'websocket-new-ticket',
        component: () => import("@/modules/web-sockets/components/NewTicket.vue"),
        meta: {
          title: 'Websocket New Ticket',
          icon: 'refresh',
          keyword: ['websocket'],
          dropdownOpen: false,
          isShow: true,
          isRepeat: false,
          keepAlive: true,
          limitTabs: 2,
        }
      },
      {
        path: 'public',
        name: 'websocket-public',
        component: () => import("@/modules/web-sockets/components/Public.vue"),
        meta: {
          title: 'Websocket Public',
          icon: 'refresh',
          keyword: ['websocket'],
          dropdownOpen: false,
          isShow: true,
          isRepeat: true,
          keepAlive: true
        }
      },
    ]
  },
];

export const routesView = <any>[
  {
    path: `/`,
    name: "home-page",
    component: () => import("@/modules/MainLayout.vue"),
    redirect: { name: `dashboard` },
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import("@/modules/dashboard/layout/DashboardLayout.vue"),
        redirect: { name: `websocket-index-inter` }, // TODO: Verificar el redireccionamiento
        children: [...routesSidebar],
      }
    ],
  },
  {
    path: `/test`,
    name: "test",
    component: () => import("@/modules/buttons/buttons-action/layouts/ButtonsActionLayout.vue"),
  }
];
