var express    = require('express');
var bodyParser = require('body-parser');
var route      = require('./route');
var app        = express();

app.set('views', __dirname+'/views');
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use('/static', express.static(__dirname+'/../public'));
app.use(route);

const config = {
  MONGODB_URI: process.env.MONGODB_URI,
  ANNICT_FETCH_INTERBAL: process.env.ANNICT_FETCH_INTERBAL
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  REDIRECT_URI: process.env.REDIRECT_URI,
};
app.set('config', config);

var Annict = require('annict').default;
var annict = new Annict();
app.set('middlewares', {
  annict
});

var mongoose = require('mongoose');
var models = {};
mongoose.connect(config.MONGODB_URI);
const User = models.User = mongoose.model('User', require('./models/user'));
app.set('models', models);


var controllers = {};
app.set('controllers', controllers);

/**
 * Noe-Cron Job to fetch new data for all user
 */
const CronJob       = require('cron').CronJob;
const UserUpdateJob = require('./jobs/update-users');
const job           = UserUpdateJob(app);

const cron = new CronJob(`* */5 * * * *`, function() {
    job();
  }, () => {
    console.log('cron job finished');
  },
  false,
  'Asia/Tokyo'
);

module.exports = {
  server: app,
  cron
};
