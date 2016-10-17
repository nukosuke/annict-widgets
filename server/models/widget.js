// widget model
const Schema = require('mongoose').Schema;
const ObjectId = Schema.ObjectId;

const Widget = new Schema({
  name: String,
  user: { type: ObjectId, ref: 'UserSchema' },
  works: [Work],
  updated_at: Date
});

module.exports = Widget;
