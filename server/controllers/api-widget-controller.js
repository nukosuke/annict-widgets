'use strict';

class ApiWidgetController {
  constructor(app) {
    this.config = app.get('config');
    this.User   = app.get('models').User;
  }

  show(req, res) {
    var User = this.User;
    User.findById(req.params.id, (err, user) => {
      if(err) {
        return res.status(500).json({});
      };

      if(!user) {
        return res.status(404).json({ works: [] });
      }
      return res.json({works: user.watching});
    });
  }
}

module.exports = ApiWidgetController;
