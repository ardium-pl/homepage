import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const router = express.Router();
const serverRoot = path.resolve(__dirname, '..');
const angularAppPath = path.join(serverRoot, '../dist/homepage/browser');

const locales = fs.existsSync(angularAppPath) ? fs.readdirSync(angularAppPath) : [];

for (const locale of locales) {
  const localeAsPath = '/' + locale;
  const localeAsPathAsterisk = localeAsPath + '/*';
  router.use(localeAsPath, express.static(path.join(angularAppPath, locale)));
  router.use(localeAsPathAsterisk, express.static(path.join(angularAppPath, locale)));
}

router.use(express.static(angularAppPath));

router.get('/', (req, res) => {
  if (req.acceptsLanguages('en') && !req.acceptsLanguages('pl')) {
    return res.redirect('/en/');
  }

  res.sendFile(path.join(angularAppPath, 'index.html'));
});

router.get(['/*', '/:locale/*'], (req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).send();
  }

  if (req.path.startsWith('/en')) {
    return res.sendFile(path.join(angularAppPath, 'en', 'index.html'));
  }

  res.sendFile(path.join(angularAppPath, 'index.html'));
});

export default router;
