require('./config/config');

const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');

app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());
app.use(require('./routes/routes'));


// TO DO WORKS WITH WEBPACK 4 MOVED TO ROUTES
// app.get('/', function(request, response) {
//     response.sendFile(__dirname + '/dist/index.html');
//   });

app.listen(PORT, error => (
error
    ? console.error(error)
    : console.info(`Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`)
));
