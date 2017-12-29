const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const mongo_uri2 = 'mongodb://frenchje:hj-KL_90@frenchje-cluster-0-shard-00-00-7unv6.mongodb.net:27017,frenchje-cluster-0-shard-00-01-7unv6.mongodb.net:27017,frenchje-cluster-0-shard-00-02-7unv6.mongodb.net:27017/test?ssl=true&replicaSet=frenchje-cluster-0-shard-0&authSource=admin';
// Connect
const connection = (closure) => {
  return MongoClient.connect(mongo_uri2, (err, db) => {
    if (err) return console.log(err);

  closure(db);
});
};

// Error handling
const sendError = (err, res) => {
  response.status = 501;
  response.message = typeof err == 'object' ? err.message : err;
  res.status(501).json(response);
};

// Response handling
let response = {
  status: 200,
  data: [],
  message: null
};

// Get users
router.get('/users', (req, res) => {
  connection((db) => {
    var database = db.db('ski-tasks');
    database.collection('users')
    .find()
    .toArray()
    .then((users) => {
    response.data = users;
  res.json(response);
})
.catch((err) => {
    sendError(err, res);
});
});
});

// Get users
router.get('/tasks', (req, res) => {
  connection((db) => {
  var database = db.db('ski-tasks');
  database.collection('tasks')
    .find()
    .toArray()
    .then((tasks) => {
    response.data = tasks;
  res.json(response);
})
.catch((err) => {
    sendError(err, res);
});
});
});

// Get users
router.get('/users/:id', (req, res) => {
  _id = new ObjectID(req.params.id);
  connection((db) => {
  var database = db.db('ski-tasks');
  database.collection('tasks')
    .find(_id)
    .then((user) => {
    response.data = user;
  res.json(response);
})
.catch((err) => {
    sendError(err, res);
});
});
});

module.exports = router;
