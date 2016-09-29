var express = require('express');
var query   = require('pg-query');
var bcrypt  = require('bcrypt-nodejs');

var router = express.Router();

// on routes that end in /users/me
// ----------------------------------------------------
router.route('/')

  // add an email to the newsletter
  .post(function(req, res) {

    var sql = 'insert into newsletter (email, date_added) values ($1, $2)';
    
    query.first(sql, [req.body.email, new Date()], function(err, rows) {
      if (err) return res.send(err);

      // return that user
      return res.json({ message: 'Sent! You will be notified! :)' });
    });
  })

module.exports = router;