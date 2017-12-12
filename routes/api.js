var router = require('express').Router();

var passport = require('passport');
require('../config/passport')(passport);

var UserCtrl = require('../controllers/UserCtrl');
var BookCtrl = require('../controllers/BookCtrl');

var routes = function() {
  var requireAuth = passport.authenticate('jwt', {session: false});

  /**
   * User Routes
   */
  router.post('/signin', UserCtrl.signIn);
  router.post('/signup', UserCtrl.signUp);

  /**
   * Book Routes
   */
  router.get('/book', requireAuth, UserCtrl.requireRole(['ADMIN', 'CREATOR']), BookCtrl.get);
  router.post('/book', requireAuth, BookCtrl.create);

  return router;
};

module.exports = routes;