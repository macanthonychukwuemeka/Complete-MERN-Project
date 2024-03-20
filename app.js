import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routing/user-routes";
const app = express();
dotenv.config();
//middleware
app.use(express.json());
app.use("/user", userRouter);

//connections
mongoose
  .connect(
    `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.zpbrlcx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() =>
    app.listen(5000, () =>
      console.log("connection succesfull & Listening to Localhost Port 5000")
    )
  )
  .catch((err) => console.log(err));

// admin
