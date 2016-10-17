const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const Widget = require('./widget');

const User = new Schema({
  access_token: String,
  widgets: { type: [Widget], default: [] },
  updated_at: Date,
});

module.exports = User;
