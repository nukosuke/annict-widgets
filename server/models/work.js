// work model
const Schema = require('mongoose').Schema;

const Work = new Schema({
  title: String,
  official_site_url: String,
});

module.exports = Work;
