'use strict';

class UserController {
  constructor(app) {

  }

  show(req, res) {
    if(!req.query.id) {
      return res.redirect('/');
    }

    return res.render('users/show', {
      user
    });
  }
}

module.exports = UserController;
