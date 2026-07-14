import express from "express";
import { createServer } from "node:http";

import { Server } from "socket.io";

import mongoose from "mongoose";
import { connectToSocket } from "./src/controllers/socketManager.js";

import cors from "cors";
import userRoutes from "./src/routes/usersRoutes.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", process.env.PORT || 5000);
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb",  extended: true
 }));

app.use("/api/users", userRoutes);


const startServer = async () => {
  try {
    const connectionDb = await mongoose.connect(
      "mongodb+srv://priyanshubijalwan071_db_user:456583771150@zoom-project.zmclfvh.mongodb.net/?appName=Zoom-project",
    );

    console.log(`Mongo Connected DB Host : ${connectionDb.connection.host}`);

    server.listen(app.get("port"), () => {
      console.log("Server running on port 5000");
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();
