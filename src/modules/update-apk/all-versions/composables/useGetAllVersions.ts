import { ref, type Ref } from 'vue';
import { onMounted } from 'vue';
import { API_CONFIG } from '@/services/api/api.config.ts';
import socket from '@/modules/update-apk/all-versions/composables/useServices.ts';

interface version {
    app_name: string
    version: string
    // mandatory: string
    notes_release: string
    url_apk: string
    is_deprecated: boolean
    // url_latest: string
    // created_at: string
    // updated_at: string
    // apk: {
    //     size: number,
    //     url: string
    // }
}

export const useGetAllVersions = () => {

    //* PROPERTIES

    let columnsVersion = ref([
        {
            name: 'Nombre de Aplicación',
        },
        {
            name: 'Versión',
        },
        {
            name: 'Notas del Release',
        },
        {
            name: 'Deprecado',
        },
        {
            name: 'URL de Descarga',
        }
        // {
        //     name: 'Mandatorio',
        // },
        // {
        //     name: 'URL Latest',
        // },
        // {
        //     name: 'Fecha de Creación',
        // },
        // {
        //     name: 'Fecha de Actualización',
        // },
        // {
        //     name: 'Tamaño APK',
        // },
        // {
        //     name: 'URL de Descarga',
        // },
    ]);

    let versionData: Ref<version[]> = ref([]);

    //? Instancia de socket
    const wsService = socket;

    //* METHODS

    const getAllVersions = async () => {
        const response = await API_CONFIG.get('/api/apk/get-all-versions');
        versionData.value = response.data.response;
        console.log('versionData:', versionData.value);
    }

    const handleVersions = ( message: any ) => {

        // console.log('message:',message);
        // let { type, message } = message;
        versionData.value = message;

    }

    onMounted(() => {
        getAllVersions();
        wsService.onAllVersionsChanged(handleVersions);
    })

    return {
        //* PROPERTIES
        versionData,
        columnsVersion,
            
        //* METHODS
        
    }

}