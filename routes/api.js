var router = require('express').Router();
var auth = require('../helpers/auth');

var UserCtrl = require('../controllers/UserCtrl');
var BookCtrl = require('../controllers/BookCtrl');

var routes = function() {
  /**
   * User Routes
   */
  router.post('/signin', UserCtrl.signIn);
  router.post('/signup', UserCtrl.signUp);

  /**
   * Book Routes
   */
  router.get('/book', auth.setPrivateRoute(), BookCtrl.get);
  router.post('/book', auth.setPrivateRoute(), BookCtrl.create);

  return router;
};

module.exports = routes;