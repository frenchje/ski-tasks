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
  //console.log(req);
  let objectId = req.params.id;
  connection((db) => {
  var database = db.db('ski-tasks');
  database.collection('users')
    .findOne({_id:objectId})
    .then((user) => {
    response.data = user;
  res.json(response);
})
.catch((err) => {
    sendError(err, res);
});
});
});

//Save user
router.post('/users/:id',(req, res) => {

  if(req.body.id !== undefined && req.body.id !== null) {
    let objectId = req.params.id;
    req.body.id = objectId;
  }

  connection((db) => {
    var database = db.db('ski-tasks');
    database.collection('users')
      .save(req.body).then((user) => {
        console.log("Save Response: ", req.body);
        let newObjectId = req.body.id;
      database.collection('users').findOne({id:newObjectId})
        .then((user) => {
          response.data = user;
          res.json(response);
        })
        .catch((err) => {
          sendError(err, res);
        });
    })
      .catch ((err) => {
        sendError(err, res);
      });
    });
});

//Create User
router.post('/users/',(req, res) => {

  //Assign new id value from the counters.
    let objectId = getNextSequenceValue("userId");
    req.body._id = objectId;

  connection((db) => {
    var database = db.db('ski-tasks');
    database.collection('users')
      .insert(req.body).then((user) => {
      console.log("Save Response: ", req.body);
      let newObjectId = req.body._id;
      database.collection('users').findOne({_id:newObjectId})
        .then((user) => {
          response.data = user;
          res.json(response);
        })
        .catch((err) => {
          sendError(err, res);
        });
    })
      .catch ((err) => {
        sendError(err, res);
      });
  });
});

//Create User
router.post('/authenticate',(req, res) => {

  console.log("Authenticate: user--",req.body.username," : ",req.body.password);

  if(req.body.username !== undefined && req.body.username !== null && req.body.password !== undefined && req.body.password !== null) {

    connection((db) => {
      var database = db.db('ski-tasks');
      database.collection('users')
        .findOne({username: {$eq:req.body.username}, password: {$eq:req.body.password}}).then((user) => {
        console.log("Save Response: ", req.body, " -- User: ", user);
        response.data = user;
        res.json(response);
      })
        .catch((err) => {
          sendError(err, res);
        });
    });
  }
});

router.delete('/users/:id',(req, res) => {
  let objectId = req.params.id;

  connection((db) => {
    var database = db.db('ski-tasks');
    database.collection('users').remove({id:objectId}).then((success) => {
      res.json(success);
    })
      .catch ((err) => {
        sendError(err, res);
      });
  });

  });

//Method for updating counter
function getNextSequenceValue(sequenceName) {
  connection((db) => {
    var sequenceDocument = db.db('ski-tasks').collection('counters').findAndModify({
      query: {_id: sequenceName},
      update: {$inc: {sequence_value: 1}},
      new: true
    });

    console.log("Get Sequence: ",sequenceName,"--",sequenceDocument);
    return sequenceDocument.sequence_value;
  });
}

module.exports = router;
