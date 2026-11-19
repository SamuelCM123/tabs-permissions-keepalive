import { onMounted, onUnmounted } from "vue";

export function useBarcodeScanner(onScan: (code: string) => void) {
  let buffer = "";
  let lastKeyTime = Date.now();

  const handleKeyDown = (event: KeyboardEvent) => {
    const currentTime = Date.now();
    const timeDiff = currentTime - lastKeyTime;
    lastKeyTime = currentTime;

    //? Si pasan más de 50 ms entre teclas, el buffer se limpia (escritura humana)
    if (timeDiff > 50) {
      buffer = "";
    }

    if (event.key === "Enter") {
      //? Un código válido de barras suele tener más de 2 o 3 caracteres
      if (buffer.length >= 3) {
        onScan(buffer);
        buffer = "";
      }
      return;
    }

    //? Capturar solo caracteres imprimibles
    if (event.key.length === 1) {
      buffer += event.key;
    }
  };

  onMounted(() => window.addEventListener("keydown", handleKeyDown));
  onUnmounted(() => window.removeEventListener("keydown", handleKeyDown));
}
