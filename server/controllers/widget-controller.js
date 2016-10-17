'use strict';

class WidgetController {
  constructor() {
  }

  index(req, res) {
    res.render('widgets/index');
  }

  show(req, res) {
    if(!req.query.id) {
      return res.redirect('/');
    }

    const BASE_URL = `https://${req.get('Host')}`;

    return res.render('widgets/index', {
      BASE_URL,
      dataId: req.query.id,
    });
  }
}

module.exports = WidgetController;
