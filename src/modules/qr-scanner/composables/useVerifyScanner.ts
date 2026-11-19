import { ref } from "vue";
import { useBarcodeScanner } from "./useBarcodeScanner";

export const useVerifyScanner = () => {
  //* PROPERTIES
  const isScannerActive = ref(false);
  const lastScannedCode = ref("");

  //* METHODS
  useBarcodeScanner((code) => {
    // Tan pronto se realiza el primer escaneo con éxito, confirmamos que hay escáner
    isScannerActive.value = true;
    lastScannedCode.value = code;
  });

  return {
    //* PROPERTIES
    isScannerActive,
    // lastScannedCode,

    //* METHODS
  };
};
