var jwt     = require('jsonwebtoken');
var bcrypt  = require('bcrypt-nodejs');
var query   = require('pg-query');
var config  = require('../../../config');
var express = require('express');

// super secret for creating tokens
var superSecret = config.secret;

var router = express.Router();

// create a user (accessed at POST http://localhost:8080/users)
// ----------------------------------------------------
router.post('/', function(req, res) {
  
  var user = {   
    name: req.body.name,
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password)
  };

  var sql = 'insert into users (username, name, password) values ($1,$2,$3)';

  query(sql, [user.username, user.name, user.password], function(err, rows) {
    if (err) return res.send(err);

    // return a message
    res.json({ message: 'User created!' });
  });
});

// route to authenticate a user (POST http://localhost:8080/api/auth)
// ----------------------------------------------------
router.post('/auth', function(req, res) {

  var sql = 'SELECT * FROM users WHERE username = $1';
    
  query.first(sql, req.body.username, function(err, user) {
    if (err) res.send(err);

    if (!user) {
      res.json({ 
        success: false, 
        message: 'Authentication failed. User not found.' 
      });
    } else if (user) {

      // check if password matches
      var validPassword = bcrypt.compareSync(req.body.password, user.password);

      if (!validPassword) {
        res.json({ 
          success: false, 
          message: 'Authentication failed. Wrong password.' 
        });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign({
          name: user.name,
          username: user.username
        }, superSecret, {
          expiresIn: "2 days" // expires in 2 days
                              // this is using a rauchg/ms time span
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }   
    }
  });
});

module.exports = router;