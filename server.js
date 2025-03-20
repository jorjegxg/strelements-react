const express = require('express');
const path = require('path');

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
