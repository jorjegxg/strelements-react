import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Obține calea directorului curent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Servește fișierele statice din folderul dist
app.use(express.static(path.join(__dirname, 'dist')));

// Oricare altă cerere va returna index.html din dist
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serverul rulează pe portul ${port}`);
});
