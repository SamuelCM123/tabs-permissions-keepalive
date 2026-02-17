<script setup>
    
    // Importaciones Generales
    import { defineAsyncComponent, onMounted } from 'vue';

    // Importaciones de Composables
    import { useGetProfiles } from '@/modules/profiles/composables/useGetProfiles.ts';
    
    // Definiciones de Props
    // const props = defineProps({
    //     permissions: { type: null },
    // });

    // Desestructuraciones de Composables
    const {
        // Properties
        listProfiles,
        isSkeletonLoading,
        isSkeletonSearchLoading,
        searchInput,
        filteredData,
        Router,
            
        // Methods
        getProfiles,
        searchProfile,
        openEditProfiles,
    } = useGetProfiles();

    // Componentes
    const CardAdd = defineAsyncComponent(() => import('@/shared/components/cards/CardAdd.vue'));
    const Search = defineAsyncComponent(() => import('@/shared/components/vue-table/controls/Search.vue'));
    const SkeletonLoader = defineAsyncComponent(() => import('@/shared/components/skeletons-loaders/components/SkeletonLoader.vue'));

    // Ciclos de vida
    onMounted(async () => {

        // Obtener perfiles al cargar la página
        await getProfiles();
    });

</script>

<template>
    <div class="container-submodule">
        
        <!--* TÍTULO DEL SUBMÓDULO -->
        <!-- <div class="title-section">Perfiles</div> -->

        <!--* MENSAJES DEL SUBMÓDULO -->
        <div class="wrapper-message">
            <p class="message-step">
                Los perfiles definirán las capacidades y restricciones de cada usuario dentro del sistema, determinando qué funcionalidades pueden acceder y qué acciones pueden realizar
            </p>
        </div>

        <div class="container-content-profiles">

            <Transition name="fade">

                <template v-if="isSkeletonLoading">

                    <!--* COMPONENTE DEL ESQUELETO DE CARGA INICIALIZACIÓN DE REGISTROS -->
                    <SkeletonLoader>

                        <!--* SLOT DE CONTENIDO DEL ESQUELETO -->
                        <template #content-skeleton>
                            <div class="container-skeleton-profiles">
                                <div class="wrapper-search-skeleton" v-if="listProfiles?.length > 0">
                                    <div class="skeleton-search"></div>
                                    <div class="btn-skeleton"></div>
                                    <div class="btn-skeleton"></div>
                                </div>
                                <div class="skeleton-loader">
                                    <div class="skeleton-rectangle" v-for="n in 10" :key="n"></div>
                                </div>
                            </div>
                        </template>

                    </SkeletonLoader>

                </template>
                <template v-else>

                    <!--* CON PERFILES -->
                    <div class="wrapper-with-profiles" v-if="listProfiles?.length > 0">

                        <!--* BUSCADOR -->
                        <div class="wrapper-search" v-if="listProfiles?.length > 10">
                            <Search
                                v-model="searchInput"
                                :get-data="searchProfile"
                                :search-input="searchInput"
                                @default-table="searchProfile"
                            >
                            </Search>
                        </div>

                        <!--* CONTENEDOR DE TARJETAS DE PERFILES -->
                        <div class="wrapper-cards-profiles">

                            <Transition name="fade">

                                <template v-if="isSkeletonSearchLoading">

                                    <!--* COMPONENTE DEL ESQUELETO DE CARGA PARA REGISTROS DE BUSQUEDA -->
                                    <SkeletonLoader>

                                        <!--* SLOT DE CONTENIDO DEL ESQUELETO -->
                                        <template #content-skeleton>
                                            <div class="skeleton-loader">
                                                <div class="skeleton-rectangle" v-for="n in 10" :key="n"></div>
                                            </div>
                                        </template>

                                    </SkeletonLoader>

                                </template>
                                <template v-else>
                                    
                                    <!--* CONTENEDOR DE PERFILES -->
                                    <div class="wrapper-list-profiles">

                                        <!-- TODO: Permisos Agregar -->
                                        <!-- v-if="props.permissions?.profiles?.add" -->
                                        <!--* BOTÓN AGREGAR PERFIL -->
                                        <CardAdd
                                            :icon="'add_notes'"
                                            :text="'Agregar Perfil'"
                                            @click="Router.push({ name: 'profile-add'})"
                                        ></CardAdd>

                                        <!--* ITERACIÓN DE CARDS DE PERFILES -->
                                        <!-- TODO: Permisos Editar -->
                                        <!-- :class="{'container-card-no-hover': props.permissions?.profiles?.edit === false}" -->
                                        <router-link
                                                :to="{ name: 'profile-edit', params: { id_profile: 202 } }"
                                                class="container-card"
                                                v-for="(profile,index) in filteredData"
                                                :key="index"
                                            >

                                            <!--* TÍTULO DE PERFIL -->
                                            <div class="card-title text-mayus" :title="profile.name">
                                                <span class="title-profile">{{ profile.name }}</span>
                                            </div>

                                            <!--* CONTENIDO DEL PERFIL -->
                                            <div class="card-content">

                                                <!--* CONTENEDOR DE PERMISOS -->
                                                <div class="wrapper-permissions">

                                                    <span class="card-text-permission text-mayus">Permisos</span>

                                                    <div class="wrapper-list-permissions">

                                                        <span v-if="profile.permissions.read" class="content-wrapper">
                                                            <span class="material-symbols-rounded icon-permission">visibility</span>
                                                            <span class="name-permission">Visualizar</span>
                                                        </span>

                                                        <span v-if="profile.permissions.add" class="content-wrapper">
                                                            <span class="material-symbols-rounded icon-permission">add_circle</span>
                                                            <span class="name-permission">Agregar</span>
                                                        </span>

                                                        <span v-if="profile.permissions.edit" class="content-wrapper">
                                                            <span class="material-symbols-rounded icon-permission">edit</span>
                                                            <span class="name-permission">Editar</span>
                                                        </span>

                                                        <span v-if="profile.permissions.disable" class="content-wrapper">
                                                            <span class="material-symbols-rounded icon-permission">hide_source</span>
                                                            <span class="name-permission">Inhabilitar</span>
                                                        </span>

                                                    </div>

                                                </div>

                                                <div 
                                                    class="card-status"
                                                    :class="profile.status === 2 ? 'status-active':'status-inactive'"
                                                    >
                                                    {{ profile.status === 2 ? 'Activo':'Inactivo' }}
                                                </div>

                                            </div>

                                        </router-link>

                                    </div>
                                    
                                </template>
                                
                            </Transition>

                        </div>
                        
                    </div>

                    <!--* SIN PERFILES -->
                    <div v-else-if="isSkeletonLoading === false && listProfiles?.length === 0" class="wrapper-without-profiles">

                        <!--* BOTÓN AGREGAR PERFIL -->
                        <!-- TODO: Permisos Agregar -->
                        <!-- v-if="props.permissions?.profiles?.add" -->
                        <CardAdd
                            icon="add_notes"
                            :text="'Agregar Perfil'" 
                            @click="Router.push({ name: 'profile-add'})"
                        ></CardAdd>

                        <!--* MENSAJE PARA AGREGAR PERFIL -->
                        <div class="wrapper-message-empty">
                            <p class="message-step">Aún no cuenta con perfiles disponibles</p>
                            <!-- TODO: Permisos Agregar -->
                            <!-- v-if="props.permissions?.profiles?.add" -->
                            <p 
                                class="message-step"
                                >
                                De clic en <span class="letter-bold">Agregar Perfil</span>, para comenzar a configurar nuevos perfiles
                            </p>
                        </div>

                    </div>
                    
                </template>

            </Transition>
        </div>

    </div>
