var path = require('path');
var api = require('./api');

var routes = function(app) {
  /**
   * Initializing routes
   */
  app.use('/', function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
  });

  app.use('/api', api());
};

module.exports = routes;
