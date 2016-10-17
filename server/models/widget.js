// widget model
const Schema = require('mongoose').Schema;
const ObjectId = Schema.ObjectId;
const Work = require('./work');

const Widget = new Schema({
  name: String,
  user: { type: ObjectId, ref: 'User' },
  works: [Work],
  updated_at: Date
});

module.exports = Widget;
