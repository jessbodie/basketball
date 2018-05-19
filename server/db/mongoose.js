const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI);

module.exports = {
    mongoose: mongoose
};


// const MongoClient = require('mongodb').MongoClient;

// MongoClient.connect('mongodb://localhost:27017/Basketball', (err, client) => {
//     if (err) {
//         return console.log('Unable to connect to MongoDB server.');
//     }
//     console.log('Connected to MongoDB server.');

//     client.close();
// });
