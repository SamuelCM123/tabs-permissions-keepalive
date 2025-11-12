//* Importaciones
import { ref } from 'vue';

export const useTabs = (openComponents: any, hiddenComponents: any) => {

    //* PROPERTIES

    /**
     * -Controla cuando se oculta y cuando no el desplegable de pestañas ocultas
     */
    const isShowTabHidden = ref(false);

    /**
     * -Almacena el valor de pixeles restantes al restar ancho total del contenedor general,
     * menos el contenido total que abarcan los elementos hijos(abarcan espacios,bordes,etc..)
     */
    let sizeLeft = ref(0);

    //* METHODS

    /**
     * Controla el estado del desplegable de las pestañas ocultas
     */
    const openTabHidden = () => isShowTabHidden.value = !isShowTabHidden.value;

    /**
     * Se controla el agregado de pestañas ocultas
     */
    const addTabsHidden = async () => {

        try{
            // TODO: Cambiaran las variables reactivas por normales y retire los shallowRef
            /**
             * -Datos del componente a mover para las pestañas ocultas
             */
            let componentToMove = {};

            /**
             * -Clonar el array openComponents
             */
            const clonedArray = [];
            clonedArray.push(...openComponents.value);
            
            // Obtener y eliminar el último elemento del array clonado
            componentToMove = await clonedArray.pop();

            // Actualizar openComponents.value con el nuevo array sin el último elemento
            openComponents.value = clonedArray;

            // Agregar el elemento eliminado a hiddenComponents
            await hiddenComponents.value.unshift({
                ...componentToMove
            });

        }
        catch(error){
            // ToastStore.openToast({
            //     title: 'Desplazamiento de Pestañas Visualizables',
            //     message: 'Ha ocurrido un error al desplazar pestañas visualizables a las ocultas',
            //     type: 'error',
            // })
            // console.log('error:',error);

        }

    }

    /**
     * Controla el desplazamiento de las pestañas entre abiertas y ocultas dependiendo del espacio restante de las pestañas, 
     * cuando se abren pestañas, cuando se seleccionan pestañas ocultas o se redimensiona el navegador
     */
    const checkDisplaceTabs = async () => {

        try{

            console.log('sizeLeft:',sizeLeft.value);
            // Valida cuando se muestran las pestañas y cuando no
            if(sizeLeft.value < 0){
                console.log('openComponents:',openComponents.value);
                // Valida que no se pueda ocultar la unica pestaña abierta
                if(openComponents.value.length === 1) return

                while(sizeLeft.value < 0){
                    console.log('sizeLeft:',sizeLeft.value);
                    
                    // Calcula el espacio restante del contenedor general de pestañas
                    await calcSizeContainerTabs();
                    
                    // Se agregan pestañas ocultas
                    await addTabsHidden();

                    // Calcula el espacio restante del contenedor general de pestañas
                    await calcSizeContainerTabs();
                }
            }
            else if(sizeLeft.value > 195){
                // Se agregan pestañas para abrir
                await checkDisplaceHiddenTabs();
            }
        
        }
        catch(error){
            // ToastStore.openToast({
            //     title: 'Desplazamiento de Pestañas',
            //     message: 'Ha ocurrido un error al desplazar pestañas entre visualizables y ocultas',
            //     type: 'error',
            // })
            console.log('error:',error);
        }
    }

    /**
     * Se controla el desplazamiento de las pestañas ocultas a las pestañas abiertas
     */
    const displaceHiddenTabs = async () => {
        
        if(hiddenComponents.value.length > 0){
            const newHiddenComponents = [...hiddenComponents.value];
            const newOpenComponents = [...openComponents.value];
            const firstElement: any = await newHiddenComponents.shift();

            await newOpenComponents.push(firstElement);       

            // Asignar un nuevo array para mantener la reactividad
            hiddenComponents.value = newHiddenComponents; 

            // Asignar un nuevo array para mantener la reactividad
            openComponents.value = newOpenComponents; 
        }

    }

    /**
     * Controla el desplazamiento de las pestañas ocultas a las abiertas cuando cierran pestañas
     */
    const checkDisplaceHiddenTabs = async () => {

        try{

            // Calcula el espacio restante del contenedor general de pestañas
            await calcSizeContainerTabs();

            // console.log('sizeLeft:',sizeLeft.value);

            while(sizeLeft.value >= 150 && hiddenComponents.value.length > 0){
                    
                // Calcula el espacio restante del contenedor general de pestañas
                await calcSizeContainerTabs();
                
                // Se agregan pestañas abiertas
                await displaceHiddenTabs();

                // Calcula el espacio restante del contenedor general de pestañas
                await calcSizeContainerTabs();
            }

        }
        catch(error){
            // ToastStore.openToast({
            //     title: 'Desplazamiento de Pestañas Ocultas',
            //     message: 'Ha ocurrido un error al desplazar pestañas ocultas a las visualizables',
            //     type: 'error',
            // })
            console.log('error:',error);
        }
    }

    /**
     * Calcula los pixeles restantes del contenedor general de pestañas y dependiendo del espacio crea pestañas ocultas o
     * las abre en el mismo contenedor general, cuando se abren pestañas, cuando se seleccionan pestañas ocultas o se redimensiona el navegador
     */
    const handleDisplaceTabs = async () => {
        try{

            // Calcula el espacio restante del contenedor general de pestañas
            await calcSizeContainerTabs()
            
            // Determina si se abren las pestañas o si se desplazan a las pestañas ocultas
            await checkDisplaceTabs()
            
            // Calcula el espacio restante del contenedor general de pestañas
            await calcSizeContainerTabs()
        }
        catch(error){
            // ToastStore.openToast({
            //     title: 'Desplazamiento de Pestañas',
            //     message: 'Ha ocurrido un error en el desplazamiento de pestañas',
            //     type: 'error',
            // })
            console.log('error:',error);
        }
    }

    /**
     * Calcula los pixeles restantes de la resta del ancho total del contenedor general, menos el ancho total de todos los elementos hijos,
     * para determinar si se despliegan pestañas ocultas o no.
     */
    const calcSizeContainerTabs = async () => {

        try{

            /**
             * -Contenedor de pestañas
             */
            const containerTabs = ref<any>(null);

            /**
             * @type {Ref<Number>} -Ancho total del contenedor
             */
            const containerWidth = ref();

            /**
             * @type {Object} -Obtiene el conjunto de elementos hijos del contenedor general de pestañas
             */
            let childrenContainerTabs;

            /**
             * @type {Ref<Number>} -Acumula el número de pixeles del ancho de todos los elementos hijos del contenedor de pestañas(sin contar espaciados)
             */
            let childrenWidth = ref(0);

            /**
             * @type {Ref<Number>} -Acumula el número de pixeles del ancho de todos los elementos hijos del contenedor de pestañas(contando espaciados)
             */
            let numberSizeChildren = ref(0);

            // Obtiene el contenedor de pestañas
            containerTabs.value = document.querySelector('.container-tabs')

            if(containerTabs.value) {

                // Obtiene el número de pixeles del ancho del contenedor
                containerWidth.value  = containerTabs.value.clientWidth;

                // Obtiene todo los elementos hijos del contenedor
                childrenContainerTabs = containerTabs.value.children;

                // Obtiene y acumula el ancho de los elementos hijos
                for (let i = 0; i < childrenContainerTabs.length; i++) {
                    const child = childrenContainerTabs[i];
                    childrenWidth.value += child.offsetWidth;
                }
                
                // Obtiene el número de pixeles totales que abarcan los componentes hijos
                numberSizeChildren.value = childrenWidth.value + ((childrenContainerTabs.length-1) * 5);
                
                // Al contenido total del contenedor principal se le resta el contenido usado para determinar el tamaño libre restante
                sizeLeft.value = containerWidth.value - numberSizeChildren.value;
            }
        }
        catch(error){
            // ToastStore.openToast({
            //     title: 'Calculo de Espacio para Pestañas',
            //     message: 'Ha ocurrido un error al calcular el espacio disponible para desplegar pestañas',
            //     type: 'error',
            // })
            console.log('error:',error);
        }
    }

    return {
        //* PROPERTIES
        isShowTabHidden,
        sizeLeft,
            
        //* METHODS
        openTabHidden,
        handleDisplaceTabs,
    }

}