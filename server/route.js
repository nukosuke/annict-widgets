var express = require('express');
var router  = express.Router();

const ctrl = require('./controllers');

module.exports = function(app) {
  router.get('/', (req, res) => {
    res.render('index');
  });

  const authCtrl = new ctrl.AuthController(app);
  router.get('/auth', authCtrl.auth);
  router.get('/auth/callback', authCtrl.callback);

  const userCtrl = new ctrl.UserController(app);
  router.get('/users/:id', userCtrl.show);

  const widgetCtrl = new ctrl.WidgetController(app);
  router.get('/widgets/:id', widgetCtrl.show);

  const apiWidgetCtrl = new ctrl.ApiWidgetController(app);
  router.get('/api/widgets/:id', );

  return router;
}
