var bodyParser  = require('body-parser'); 	// get body-parser
var User        = require('../models/user');
// var Transaction = require('../models/transaction');
var jwt         = require('jsonwebtoken');
var config      = require('../../config');

// super secret for creating tokens
var superSecret = config.secret;

module.exports = function(app, express) {

	var apiRouter = express.Router();

  // create a user (accessed at POST http://localhost:8080/users)
  // ----------------------------------------------------
  apiRouter.route('/users').post(function(req, res) {
    
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
	apiRouter.post('/auth', function(req, res) {

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

	// route middleware to verify a token
	apiRouter.use(function(req, res, next) {
		// do logging
		console.log('Somebody just came to our app!');

	  // check header or url parameters or post parameters for token
	  var token = req.body.token || req.query.token || req.headers['x-access-token'];

	  // decode token
	  if (token) {

	    // verifies secret and checks exp
	    jwt.verify(token, superSecret, function(err, decoded) {      

	      if (err) {
	        res.status(403).send({ 
	        	success: false, 
	        	message: 'Failed to authenticate token.' 
	    	  });  	   
	      } else { 
	        // if everything is good, save to request for use in other routes
	        req.decoded = decoded;
	            
	        next(); // make sure we go to the next routes and don't stop here
	      }
	    });

	  } else {

	    // if there is no token
	    // return an HTTP response of 403 (access forbidden) and an error message
   	 	res.status(403).send({ 
   	 		success: false, 
   	 		message: 'No token provided.' 
   	 	});
	    
	  }
	});

	// test route to make sure everything is working 
	// ----------------------------------------------------
	apiRouter.get('/', function(req, res) {
		res.json({
      message: 'You are authenticated and can access the API.',
      name: req.decoded.name,
      username: req.decoded.username
    });	
	});

	// on routes that end in /users/me
	// ----------------------------------------------------
	apiRouter.route('/users/me')

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

  // on routes that end in /transactions
  // ----------------------------------------------------
  apiRouter.route('/transactions')
    // get all the transactions
    .get(function(req, res) {

      User.findOne({ username: req.decoded.username }, 'transactions', function(err, user) {
        if (err) {
          res.send(err);
          console.log(err);
        }

        // return the users
        res.json(user.transactions);
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
  apiRouter.route('/transactions/:transaction_id')

    // get the transaction with that id
    .get(function(req, res) {
      User.findOne({ username: req.decoded.username }, 'transactions', function(err, user) {
        if (err) res.send(err);

        var tran = user.transactions.id(req.params.transaction_id);

        // return that transaction
        if(tran) res.json(tran);
        else res.json({ message: 'No transaction with parameter id.' });
      });
    })

    // update the transaction with this id
    .put(function(req, res) {
      User.findOne({ username: req.decoded.username }, 'transactions', function(err, user) {

        var tran = user.transactions.id(req.params.transaction_id);
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

        var tran = user.transactions.id(req.params.transaction_id);

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

	return apiRouter;
};