var express = require('express');
var qs      = require('querystring');
var router  = express.Router();

module.exports = function(app) {
  const config = app.get('config');
  const annict = new Annict();
  const User   = app.get('models').User;

  var query = qs.stringify({
    client_id     : config.ANNICT_CLIENT_ID,
    response_type : 'code',
    redirect_uri  : config.ANNICT_REDIRECT_URI,
    scope         : 'read'
  });

  router.get('/', (req, res) => {
    res.render('index');
  });

  router.get('/auth', (req, res) => {
    res.redirect(`https://api.annict.com/oauth/authorize\?${query}`);
  });

  router.get('/auth/callback', (req, res) => {
    const code = req.query.code;

    if(!code) {
      res.json({});
    }

    annict.OAuth.token(
      config.ANNICT_CLIENT_ID,
      config.ANNICT_CLIENT_SECRET,
      'authorization_code',
      config.ANNICT_REDIRECT_URI,
      code
    )
    .then(body => {
      const token = body.access_token;

      if(!token) {
        res.json({});
      }

      User.create({
        access_token : token,
        watching     : [],
        updated_at   : new Date()
      },
      (err, user) => {
        if(err) {
          res.json({ err: 'failed to save token' });
        }
        res.redirect(`/get_widget_code?id=${user._id}`);
      });
    });
  });

  router.get('/get_widget_code', (req, res) => {
    if(!req.params.id) {
      res.redirect('/');
    }

    res.render('get-widget-code', {
      dataId: req.params.id,
    });
  });

  router.get('/watching/:id', (req, res) => {
    var User = req.app.get('models').User;
    User.findById(req.params.id, (err, user) => {
      if(err) {
        console.log(err);
        res.json({});
      };

      if(!user) {
        res.json({ works: [] });
      }
      res.json({works: user.watching});
    });
    console.log('test');
  });

  module.exports = router;
}
