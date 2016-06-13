var express = require('express');
var qs      = require('querystring');
var router  = express.Router();

module.exports = function(app) {
  const config = app.get('config');
  const annict = app.get('middlewares').annict;
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
      return res.json({});
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
        return res.json({});
      }

      annict.Me.Work.get({
        access_token  : token,
        filter_status : 'watching',
        per_page      : 10
      })
      .then(response => {
        User.create({
          access_token : token,
          watching     : response.works,
          updated_at   : new Date()
        },
        (err, user) => {
          if(err) {
            return res.json({ err: 'failed to save token' });
          }
          return res.redirect(`/get_widget_code?id=${user._id}`);
        });
      });
    });
  });

  router.get('/get_widget_code', (req, res) => {
    if(!req.query.id) {
      return res.redirect('/');
    }

    const BASE_URL = `${req.protocol}://${req.get('Host')}`;

    return res.render('get-widget-code', {
      BASE_URL,
      dataId: req.query.id,
    });
  });

  router.get('/watching/:id', (req, res) => {
    var User = req.app.get('models').User;
    User.findById(req.params.id, (err, user) => {
      if(err) {
        return res.status(500).json({});
      };

      if(!user) {
        return res.status(404).json({ works: [] });
      }
      return res.json({works: user.watching});
    });
  });

  return router;
}
