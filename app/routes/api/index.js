var jwt         = require('jsonwebtoken');
var config      = require('../../../config');
var express     = require('express');

// super secret for creating tokens
var superSecret = config.secret;

var apiRouter = express.Router();

apiRouter.use('/newsletter', require('./newsletter'));
apiRouter.use('/users', require('./users'));

// route middleware to verify a token
var middleware = function(req, res, next) {
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
};

// test route to make sure everything is working 
apiRouter.get('/', middleware, function(req, res) {
  res.json({
    message: 'You are authenticated and can access the API.',
    name: req.decoded.name,
    username: req.decoded.username
  }); 
});

apiRouter.use('/me', middleware, require('./me'));
apiRouter.use('/transactions', middleware, require('./transactions'));

module.exports = apiRouter;
