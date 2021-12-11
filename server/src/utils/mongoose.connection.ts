import mongoose from "mongoose";

const connectMongoose = async () => {
  await mongoose.connect(
    "mongodb+srv://noticebee-cedp:krnl2021@krishibee.lyalt.mongodb.net/noticebee-cedp?retryWrites=true&w=majority"
  );
  mongoose.connection.on("error", (err) => {
    console.log(err.message);
  });
};

export default connectMongoose;
