//* Importaciones
import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useToastStore = defineStore('Toast',() => {

    // STATES
    const toasts: any = ref([]);
    const activeToastCount = ref(0);

    // ACTIONS
    /**
     * Habilita una notificación toast.
     * @function
     * @name openToast
     * @param {object} toastConfig - Define la configuración del toast.  
     * @param {string} toastConfig.title - Título principal de la notificación.  
     * @param {string} toastConfig.message - Mensaje de la notificación.  
     * @param {string} toastConfig.type - Typo de notificación.  
     * @param {string} toastConfig.duration - Duración de notificación.  
     * @returns {undefined}
     */
    const openToast = async ({ title = '', message = '', type = 'success', duration = 7000 }) => {

        let icon = '';

        if( type === 'success') {
            icon = 'check_circle';
        } else if( type === 'error') {
            icon = 'cancel';
        } else if( type === 'info') {
            icon = 'info';
        } else {
            icon = 'warning';
        }

        const toast = ref({
            title,
            message,
            type,
            icon,
            progress: 100,
        });

        // Borrar último toast
        // let resp = await handleDeleteToast();
        await handleDeleteToast();

        // if(resp){
        //     setTimeout(() => {
                toasts.value.push(toast.value);
        //     },500)
        // }
        // else{
            // toasts.value.push(toast.value);
        // }
        activeToastCount.value++;

        const interval = setInterval(() => {

            if (toast.value.progress > 0) {
                // console.log('Math.round(100 / (duration / 100):',100 / (duration / 100));
                if((toast.value.progress - (100 / (duration / 100))) <= 0){
                    toast.value.progress = 0;
                    activeToastCount.value--;
                }
                else{
                    toast.value.progress -= (100 / (duration / 100));
                }
                // console.log('toast.value.progress:',toast.value.progress);
            } else {
                // Borrar todos los toast
                removeAllToast();

                // Limpiar el intervalo
                clearInterval(interval);
            }

        }, 100);

    };

    const removeToast = (indexSelected: number) => {

        toasts.value.forEach((toast: any,indexToast: number) => {
            if(indexSelected === indexToast){
                // console.log('indexSelected:',indexSelected);
                // console.log('indexToast:',indexToast);
                toast.progress = 0;
                activeToastCount.value--;
            }
        });
        // toasts.value.splice(index, 1);
    };

    const removeAllToast = () => {
        if(activeToastCount.value <= 0 ){

            // console.log('entro remover');
            setTimeout(() => {
                toasts.value = [];
            },500)
        }
    }

    const removeFirstToast = async () => {
        // console.log('toasts:',toasts.value);
        let resp = toasts.value.findIndex((toast: { progress: number; }) => toast.progress > 0 );
        // console.log('resp:',resp);

        toasts.value[resp].progress = 0;
        activeToastCount.value--;

    }

    const handleDeleteToast = async () => {

        let toastContainer = document.querySelector('.toast-container');
        
        // console.log('toastContainer:',toastContainer);
        // console.log('toastContainer:',toastContainer!.clientHeight);
        // console.log('window.innerHeight:',window.innerHeight);
        // if((toastContainer.clientHeight + 500) > window.innerHeight){
        if((toastContainer!.clientHeight + 200) > window.innerHeight){
            await removeFirstToast();

            return true;
        }
    }

    return {
        // STATES
        toasts,

        // ACTIONS
        openToast,
        removeToast,
        handleDeleteToast,
    }
})