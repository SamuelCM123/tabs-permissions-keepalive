
/**
 * Configuración de WebSockets
 */
export const WS_CONFIG = {
  url: import.meta.env.VITE_API_WEBSOCKET, // viene del .env
  reconnectInterval: 3000,          // tiempo de reconexión
  maxRetries: 10,                   // intentos de reconexión
  heartbeat: 15000,                 // ping cada 15s (opcional)
};