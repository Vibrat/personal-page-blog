// server.js
const express = require('express');
const app = express();
const port = process.env.PORT || 8088;

// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist/na-web'));
app.get('*', function (req, response) {
  response.sendFile( __dirname + '/dist/na-web/index.html');
});

// Start the app by listening on the default
// Heroku port
app.listen( port , () => {
  console.log('on getting request ', port);
});
