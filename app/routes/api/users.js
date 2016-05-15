var jwt  = require('jsonwebtoken');
var User = require('../../models/user');
var config = require('../../../config');
var express = require('express');

// super secret for creating tokens
var superSecret = config.secret;

var router = express.Router();

// create a user (accessed at POST http://localhost:8080/users)
// ----------------------------------------------------
router.post('/', function(req, res) {
  
  var user = new User();    // create a new instance of the User model
  user.name = req.body.name;  // set the users name (comes from the request)
  user.username = req.body.username;  // set the users username (comes from the request)
  user.password = req.body.password;  // set the users password (comes from the request)

  user.save(function(err) {
    if (err) {
      // duplicate entry
      if (err.code == 11000) 
        return res.json({ success: false, message: 'A user with that username already exists. '});
      else 
        return res.send(err);
    }

    // return a message
    res.json({ message: 'User created!' });
  });
});

// route to authenticate a user (POST http://localhost:8080/api/auth)
// ----------------------------------------------------
router.post('/auth', function(req, res) {

  // find the user
  User.findOne({
    username: req.body.username
  }).select('name username password').exec(function(err, user) {

    if (err) throw err;

    // no user with that username was found
    if (!user) {
      res.json({ 
        success: false, 
        message: 'Authentication failed. User not found.' 
      });
    } else if (user) {

      // check if password matches
      var validPassword = user.comparePassword(req.body.password);
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