</template>

<style scoped>
    .container-submodule {
        display: flex;
        align-items: center;
        flex-direction: column;
        text-align: center;
        position: relative;
        /* max-width: 1100px; */
        margin-top: 20px;
        padding: 0px 5%;
        padding-bottom: 40px;
        width: 100%;
        gap: 20px;
    }

    .container-content-profiles{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        width: 100%;
        gap: 20px;
    }

    .wrapper-with-profiles{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        gap: 20px;
    }

    .wrapper-without-profiles{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        gap: 20px;
    }

    .wrapper-cards-profiles{
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        position: relative;
        width: 100%;
        height: 100%;
    }

    .wrapper-list-profiles{
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 200px));
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        width: 100%;
        gap: 40px;
    }

    /* CARD */
    .container-card{
        display: flex;
        flex-direction: column;
        outline: solid 2px #293277;
        border-radius: 25px;
        max-height: 260px;
        height: 260px;
        overflow: hidden;
        transition: all ease .3s;
        cursor: pointer;
        user-select: none;
    }

    .container-card:hover{
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.24);
        opacity: 0.8;
        transition: all ease .3s;
    }

    .container-card-no-hover:hover{
        cursor: default;
        box-shadow: none;
        opacity: initial;
    }

    .card-title{
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #293277;
        min-height: 50px;
        width: 100%;
    }

    .title-profile{
        color: #fff;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
        overflow: hidden;
        /* padding: 15px 10px; */
        font-weight: 600;
        font-size: 14px;
        width: 90%;
    }

    .card-content{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 10px 5px 5px 5px;
        width: 200px;
        height: 100%;
        gap: 12px;
    }

    .wrapper-permissions{
        display: flex;
        flex-direction: column;
        /* justify-content: space-between; */
        align-items: center;
        height: 100%;
        gap: 10px;
    }

    .card-text-permission{
        font-weight: 600;
    }

    .wrapper-list-permissions{
        display: flex;
        justify-content: center;
        flex-direction: column;
        width: 70%;
        /* height: 100%; */
        gap: 5px;
    }

    .content-wrapper{
        display: flex;
        justify-content: start;
        width: 150px;
        gap: 5px;
    }

    .name-permission{
        font-size: 14px;
    }

    .card-status{
        display: flex;
        justify-content: center;
        align-items: center;
        /* padding: 5px 0px; */
        /* width: 100%; */
        min-width: 180px;
        min-height: 30px;
        border-radius: 30px;
        font-weight: 600;
        font-size: 15px;
    }

    .container-skeleton-profiles{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        gap: 20px;
    }

    .wrapper-search-skeleton{
        display: flex;
        justify-content: center;
        width: 100%;
        gap: 5px;
    }

    .skeleton-loader {
        display: grid;
        justify-content: center;
        grid-template-columns: repeat(auto-fill, minmax(200px, 200px));
        gap: 40px;
        width: 100%;
    }

    .skeleton-search{
        background-color: #e0e0e0;
        animation: pulse 1.5s infinite ease-in-out;
        width: 100%;
        max-width: 290px;
        height: 45px;
        border-radius: 5px;
    }

    .btn-skeleton{
        background-color: #e0e0e0;
        animation: pulse 1.5s infinite ease-in-out;
        min-width: 45px;
        min-height: 45px;
        border-radius: 5px;
    }

    .skeleton-rectangle {
        outline: solid 2px #e0e0e0;
        border-radius: 10px;
        width: 200px;
        height: 250px;
        overflow: hidden;
        background-color: #e0e0e0;
        animation: pulse 1.5s infinite ease-in-out;
    }

    @keyframes pulse {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 0.5;
        }
        100% {
            opacity: 1;
        }
    }

    /* Estilos para tablets con pantalla de hasta 768px */
    @media screen and (max-width: 768px) {

        

    }

    /* Estilos para móviles con pantalla de hasta 460px */
    @media screen and (max-width: 460px) {

        .container-submodule{
            gap: 10px;
            padding-bottom: 20px;
        }

        .title-section{
            font-size: 22px;
        }

        .wrapper-list-profiles{
            gap: 20px;
        }

    }  
</style>