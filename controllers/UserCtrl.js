var jwt = require('jsonwebtoken');
var User = require('../models/User');
var config = require('../config/database');

var UserCtrl = {};

UserCtrl.signIn = function(req, res) {
  var TOKEN_EXPIRATION = 3600;

  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
    } else {
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          var token = jwt.sign(user.toJSON(), config.secret, {
            expiresIn: TOKEN_EXPIRATION
          });

          res.json({ success: true, token: 'JWT ' + token });
        } else {
          res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
        }
      });
    }
  });
};

UserCtrl.signUp = function(req, res) {
  if (!req.body.username || !req.body.password || !req.body.email) {
    res.json({ success: false, msg: 'The username, password and email fields are required.' });
  } else {
    var newUser = new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    });

    newUser.save(function(err) {
      if (err) {
        return res.json({ success: false, msg: 'Username or email already exists.' });
      }

      res.json({ success: true, msg: 'Successful created new user.' });
    });
  }
};

UserCtrl.requireRole = function(roles) {
  return function(req, res, next) {
    User.findById(req.user._id, function(err, user){
      if (err) {
        res.status(404).json({ error: 'No user found.' });

        return next(err);
      }

      if (roles.indexOf(user.role) > -1)
        return next();

      res.status(401).json({ error: 'You are not authorized to view this content.' });

      return next('Unauthorized');
    });
  }
};

module.exports = UserCtrl;