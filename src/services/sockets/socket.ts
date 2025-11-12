import { WS_CONFIG } from "@/services/sockets/socket.config.ts";

// 1. Definimos las interfaces para los mensajes del servidor
interface WsMessage<T = any> {
  type: string;
  payload: T;
}

// 2. Definimos el tipo para los callbacks de los eventos
type WsCallback<T = any> = (payload: T) => void;

class WebSocketManager {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private listeners: Record<string, WsCallback[]> = {};
  private pingTimeout: number | null = null;

  constructor() {
    this.connect();
  }

  public connect(): void {
    if (
      this.ws &&
      (this.ws.readyState === WebSocket.OPEN ||
        this.ws.readyState === WebSocket.CONNECTING)
    ) {
      return;
    }

    this.ws = new WebSocket(WS_CONFIG.url);

    this.ws.onopen = () => {
      console.log("WebSocket connected.");
      this.reconnectAttempts = 0;
      this.heartbeat();
      this.emit("connected", null); // Emitimos sin payload
    };

    this.ws.onmessage = (event) => {
      this.heartbeat();
      try {
        const message: WsMessage = JSON.parse(event.data);
        const { type, payload } = message;

        if (type === "ping") {
          this.ws!.send(JSON.stringify({ type: "pong" }));
          return;
        }

        this.emit(type, payload);
        console.log('listeners:',this.listeners);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    this.ws.onclose = () => {
      console.warn("WebSocket disconnected. Reconnecting...");
      if (this.pingTimeout) clearTimeout(this.pingTimeout);
      this.reconnect();
      this.emit("disconnected", null);
    };

    this.ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      if (this.ws) this.ws.close();
      this.emit("error", error);
    };
  }

  public send(message: WsMessage): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      console.error("Cannot send message. WebSocket is not open.");
    }
  }

  public on<T = any>(eventName: string, callback: WsCallback<T>): void {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(callback);
  }

  private emit(eventName: string, payload: any): void {
    if (this.listeners[eventName]) {
      this.listeners[eventName].forEach((callback) => callback(payload));
    }
  }

  private reconnect(): void {
    if (this.reconnectAttempts < WS_CONFIG.maxRetries) {
      setTimeout(() => {
        this.reconnectAttempts++;
        console.log(`Reconnection attempt #${this.reconnectAttempts}...`);
        this.connect();
      }, WS_CONFIG.reconnectInterval);
    } else {
      console.error("Max reconnection attempts reached.");
      this.emit("reconnect-failed", null);
    }
  }

  private heartbeat(): void {
    if (this.pingTimeout) clearTimeout(this.pingTimeout);
    this.pingTimeout = setTimeout(() => {
      this.send({ type: "ping", payload: {} });
    }, WS_CONFIG.heartbeat) as unknown as number;
  }

  public close(): void {
    if (this.ws) {
      this.ws.close();
    }
  }
}

export default new WebSocketManager();