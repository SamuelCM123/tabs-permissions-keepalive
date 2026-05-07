import { API_CONFIG } from "../api.config";
import { errorCaught } from "@/shared/helpers/error-handler";
import { useToastStore } from '@/shared/components/toast/stores/useToastStore.ts';
// import { EncryptService } from "@/shared/helpers/encrypt/encrypt";

export const setupInterceptor = () => {

    //? Instancia de Encrypter
    // const encrypter = new EncryptService();

    //? Asignaciones de Stores
    const ToastStore = useToastStore();

    API_CONFIG.interceptors.response.use(

        (response) => {

            // if(response.data.status) return response;
            
            // let dataDecrypt = encrypter.decrypt(response.data.data);
            // return { data: dataDecrypt };
            return response;
        },
        (error) => { 

            errorCaught(error);
            return error;
        }
    );

}