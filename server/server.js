var express    = require('express');
var bodyParser = require('body-parser');
var route      = require('./route');
var app        = express();

app.set('views', __dirname+'/views');
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use('/static', express.static(__dirname+'/../public'));
app.use(route);



var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var models = {};
models.User = mongoose.model('User', require('./models/user'));

app.set('models', models);


var CronJob = require('cron').CronJob;
const BATCH_INTERBAL = process.env.BATCH_INTERBAL;

new CronJob(`* */5 * * * *`, function() {
  //console.log('do');
}, function() {}, true, 'Asia/Tokyo');

app.listen(process.env.PORT || 3000);
