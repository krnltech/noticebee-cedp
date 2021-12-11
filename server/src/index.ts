import express from "express";
import cors from "cors";
import adminRoute from "./routes/admin.route";
import assetRoute from "./routes/asset.route";
import boardRoute from "./routes/board.route";
import { createServer } from "http";
import { Server } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import { createClient } from "redis";
import OrganizationModel from "./models/organization.model";
import AdminModel from "./models/admin.model";
import BoardModel from "./models/board.model";
import jwt from "jwt-decode";
import connectMongoose from "./utils/mongoose.connection";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/admin", adminRoute);
app.use("/api/asset", assetRoute);
app.use("/api/board", boardRoute);

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

server.listen(PORT || 5000, async () => {
  try {
    connectMongoose();
    io.on("connection", async (socket) => {
      const token: string = socket.handshake.query.token as string;
      if (token) {
        type TokenType = { boardId: string; orgId?: string; adminId?: string };

        try {
          const decoded: TokenType = await jwt(token);
          console.log(decoded);
          if (decoded.orgId) {
            // socket.join(decoded.orgId);
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
              console.log(args);
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
    });
  } catch (error: any) {
    console.log(error.message);
  }
  console.log("running on port " + PORT || 5000);
});
