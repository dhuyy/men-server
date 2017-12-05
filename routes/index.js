var api = require('./api');

var routes = function(app) {
  /**
   * Initializing routes
   */
  app.use('/api', api());
};

module.exports = routes;
