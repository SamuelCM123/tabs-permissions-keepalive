<script setup>

    // Importaciones Generales
    import { defineAsyncComponent } from 'vue';

    // Importaciones de Composables
    import { useGetAllVersions } from '@/modules/update-apk/all-versions/composables/useGetAllVersions.ts';
    import { usePublishVersion } from '@/modules/update-apk/all-versions/composables/usePublishVersion.ts';

    // Importaciones de Utils
    import { formatBytes } from '../../../../shared/utils/format/format_bytes';

    // Desestructuraciones de Composables
    const {
        // Properties
        versionData,
        columnsVersion,
    }= useGetAllVersions();

    const {
        // Properties
        formDataPublishVersion,

        // Methods
        formSubmitPublishVersion
    } = usePublishVersion();

    // Componentes
    const BaseTable = defineAsyncComponent(() => import('@/shared/components/vue-table/base-table/BaseTableNew.vue'));

</script>

<template>
    <div class="container-module"> 
        <div class="container-table">
            <!--* COMPONENTE BASE TABLE -->
            <BaseTable
                :is-mobile="false"
            >

                <template #thead-desktop>
                    <thead class="thead-table">

                        <tr class="table-column-wrapper">

                            <template v-for="n in columnsVersion" :key="n">

                                <th class="table-column">

                                    <div class="column-wrapper">

                                        {{ n.name }}

                                    </div>

                                </th>

                            </template>

                        </tr>

                    </thead>
                </template>

                <template #tbody-desktop>
                    <tr class="table-row" v-for="(item, index) in versionData" :key="index">

                        <td class="table-row-value">
                            {{ item.app_name }}
                        </td>
                        <td class="table-row-value text-mayus">
                            {{ item.version }}
                        </td>
                        <td class="table-row-value text-mayus">
                            {{ item.notes_release }}
                        </td>
                        <td class="table-row-value text-mayus">
                            {{ item.is_deprecated ? 'SI' : 'NO' }}
                        </td>
                        <td class="table-row-value text-mayus">
                            <span class="text-ellipsis" tabindex="0">
                                {{  item.url_apk }}
                            </span>
                        </td>
                        <!-- <td class="table-row-value text-mayus">
                            {{ item.mandatory ? 'SI' : 'NO' }}
                        </td>
                        <td class="table-row-value text-mayus">
                            <span class="text-ellipsis">
                                {{ item.url_latest }}
                            </span>
                        </td>
                        <td class="table-row-value text-mayus">
                            <span class="text-ellipsis">
                                {{ item.created_at }}
                            </span>
                        </td>
                        <td class="table-row-value text-mayus">
                            <span class="text-ellipsis">
                                {{ item.updated_at }}
                            </span>
                        </td>
                        <td class="table-row-value text-mayus">
                            {{  item.apk.size ?? false ?formatBytes(item.apk.size) : '' }}
                        </td>
                        <td class="table-row-value text-mayus">
                            <span class="text-ellipsis">
                                {{ item.apk.url }}
                            </span>
                        </td> -->

                    </tr>
                </template>

            </BaseTable>
        </div>

        <h1 class="title-section">Actualizar Release (APK)</h1>

        <div class="container-wrapper-general">

            <span class="label-form">Nombre de Aplicación</span>

            <div class="general-wrapper">

                <div class="wrapper-input">
                    <input v-model="formDataPublishVersion.name_app" type="text" class="input-form" placeholder="Ingrese Nombre Aplicación" autofocus>
                </div>
            </div>
        </div>
        <div class="container-wrapper-general">

            <span class="label-form">Versión</span>

            <div class="general-wrapper">

                <div class="wrapper-input">
                    <input v-model="formDataPublishVersion.version" type="text" class="input-form" placeholder="Ingrese Versión" autofocus>
                </div>
            </div>
        </div>
        <!-- <div class="container-wrapper-general">

            <span class="label-form">Enlace de Descarga</span>

            <div class="general-wrapper">

                <div class="wrapper-input">
                    <input v-model="formDataPublishVersion.url_download" type="text" class="input-form" placeholder="Ingrese Enlace de Descarga" autofocus>
                </div>
            </div>
        </div> -->
        <div class="container-wrapper-general">

            <span class="label-form">Notas del Release</span>

            <div class="general-wrapper">

                <div class="wrapper-input">
                    <input v-model="formDataPublishVersion.notes_release" type="text" class="input-form" placeholder="Ingrese Notas del Release" autofocus>
                </div>
            </div>
        </div>

        <div class="container-wrapper-general">
            <button class="btn-form" @click="formSubmitPublishVersion">Publicar</button>
        </div>

    </div>
</template>

<style scoped>

    @import url('../css/tableUsers.css');

    .container-module{
        display: flex;
        flex-direction: column;
        /* justify-content: center; */
        align-items: center;
        margin-top: 20px;
        width: 100%;
        gap: 20px;
    }

    .table-column{
        padding: 10px 8px;
    }

    .column-wrapper{
        font-size: 12px;
        /* white-space: nowrap; */
    }

    .container-table {
        display: flex;
        /* min-height: 80px; */
        /* position: relative; */
        /* width: 2000px; */
        min-width: 800px;
        /* max-width: 800px; */
        /* overflow: auto; */
        /* width: auto; */
        /* overflow: auto; */
        outline: 1px solid #EAEAEA;
        border-radius: 10px;
    }

    .title-section{
        text-align: center;
        font-size: 24px;
        font-weight: 500;
    }

    .container-wrapper-general{
        width: 300px;
    }

</style>