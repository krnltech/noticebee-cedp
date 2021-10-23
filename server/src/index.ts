import express from "express";
import cors from "cors";
import adminRoute from "./routes/admin.route";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/admin", adminRoute);

app.listen(5000, () => console.log("running on port 5000"));
