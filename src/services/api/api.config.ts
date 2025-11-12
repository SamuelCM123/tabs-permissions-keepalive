import axios from 'axios';

/**
 * Instancia de Axios preconfigurada para la API de la aplicación
 * @type {import('axios').AxiosInstance}
 */
export const API_CONFIG = axios.create({
    baseURL: import.meta.env.VITE_API_HTTP,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    timeout: import.meta.env.VITE_TIMEOUT,
});