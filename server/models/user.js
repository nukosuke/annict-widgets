const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const User = new Schema({
  access_token: String,
  watching: [{
    title: String,
    official_site_url: String
  }],
  updated_at: Date
});

module.exports = User;
