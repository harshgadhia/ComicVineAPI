var config = require('../config');
var superagent = require('superagent');

module.exports = function (app) {
  
  app.get('/characters/search', function(req, res) {
    superagent
      .get(config.api.base + '/characters')
      .query({'filter' : 'name:'+req.query.title})
      .query({api_key : config.api.key})
      .query({format : config.api.format})
      .end(function(err, result) {
        //console.log(result.body.results[0].image);
        res.json(result.body.results[0]);
      });
  });
};