var express    = require('express');
var bodyParser = require('body-parser');
var Router     = require('./route');
var app        = express();

app.set('views', __dirname+'/views');
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use('/static', express.static(__dirname+'/../public'));

const config = {
  ANNICT_MONGODB_URI    : process.env.MONGODB_URI,
  ANNICT_FETCH_INTERBAL : process.env.ANNICT_FETCH_INTERBAL
  ANNICT_CLIENT_ID      : process.env.CLIENT_ID,
  ANNICT_CLIENT_SECRET  : process.env.CLIENT_SECRET,
  ANNICT_REDIRECT_URI   : process.env.REDIRECT_URI,
};
app.set('config', config);

/**
 * use Annict client library as middleware
 */
var Annict = require('annict').default;
var annict = new Annict();
app.set('middlewares', {
  annict
});

/**
 * DB config & Schema definition
 */
var mongoose = require('mongoose');
var models = {};
mongoose.connect(config.ANNICT_MONGODB_URI);
const User = models.User = mongoose.model('User', require('./models/user'));
app.set('models', models);

/**
 * Controllers
 */
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

/**
 * Configure routes
 */
const route = Router(app);
app.use(route);



module.exports = {
  server: app,
  cron
};
