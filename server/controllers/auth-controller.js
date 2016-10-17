'use strict';

const query = require('querystring');

class AuthController {
  constructor(app) {
    this.config = app.get('config');
    this.annict = app.get('middlewares').annict;
    this.User   = app.get('models').User;

    const query = qs.stringify({
      client_id     : this.config.ANNICT_CLIENT_ID,
      response_type : 'code',
      redirect_uri  : this.config.ANNICT_REDIRECT_URI,
      scope         : 'read'
    });
    this.auth_uri = `https://api.annict.com/oauth/authorize\?${query}`;
  }

  auth(req, res) {
    res.redirect(this.auth_uri);
  }

  callback(req, res) {
    //TODO: find or crete user
    // and redirect to user page
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
    .then(response => response.json())
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
      .then(response => response.json())
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
          return res.redirect(`/users/${user._id}`);
        });
      });
    });
  }
}

module.exports = AuthController;
