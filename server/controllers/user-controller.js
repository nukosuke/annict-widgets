'use strict';

class UserController {
  constructor() {

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
