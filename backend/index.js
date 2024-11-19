import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/db.config.js";

import { postRoute, dalleRoute } from "./routes/index.js";

dotenv.config({
  path: "./.env",
});

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//api end points to connect from the frontend
app.use("/api/v1/post", postRoute);
app.use("/api/v1/dalle", dalleRoute);

//routes
// app.get("/", async (req, res) => {
//   res.send("Hello from DALL-E!");
// });

const startServer = async () => {
  try {
    await connectDB();
    app.listen(process.env.PORT || 3000, () => {
      console.log(
        `Server is running on the port ${process.env.PORT} or by default on port 3000`
      );
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();
