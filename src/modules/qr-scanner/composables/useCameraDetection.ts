import type { ISelectedData } from "@/shared/components/select/composables/useSelect";
import { ref, type Ref, onMounted } from "vue";

interface CameraDevice {
  id: string;
  name: string;
  alt_name: string;
}

export function useCameraDetection() {
  const cameras: Ref<ISelectedData[]> = ref([]);
  const selectedDeviceId = ref<ISelectedData>({
    id: "",
    name: "",
    alt_name: "",
  });
  const isReady = ref<boolean>(false);

  const isSupported = ref<boolean>(false);
  const hasCamera = ref<boolean>(false);
  const permissionState = ref<"granted" | "denied" | "prompt" | "unknown">(
    "unknown",
  );
  const cameraCount = ref<number>(0);

  const checkCameraAvailability = async () => {
    //? 1. Verificar soporte de la API (Si no hay HTTPS, navigator.mediaDevices será undefined)
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      isSupported.value = false;
      hasCamera.value = false;
      return;
    }

    isSupported.value = true;

    try {
      //? 2. Listar todos los dispositivos multimedia
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(
        (device) => device.kind === "videoinput",
      );

      cameraCount.value = videoDevices.length;
      hasCamera.value = videoDevices.length > 0;

      //? 3. Consultar el estado de permisos (Si el navegador lo soporta)
      if (navigator.permissions && navigator.permissions.query) {
        try {
          //* Nota: 'camera' como PermissionName no está en todos los d.ts viejos, por eso el cast
          const status = await navigator.permissions.query({
            name: "camera" as PermissionName,
          });
          permissionState.value = status.state;

          //* Escuchar cambios de permiso en tiempo real
          status.onchange = () => {
            permissionState.value = status.state;
          };
        } catch (e) {
          //* Navegadores como Firefox o versiones antiguas de Safari no soportan query('camera')
          permissionState.value = "unknown";
        }
      }
    } catch (error) {
      console.error("Error al verificar cámaras del dispositivo:", error);
      hasCamera.value = false;
    }
  };

  // Cargar la lista de cámaras con sus nombres reales
  async function loadCameras() {
    try {
      // 1. Permiso temporal rápido para que el navegador exponga las "labels" reales de las cámaras
      const initialStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      // 2. Obtener lista completa de dispositivos
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(
        (device) => device.kind === "videoinput",
      );

      // 3. Mapear a un array limpio
      cameras.value = videoDevices.map((device, index) => {
        console.log(device);
        let data: ISelectedData = {
          id: device.deviceId,
          name: device.label || `Cámara ${index + 1}`,
          alt_name: device.label || `Cámara ${index + 1}`,
        };
        return data;
      });
      console.log("cameras.value:", cameras.value);
      // Seleccionar la primera cámara disponible por defecto
      if (cameras.value.length > 0) {
        selectedDeviceId.value.id = cameras.value[0].id;
      }

      // 4. Detener el stream temporal para liberar la cámara
      initialStream.getTracks().forEach((track) => track.stop());
      isReady.value = true;
    } catch (error) {
      console.error("Error al solicitar permisos o listar cámaras:", error);
    }
  }

  onMounted(() => {
    checkCameraAvailability();
    loadCameras();
  });

  return {
    isSupported, // Si la web corre en HTTPS y soporta WebRTC
    hasCamera, // Si detectó al menos 1 cámara física
    permissionState, // 'granted', 'denied', 'prompt' o 'unknown'
    cameraCount, // Número total de cámaras encontradas (trasera, frontal, etc.)
    cameras,
    selectedDeviceId,
    isReady,

    loadCameras,
  };
}
