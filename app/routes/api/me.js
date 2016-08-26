var express = require('express');
var query   = require('pg-query');
var bcrypt  = require('bcrypt-nodejs');

var router = express.Router();

// on routes that end in /users/me
// ----------------------------------------------------
router.route('/')

  // get the user with that id
  .get(function(req, res) {

    var sql = 'SELECT name, username FROM users WHERE username = $1';
    
    query.first(sql, req.decoded.username, function(err, rows) {
      if (err) res.send(err);

      // return that user
      res.json(rows);
    });
  })

  // update the user with this id
  .put(function(req, res) {

    var sqlSel = 'SELECT * FROM users WHERE username = $1';
    
    query.first(sqlSel, req.decoded.username, function(err, rows) {
      if (err) res.send(err);

      var user = {
        name:     req.body.name || rows.name,
        username: rows.username,
        password: rows.password
      };

      // if a password is in the req, hash it and replace it
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password);
      }

      var sqlUpd = 'UPDATE users ' +
                   'SET username = $1, name = $2, password = $3 ' +
                   'WHERE username = $1';

      query(sqlUpd, [user.username, user.name, user.password], function(err, rows) {
        if (err) res.send(err);

        // return success
        res.json({ message: 'Successfully updated!' });
      });
    });
  })

  // delete the user and all associated transactions
  .delete(function(req, res) {
    var sql = 'DELETE FROM users WHERE username = $1';

    query(sql, req.decoded.username, function(err, rows) {
      if (err) res.send(err);

      // return that user
      res.json({ message: 'Successfully deleted' });
    });
  });

module.exports = router;