var passport = require('passport');
require('../config/passport')(passport);

var Auth = {};

Auth.setPrivateRoute = function() {
  return passport.authenticate('jwt', { session: false });
};

module.exports = Auth;