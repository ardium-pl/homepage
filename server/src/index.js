import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import chalk from 'chalk';
import clientRouter from './client.js'; // Import the router from client.js

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// Use the client router to serve static files
app.use(clientRouter);

console.log('[Server] Starting up...');

app.listen(port, () => {
  console.log('[Server] Server is running on port ' + chalk.green.underline(port) + '.');
});

export default app;
