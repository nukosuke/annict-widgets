var express = require('express');
var qs      = require('querystring');
var router  = express.Router();

var Annict  = require('annict').default;

var CLIENT_ID     = process.env.CLIENT_ID;
var CLIENT_SECRET = process.env.CLIENT_SECRET;
var REDIRECT_URI  = process.env.REDIRECT_URI;

var query = qs.stringify({
  client_id     : CLIENT_ID,
  response_type : 'code',
  redirect_uri  : REDIRECT_URI,
  scope         : 'read'
});

router.get('/', (req, res) => {
  res.render('index', { msg: 'ok' });
});

router.get('/auth', (req, res) => {
  res.redirect(`https://api.annict.com/oauth/authorize\?${query}`);
});

router.get('/auth/callback', (req, res) => {
  var code    = req.query.code;
  var annict  = new Annict();
  annict.OAuth.token(
    CLIENT_ID,
    CLIENT_SECRET,
    'authorization_code',
    REDIRECT_URI,
    code
  )
  .then(token => {
    res.json({ access_token: token.access_token });
  });
});

router.get('/get_widget_code', (req, res) => {
  res.render('get-widget-code');
});



module.exports = router;
