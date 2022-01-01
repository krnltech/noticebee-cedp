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

const activeBoards: string[] = [];

server.listen(PORT || 5000, async () => {
  try {
    connectMongoose();
    io.on("connection", async (socket) => {
      const token: string = socket.handshake.query.token as string;
      type TokenType = { boardId: string; orgid?: string; adminId?: string };
      let decoded: TokenType = await jwt(token);
      let board: any;
      if (token) {
        if (decoded.boardId) {
          activeBoards.push(decoded.boardId);
        }
        if (decoded.orgid) {
          socket.join(decoded.orgid);
          board = await BoardModel.findOne({
            _id: decoded.boardId,
          })
            .populate({
              path: "rooms",
              select: "-__v -organization -admin",
              populate: { path: "assets", select: "-__v" },
            })
            .select("-__v");
          // console.log(board);
        }
      } else {
        socket.disconnect(true);
      }
      socket.on("update", (args) => {
        console.log("updated", decoded?.orgid);
        socket.broadcast
          .to(decoded?.orgid as string)
          .emit("updateBoard", { board: board._id });
      });
      socket.on("screenshot", (args) => {});
      socket.on("contentLoaded", (args) => {});
      socket.on("activeBoards", () => {
        console.log(activeBoards);
        io.emit("allActiveBoards", activeBoards);
      });
    });
  } catch (error: any) {
    console.log(error.message);
  }
  console.log("running on port " + PORT || 5000);
});
