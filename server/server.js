var express    = require('express');
var bodyParser = require('body-parser');
var session    = require('express-session');
var Router     = require('./route');
var app        = express();

app.set('views', __dirname+'/views');
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use('/static', express.static(__dirname+'/../public'));

// session middle ware config
app.use(session({
  cookie: { serure: true }
}));

// Allow Cross Origin Request config
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const config = {
  ANNICT_MONGODB_URI    : process.env.ANNICT_MONGODB_URI    || 'localhost:27017',
  ANNICT_FETCH_CRON_TAB : process.env.ANNICT_FETCH_CRON_TAB || '* */5 * * * *',
  ANNICT_CLIENT_ID      : process.env.ANNICT_CLIENT_ID      || '',
  ANNICT_CLIENT_SECRET  : process.env.ANNICT_CLIENT_SECRET  || '',
  ANNICT_REDIRECT_URI   : process.env.ANNICT_REDIRECT_URI   || 'urn:ietf:wg:oauth:2.0:oob',
};
app.set('config', config);

/**
 * use Annict client library as middleware
 */
const Annict = require('annict').default;
const annict = new Annict();
app.set('middlewares', {
  annict
});

/**
 * DB config & Schema definition
 */
const mongoose = require('mongoose');
mongoose.connect(config.ANNICT_MONGODB_URI);

const schema = require('./models');
const models = {
  User   : mongoose.model('User'  , schema.User),
  Widget : mongoose.model('Widget', schema.Widget),
  Work   : mongoose.model('Work'  , schema.Work),
};
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
const crontab       = config.ANNICT_FETCH_CRON_TAB;

const cron = new CronJob(crontab, job, () => {
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
