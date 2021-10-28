import { io } from "socket.io-client";

type SocketAuthType = {
  id?: string;
  type: string;
};

export const createConnection = (orgId: string, identity: SocketAuthType) => {
  return io("http://localhost:5000", {
    transports: ["websocket"],
    auth: {
      org: orgId,
      identity,
    },
  });
};
