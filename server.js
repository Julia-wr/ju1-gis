
const http = require('http');

const hostname = '127.0.0.1'; // localhost
const port = 3000;

// MongoDB Modul in Node.js Code verwenden
const mongodb = require('mongodb');

// MongoDB URL und Client für Zugriff anlegen
const mongoUrl = 'mongodb://127.0.0.1:27017'; // für lokale MongoDB
const mongoClient = new mongodb.MongoClient(mongoUrl);

async function startServer() {
  await mongoClient.connect(); // Verbindung zur Datenbank herstellen
  server.listen(port, hostname, () => { // Server starten
    console.log(`Server running at http://${hostname}:${port}/`);
  });
}

const server = http.createServer(async(request, response) => {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/plain');
  response.setHeader('Access-Control-Allow-Origin', '*'); // bei CORS Fehler 
  /*response.setHeader("Access-Control-Allow-Methods", "*"); // Erlaubt alle HTTP-Methoden */
  response.setHeader("Access-Control-Allow-Headers", "*"); // Erlaubt das Empfangen von Requests mit Headern, z. B. Content-Type
 
  const db = mongoClient.db("SlotMachine");
  const highscoreCollection = db.collection("highscore");

  let url = new URL(request.url || '', `http://${request.headers.host}`);
  switch (url.pathname) {
    case '/highscore': {
      const highscoreCollection = mongoClient.db('SlotMachine').collection('highscore');
      switch (request.method) {
        case 'GET':
          let result;
          result = await highscoreCollection.find({}).toArray();
          response.setHeader('Content-Type', 'application/json');
          response.write(JSON.stringify(result));
          break;
          
        case 'POST':
          let jsonString = '';
          request.on('data', data => {
            jsonString += data;
          });
          request.on('end', async () => {
            highscoreCollection.insertOne(JSON.parse(jsonString));
          });
          break;
      }
      break;
    }
    case '/clearAll':
      await mongoClient.db('SlotMachine').collection('highscore').drop();
      break;
    default:
      response.statusCode = 404;
  }
  response.end();
}
);

startServer();



