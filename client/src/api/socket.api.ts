import { io } from "socket.io-client";

type SocketAuthType = {
  // id?: string;
  // type: string;
  token: string;
};

export const createConnection = () => {
  return io(import.meta.env.VITE_API_URL, {
    transports: ["websocket"],
    auth: {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJib2FyZElkIjoiNjE3MTQ2YzAxODAwODk0NDlkYzc2ZDIwIiwib3JnaWQiOiI2MTZlNWY3NjM3MjJiMWM4NTJiNmI1NWEifQ.DvbzHl9m9tZKikTMPgyHRI9ofZsLB3ZXZEXPLyivsiA",
    },
  });
};
