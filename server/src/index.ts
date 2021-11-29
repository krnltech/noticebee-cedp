import express from "express";
import cors from "cors";
import adminRoute from "./routes/admin.route";
import assetRoute from "./routes/asset.route";
import boardRoute from "./routes/board.route";
import mongoose from "mongoose";
import { createServer } from "http";
import { Server } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import { createClient } from "redis";
import OrganizationModel from "./models/organization.model";
import AdminModel from "./models/admin.model";
import BoardModel from "./models/board.model";
import jwt from "jwt-decode";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/admin", adminRoute);
app.use("/api/asset", assetRoute);
app.use("/api/board", boardRoute);

mongoose.connection.on("error", (err) => {
  console.log(err.message);
});

const server = createServer(app);

const { PORT, REDIS_HOST, REDIS_PORT } = process.env;

const io = new Server(server, { transports: ["websocket"] });
const pubClient = createClient({
  host: REDIS_HOST || "localhost",
  port: Number(REDIS_PORT) || 6379,
});
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
// const nbn = io;
// io.on("connection", async (socket) => {
// console.log(socket.handshake.auth.identity || "");
// const orgId = socket.handshake.auth.org || "nodOrgId";
// const connectorType = socket.handshake.auth.identity.type || "nobody";
// const connectorId = socket.handshake.auth.identity.id || "noId";
// const checkConnectionValidity = await checkForOrganization(
//   orgId,
//   connectorType,
//   connectorId
// );
// if (checkConnectionValidity) {
//   socket.join(orgId);
// } else {
//   socket.disconnect(true);
// }
// socket.on("hello", (args) => {
//   // console.log(socket);

//   socket
//     .to(orgId)
//     .emit("hello", { args, orgId, auth: socket.handshake.auth });
// });

// socket.on("update", (args) => {
//   console.log(args);
//   socket.to(orgId).emit("update", { args, orgId });
// });
// });

server.listen(PORT || 5000, async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://noticebee-cedp:krnl2021@krishibee.lyalt.mongodb.net/noticebee-cedp?retryWrites=true&w=majority"
    );
    io.on("connection", async (socket) => {
      console.log(socket.handshake.auth);
      const token: string | null = socket.handshake.auth.token;
      if (token) {
        type a = { boardId: string; orgId?: string; adminId?: string };

        try {
          const decoded: a = await jwt(token);
          console.log(decoded);
          if (decoded.orgId) {
            socket.join(decoded.orgId);
            const board = await BoardModel.findOne({
              _id: decoded.boardId,
            })
              .populate({
                path: "rooms",
                select: "-__v -organization -admin",
                populate: { path: "assets", select: "-__v" },
              })
              .select("-__v");
            // console.log(board);
            socket.on("update", (args) => {
              // console.log(args);
              if (decoded.orgId) {
                socket.to(decoded?.orgId).emit("updateBoard", { args, board });
              }
            });
          }
        } catch (error) {
          socket.disconnect(true);
        }
      } else {
        socket.disconnect(true);
      }

      // const orgId = socket.handshake.auth.org || "nodOrgId";
      // const connectorType = socket.handshake.auth.identity.type || "nobody";
      // const connectorId = socket.handshake.auth.identity.id || "noId";
      // const checkConnectionValidity = await checkForOrganization(
      //   orgId,
      //   connectorType,
      //   connectorId
      // );
      // if (checkConnectionValidity) {
      //   socket.join(orgId);
      //   socket.on("hello", (args) => {
      //     // console.log(socket);

      //     socket
      //       .to(orgId)
      //       .emit("hello", { args, orgId, auth: socket.handshake.auth });
      //   });

      //   socket.on("update", (args) => {
      //     // console.log(args);
      //     socket.to(orgId).emit("update", { args, orgId });
      //   });
      // } else {
      //   socket.disconnect(true);
      // }
    });
  } catch (error: any) {
    console.log(error.message);
  }
  console.log("running on port " + PORT || 5000);
});
