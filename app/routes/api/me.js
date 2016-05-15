var express = require('express');
var User = require('../../models/user');

var router = express.Router();

// on routes that end in /users/me
// ----------------------------------------------------
router.route('/')

  // get the user with that id
  .get(function(req, res) {
    User.find({
      username: req.decoded.username
    }, function(err, user) {
      if (err) res.send(err);

      // return that user
      res.json(user);
    });
  })

  // update the user with this id
  .put(function(req, res) {
    User.find({
      username: req.decoded.username
    }, function(err, user) {

      if (err) res.send(err);

      // set the new user information if it exists in the request
      if (req.body.name) user.name = req.body.name;
      if (req.body.username) user.username = req.body.username;
      if (req.body.password) user.password = req.body.password;

      // save the user
      user.save(function(err) {
        if (err) res.send(err);

        // return a message
        res.json({ message: 'User updated!' });
      });

    });
  })

  // delete the user and all associated transactions
  .delete(function(req, res) {
    User.remove({
      username: req.decoded.username
    }, function(err, user) {

      if (err) res.send(err);

      res.json({ message: 'Successfully deleted' });
    });
  });

module.exports = router;