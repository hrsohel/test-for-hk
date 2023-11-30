import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGO_URL1)
  .then(() => console.log("Database connected"))
  .catch((err) => console.error(err.message));
