import './assets/css/global.css'
// import './assets/css/main.css'
import './assets/css/hamburger.css'
import './assets/css/reset.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router, { setupRouterGuards } from './router'
import { setupInterceptor } from '@/services/api/interceptor';
// import { SocketIoManager } from './services/sockets/socket.io'

const app = createApp(App)
const pinia = createPinia();

//? Inicialización de Pinia
app.use(pinia)

//? Inicialización del enrutador
app.use(router)

//? Configurar los Guards
setupRouterGuards();
// redirectTabs(router);
// saveLastPath(router);

//? Configurar Interceptor
setupInterceptor();

//? Configuracón de Socket IO
// const socket = new SocketIoManager().connect();
// app.provide('socket', socket);


app.mount('#app')
