

class AuthController {
  constructor() {
    this.redirect_uri = '';

  }

  auth(req, res) {
    res.redirect(this.redirect_uri);
  }

  callback(req, res) {
    //TODO: find or crete user
    // and redirect to user page
  }
}
