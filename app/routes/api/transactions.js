var User = require('../../models/user');
var express = require('express');

var router = express.Router();

// on routes that end in /transactions
// ----------------------------------------------------
router.route('/')
  // get all the transactions
  .get(function(req, res) {

    User.findOne({ username: req.decoded.username }, 'transactions', function(err, user) {
      if (err) {
        res.send(err);
        console.log(err);
      }

      if (user) {
        res.json(user.transactions);
      } else {
        res.json({error: 'Could not retrieve transactions.'});
      }

      // return the users
      
    });
  })

  // create a transaction
  .post(function(req, res) {
    
    var transaction = {};

    transaction.name        = req.body.name;
    transaction.description = req.body.description; 
    
    // if there is a date selected, put it in
    if(req.body.date) transaction.date = req.body.date;

    // put the username of the logged user
    transaction.username = req.decoded.username;
    
    transaction.isExpense = req.body.isExpense;
    transaction.amount    = req.body.amount;
    transaction.currency  = req.body.currency;
    transaction.tags      = req.body.tags;

    User.findOne({ username: req.decoded.username }, 'transactions', function(err, user) {
      if (err) {
        res.send(err);
        console.log(err);
      }

      user.transactions.push(transaction);

      user.save(function(err) {
        if (err) {
          console.log(err);
          return res.send(err);
        }

        // return a message
        res.json({ message: 'Transaction created!' });
      });
    });

    

  });

// on routes that end in /transactions/:transaction_id
// ----------------------------------------------------
router.route('/:tran_id')

    // get the transaction with that id
    .get(function(req, res) {
      User.findOne({ username: req.decoded.username }, 'transactions', function(err, user) {
        if (err) res.send(err);

        var tran = user.transactions.id(req.params.tran_id);

        // return that transaction
        if(tran) res.json(tran);
        else res.json({ message: 'No transaction with parameter id.' });
      });
    })

    // update the transaction with this id
    .put(function(req, res) {
      User.findOne({ username: req.decoded.username }, 'transactions', function(err, user) {

        var tran = user.transactions.id(req.params.tran_id);
        if (err) res.send(err);

        // set the new information for the transaction if it exists in req
        if(req.body.name)        tran.name        = req.body.name;
        if(req.body.description) tran.description = req.body.description;
        if(req.body.date)        tran.date        = req.body.date;
        if(req.body.amount)      tran.amount      = req.body.amount;
        if(req.body.isExpense)   tran.isExpense   = req.body.isExpense;
        if(req.body.amount)      tran.amount      = req.body.amount;
        if(req.body.currency)    tran.currency    = req.body.currency;
        if(req.body.tags)        tran.tags        = req.body.tags;

        // save the transaction
        user.save(function(err) {
          if (err) res.send(err);

          // return a message
          res.json({ message: 'transaction updated!' });
        });

      });
    })

    // delete the transaction with this id
    .delete(function(req, res) {
      User.findOne({ username: req.decoded.username }, 'transactions', function(err, user) {
        if (err) res.send(err);

        var tran = user.transactions.id(req.params.tran_id);

        if (tran) {

          // borrar y guardar usuario
          tran.remove();

          user.save(function(err) {
            if (err) res.send(err);

            res.json({ message: 'Successfully deleted' });
          });
        }
        else res.json({ message: 'No transaction with parameter id.' });
      });
    });

module.exports = router;