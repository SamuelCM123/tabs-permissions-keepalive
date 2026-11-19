<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'
import { QrcodeStream, QrcodeDropZone, type BarcodeFormat } from 'vue-qrcode-reader'
import { useVerifyScanner } from '@/modules/qr-scanner/composables/useVerifyScanner'
import { useCameraDetection } from '@/modules/qr-scanner/composables/useCameraDetection'
import { useBarcodeScanner } from '@/modules/qr-scanner/composables/useBarcodeScanner'

const { isScannerActive } = useVerifyScanner()
const { cameraCount, hasCamera, isSupported, permissionState, cameras, isReady, selectedDeviceId, loadCameras } = useCameraDetection()

//? Define qué formatos quieres que la cámara busque activamente
const allFormats: BarcodeFormat[] = [
    'qr_code',
    'code_128',
    'code_39',
    'code_93',
    'codabar',
    'data_matrix',
    'ean_13',
    'ean_8',
    'itf',
    'pdf417',
    'upc_a',
    'upc_e',
    'aztec',
    'databar',
    'databar_expanded',
    'dx_film_edge',
    'linear_codes',
    'matrix_codes',
    'maxi_code',
    'micro_qr_code',
    'pdf417',
    'rm_qr_code',
    'upc_a',
    'upc_e',
]
const scannedResult = ref<string>('')
const isCameraOpen = ref<boolean>(false)

// Función central: Procesa el código venga de donde venga
function handleCodeScanned(code: string) {
    scannedResult.value = code
    console.log('Código listo para procesar:', code)

    // Si la cámara estaba abierta, la cerramos tras un escaneo exitoso
    if (isCameraOpen.value) {
        isCameraOpen.value = false
    }
}

// 1. Escuchar la pistola en segundo plano de forma global
useBarcodeScanner((code) => {
    handleCodeScanned(code)
})

// 2. Manejador para la cámara móvil (usando vue-qrcode-reader)
function onCameraDetect(detectedCodes: Array<{ rawValue: string }>) {
    const code = detectedCodes[0]?.rawValue
    if (code) {
        handleCodeScanned(code)
    }
}

const buttonLoading = defineAsyncComponent(() => import('@/shared/components/buttons/components/ButtonLoading.vue'))
const Select = defineAsyncComponent(() => import('@/shared/components/select/components/Select.vue'))

</script>

<template>
    <div class="scanner-container">
        <h2>Módulo de Escaneo</h2>

        <!-- Resultado -->
        <div v-if="scannedResult" class="result-box">
            Último código: <strong>{{ scannedResult }}</strong>
        </div>


        <div class="scanner-status">
            <!-- <span v-if="isScannerActive || hasCamera" class="badge-success"> -->
            <span v-if="hasCamera && isSupported" class="badge-success">
                🟢 Escáner físico detectado y listo
            </span>
            <span v-else class="badge-warning">
                ⚪ Listo para escanear (Soporta pistola USB o Cámara)
            </span>
        </div>
        <!-- Indicador de estado de pistola -->
        <!-- <p class="status-text">
            💡 Puedes escanear en cualquier momento usando una pistola USB/Bluetooth.
        </p> -->

        <!--* Opción 1: Hay cámaras disponibles y soportadas -->
        <div v-if="isSupported && hasCamera">📷 Escanear con Cámara
            ({{ cameraCount }} disponible/s)</div>

        <h2>Selector de Cámara de Escaneo</h2>

        <!--* Selector dinámico de cámaras -->
        <div v-if="cameras.length > 0" class="control-panel">
            <label class="label-form">Cámara activa:</label>
            <Select title-place-holder="Seleccione una cámara" :icon-select="'camera_video'" :data="cameras" v-model="selectedDeviceId"></Select>
            <!-- <select id="cameraSelect" v-model="selectedDeviceId">
                <option v-for="camera in cameras" :key="camera.deviceId" :value="camera.deviceId">
                    {{ camera.label }}
                </option>
            </select> -->
        </div>

        <!--* Opción 2: Los permisos fueron denegados explícitamente -->
        <p v-if="permissionState === 'denied'" class="warning-text">
            ⚠️ Para escanear, debes habilitar los permisos de cámara en tu navegador.
        </p>

        <!--* Opción 3: Se intenta usar desde un sitio HTTP inseguro -->
        <p v-if="!isSupported" class="error-text">
            🚫 El escaneo por cámara requiere una conexión segura (HTTPS).
        </p>

        <!--* Habilitar y desabilitar cámara -->
        <buttonLoading :name-button="'Escanear'" :time-btn="3000" width="200px"
            :action-button="() => isCameraOpen = !isCameraOpen" @click="isCameraOpen = !isCameraOpen"
            :is-loading-inactive="true"></buttonLoading>

        <!--* Modal o Visor de Cámara -->
        <div v-if="isCameraOpen" class="camera-modal">
            <QrcodeStream :constraints="{ deviceId: { exact: selectedDeviceId.id } }" :formats="allFormats"
                @detect="onCameraDetect" />
        </div>
    </div>
</template>

<style scoped>
.scanner-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 400px;
}

.camera-modal {
    width: 100%;
    max-width: 350px;
    border: 2px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
}

.label-form {
    color: var(--color-f);
    font-weight: 600;
    font-size: 15px;
}
</style>