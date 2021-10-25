import express from "express";
import cors from "cors";
import adminRoute from "./routes/admin.route";
import mongoose from "mongoose";
import { createServer } from "http";
import { Server } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import { createClient } from "redis";
import OrganizationModel from "./models/organization.model";
import { SocketAddress } from "net";
import AdminModel from "./models/admin.model";
import BoardModel from "./models/board.model";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/admin", adminRoute);

mongoose.connection.on("error", (err) => {
  console.log(err.message);
});

const server = createServer(app);

const io = new Server(server, { transports: ["websocket"] });
const pubClient = createClient({ host: "localhost", port: 6379 });
const subClient = pubClient.duplicate();

const checkForOrganization = async (id: string, type: string, cid: string) => {
  try {
    const checkForOrganization = await OrganizationModel.exists({ _id: id });
    let checkConnector;
    if (type === "admin") {
      checkConnector = await AdminModel.exists({ _id: cid });
    } else if ((type = "board")) {
      checkConnector = await BoardModel.exists({ _id: cid });
    } else {
      checkConnector = false;
    }
    return checkForOrganization && checkConnector;
  } catch (error: any) {
    console.log(error.message);
    return false;
  }
};

io.adapter(createAdapter(pubClient, subClient));
const nbn = io.of("/socket");
nbn.on("connection", async (socket) => {
  const orgId =
    socket.handshake.query["organization"]?.toString() || "nodOrgId";
  const connectorType = socket.handshake.query["type"]?.toString() || "nobody";
  const connectorId =
    socket.handshake.query["connectorId"]?.toString() || "noId";
  const checkConnectionValidity = await checkForOrganization(
    orgId,
    connectorType,
    connectorId
  );
  if (checkConnectionValidity) {
    socket.handshake.auth = { orgId, connectorType, connectorId };
    socket.join(orgId);
  } else {
    socket.disconnect(true);
  }
  socket.on("hello", (args) => {
    console.log(socket);

    socket
      .to(orgId)
      .emit("hello", { args, orgId, auth: socket.handshake.auth });
  });

  socket.on("update", (args) => {
    console.log(args);
    socket.to(orgId).emit("update", { args, orgId });
  });
});

server.listen(5000, async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://noticebee-cedp:krnl2021@krishibee.lyalt.mongodb.net/noticebee-cedp?retryWrites=true&w=majority"
    );
  } catch (error: any) {
    console.log(error.message);
  }
  console.log("running on port 5000");
});
