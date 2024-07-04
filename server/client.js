import path from "path";
import express from "express";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const router = express.Router();

const angularAppPath = path.join(__dirname, "../dist/homepage/browser");

// Serve static files for the root URL
router.use("/", express.static(angularAppPath));
// Serve static files for any other URL
router.use("*", express.static(angularAppPath));

export default router;
