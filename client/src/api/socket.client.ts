import { io, Socket } from "socket.io-client";

// A little API for the stateful socket connection, just to keep it out of the global
// namespace and away from the socket middleware
export default class SocketClient {
  socket!: Socket | null;

  connect() {
    this.socket = io(import.meta.env.VITE_API_URL, {
      transports: ["websocket"],
      query: {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJib2FyZElkIjoiNjE3MTQ2YzAxODAwODk0NDlkYzc2ZDIwIiwib3JnaWQiOiI2MTZlNWY3NjM3MjJiMWM4NTJiNmI1NWEifQ.DvbzHl9m9tZKikTMPgyHRI9ofZsLB3ZXZEXPLyivsiA",
      },
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  emit(eventName: string, data: any) {
    console.log(eventName, data);
    if (this.socket) {
      this.socket.emit(eventName, data);
    }
  }

  on(eventName: string, func: (a: any) => void) {
    if (this.socket) {
      this.socket.on(eventName, func);
    }
  }
}
