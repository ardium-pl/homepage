import express from "express";
import fs from 'fs';
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const router = express.Router();

const angularAppPath = path.join(__dirname, "../dist/homepage/browser");

const locales = fs.readdirSync(angularAppPath);

for (const locale of locales) {
  const localeAsPath = '/' + locale;
  const localeAsPathAsterisk = localeAsPath + '/*'
  router.use(localeAsPath, express.static(angularAppPath + localeAsPath));
  router.use(localeAsPathAsterisk, express.static(angularAppPath + localeAsPath));
}

router.get('/', (req, res) => {
  if (req.acceptsLanguages('pl')) return res.redirect('/pl/');

res.redirect('/en/');
})

export default router;