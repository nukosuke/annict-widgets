module.exports = function(app) {
    const annict = app.get('middlewares').annict;
    const User   = app.get('models').User;

    return function() {
      /**
       * fetch & update for all user data
       */
      User.find({}, function(err, users) {
        users.forEach(user => {
          annict.Me.Work.get({
            access_token  : user.access_token,
            filter_status : 'watching',
            per_page      : 10
          })
          .then(response => response.json())
          .then(response => {
            user.watching   = response.works;
            user.updated_at = new Date();
            user.save();
          });
        });
      });
    }
}
