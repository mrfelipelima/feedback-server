import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";

import { routes } from "./routes";

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log("Server started");
});
