// widget model
const Schema = require('mongoose').Schema;
const ObjectId = Schema.ObjectId;

module.exports = {
  name: String,
  user: { type: ObjectId, ref: 'UserSchema' },
  works: [Work],
  updated_at: Date
}
