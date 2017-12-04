var api = require('./api');

var routes = function(app) {
  // Register the index page route
  app.get('/', function(req, res) {
    res.render('index', { title: 'Express '});
  });

  // Register the API routes
  app.use('/api', api());
};

module.exports = routes;
