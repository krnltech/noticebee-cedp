import express from "express";
import cors from "cors";
import adminRoute from "./routes/admin.route";
import mongoose from "mongoose";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/admin", adminRoute);

mongoose.connection.on("error", (err) => {
  console.log(err.message);
});

app.listen(5000, async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://noticebee-cedp:krnl2021@krishibee.lyalt.mongodb.net/noticebee-cedp?retryWrites=true&w=majority"
    );
  } catch (error: any) {
    console.log(error.message);
  }
  console.log("running on port 5000");
});
