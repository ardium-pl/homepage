import bodyParser from "body-parser";
import chalk from "chalk";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import clientRouter from "./client.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.use(clientRouter);

console.log("[Server] Starting up...");

app.listen(port, () => {
  console.log(
    "[Server] Server is running on port " + chalk.green.underline(port) + ".",
  );
});

export default app;
