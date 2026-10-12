import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const router = express.Router();
const serverRoot = path.resolve(__dirname, '..');
const candidateAngularAppPaths = [
  path.join(serverRoot, '../dist/homepage/browser'),
  path.join(serverRoot, '../../dist/homepage/browser'),
  path.join(__dirname, '../dist/homepage/browser'),
  path.join(__dirname, '../../dist/homepage/browser'),
  path.join(serverRoot, '../client/dist/browser'),
  path.join(serverRoot, '../../client/dist/browser'),
  path.join('/app', 'dist', 'homepage', 'browser'),
  path.join('/app', 'client', 'dist', 'browser')
];

const angularAppPath = candidateAngularAppPaths.find((candidate) => fs.existsSync(candidate)) ?? candidateAngularAppPaths[0];

if (!fs.existsSync(path.join(angularAppPath, 'index.html'))) {
  console.warn(`[Server] Angular app build not found. Checked: ${candidateAngularAppPaths.join(', ')}`);
}

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
