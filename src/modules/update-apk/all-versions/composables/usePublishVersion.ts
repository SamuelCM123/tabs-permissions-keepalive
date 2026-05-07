import { ref } from 'vue';
import { API_CONFIG } from '@/services/api/api.config';

interface FormDataPublishVersion {
    app_name: string;
    version: string;
    apk_url: string;
    notes_release: string;
}

export const usePublishVersion = () => {

    //* PROPERTIES
    let formDataPublishVersion = ref({
        name_app: '',
        version: '',
        url_download: '',
        notes_release: '',
    })

    //* METHODS

    const formSubmitPublishVersion = async () => {
        
        try{

            let bodyValidate: FormDataPublishVersion = {
                app_name: formDataPublishVersion.value.name_app,
                version: formDataPublishVersion.value.version,
                apk_url: formDataPublishVersion.value.url_download,
                notes_release: formDataPublishVersion.value.notes_release
            }

            const response = await API_CONFIG.post('/api/apk/publish-version', bodyValidate);
            const { success } = response.data;

            if(!success) return;
            
            cleanField();

        }
        catch(e){
            // console.log('error:',e);
        }

    }

    const cleanField = () => {
        formDataPublishVersion.value.name_app = '';
        formDataPublishVersion.value.version = '';
        formDataPublishVersion.value.url_download = '';
    }

    return {
        //* PROPERTIES
        formDataPublishVersion,
            
        //* METHODS
        formSubmitPublishVersion,
    }

}