import { io } from "socket.io-client";

type SocketAuthType = {
  id?: string;
  type: string;
};

export const createConnection = (orgId: string, identity: SocketAuthType) => {
  return io(import.meta.env.VITE_API_URL, {
    transports: ["websocket"],
    auth: {
      org: orgId,
      identity,
    },
  });
};
