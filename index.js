// Import required modules
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();  // Loads environment variables from the .env file

const app = express();
const port = process.env.PORT || 5000;  // Use port from environment variables or default to 5000

// Middleware
app.use(cors());  // Enable CORS for all routes
app.use(express.json());  // Parse JSON bodies

// MongoDB connection URI from environment variables
// const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/';  // Default to local MongoDB if no env var is set



// var MongoClient = require('mongodb').MongoClient;

// var uri = "mongodb://coffeeMaster:wc18pv2VL0FIbnJj@cluster0-shard-00-00.ht3jo.mongodb.net:27017,cluster0-shard-00-01.ht3jo.mongodb.net:27017,cluster0-shard-00-02.ht3jo.mongodb.net:27017/?ssl=true&replicaSet=atlas-302waq-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";


var uri = "mongodb://coffeeMaster:wc18pv2VL0FIbnJj@cluster0-shard-00-00.ht3jo.mongodb.net:27017,cluster0-shard-00-01.ht3jo.mongodb.net:27017,cluster0-shard-00-02.ht3jo.mongodb.net:27017/?ssl=true&replicaSet=atlas-302waq-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";

MongoClient.connect(uri, function(err, client) {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
//   client.close();
});

// Connect to MongoDB
console.log('Attempting to connect to MongoDB...');
MongoClient.connect(uri, {}, (err, client) => {
    if (err) {
        console.error('Error connecting to MongoDB:', err.message);  // Log error message
        return;
    }

    console.log('Connected to local MongoDB');

    const db = client.db('coffee_shop');  // Use your local database name (e.g., 'coffee_shop')
    const collection = db.collection('devices');  // Define the collection (e.g., 'devices')

    // Perform a test query to ensure the collection is accessible
    collection.findOne({}, (err, result) => {
        if (err) {
            console.error('Error querying the collection:', err.message);
        } else {
            console.log('Query result:', result);  // Log the query result
        }

        // Close the connection after operations
        client.close();
    });
});

// Define a route to verify the server is running
app.get('/', (req, res) => {
    res.send('Coffee making server is running locally');
});

// Start the server
app.listen(port, () => {
    console.log(`Coffee Server is running on port: ${port}`);
});
