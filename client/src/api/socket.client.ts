import { io, Socket } from "socket.io-client";

// A little API for the stateful socket connection, just to keep it out of the global
// namespace and away from the socket middleware
class SocketClient {
  socket: Socket | null;
  constructor(ip: string) {
    this.socket = io(ip, {
      transports: ["websocket"],
      query: {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJib2FyZElkIjoiNjE3MTQ2YzAxODAwODk0NDlkYzc2ZDIwIiwib3JnaWQiOiI2MTZlNWY3NjM3MjJiMWM4NTJiNmI1NWEifQ.DvbzHl9m9tZKikTMPgyHRI9ofZsLB3ZXZEXPLyivsiA",
      },
    });
  }

  // connect() {
  //   this.socket = io(import.meta.env.VITE_API_URL, {
  //     transports: ["websocket"],
  //     query: {
  //       token:
  //         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJib2FyZElkIjoiNjE3MTQ2YzAxODAwODk0NDlkYzc2ZDIwIiwib3JnaWQiOiI2MTZlNWY3NjM3MjJiMWM4NTJiNmI1NWEifQ.DvbzHl9m9tZKikTMPgyHRI9ofZsLB3ZXZEXPLyivsiA",
  //     },
  //   });
  // }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  updateBoard(data: any) {
    if (this.socket) {
      this.socket.emit("update", data);
    } else {
      console.log("error");
    }
  }

  emit(eventName: string, data: any) {
    console.log(eventName, data);
    if (this.socket) {
      this.socket.emit(eventName, data);
    } else {
      console.log("error");
    }
  }

  on(eventName: string, func: (a: any) => void) {
    if (this.socket) {
      this.socket.on(eventName, func);
    } else {
      console.log("error");
    }
  }
}

export default new SocketClient(import.meta.env.VITE_API_URL);
