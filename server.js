import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Obține calea directorului curent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Servește fișierele statice din folderul build
app.use(express.static(path.join(__dirname, 'build')));

// Oricare altă cerere va returna index.html din build
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serverul rulează pe portul ${port}`);
});
