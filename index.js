const express = require('express');
const https = require('https');
const fs = require('fs');

const app = express();

const options = {
  key: fs.readFileSync('httpsNode/private-key.pem'),
  cert: fs.readFileSync('httpsNode/certificate.pem')
};

// Gestisci errori durante la lettura delle chiavi e dei certificati
try {
  options.key = fs.readFileSync('httpsNode/private-key.pem');
  options.cert = fs.readFileSync('httpsNode/certificate.pem');
} catch (error) {
  console.error('Errore durante la lettura delle chiavi o dei certificati:', error);
  process.exit(1);
}

app.get('/', (req, res) => {
  res.sendFile('index.php', { root: __dirname });
});

app.get('/contatti', (req, res) => {
  res.sendFile('index.php/#contact', { root: __dirname });
});



// Gestisci errori durante la creazione del server HTTPS
const server = https.createServer(options, app);

server.on('error', (error) => {
  console.error('Errore durante la creazione del server HTTPS:', error);
  process.exit(1);
});

server.listen(443, 'amatores.com', () => {
  console.log('Server is running on https://amatores.com');
});

