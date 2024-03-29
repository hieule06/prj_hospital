import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
import cors from "cors";
require("dotenv").config();

let app = express();

app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extends: true }));

viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 1080;

app.listen(port, () => {
  console.log("Backend NodeJS is running on port: " + port);
});
