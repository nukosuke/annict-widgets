var express    = require('express');
var bodyParser = require('body-parser');
var route      = require('./route');
var app        = express();

var Annict = require('annict').default;
var annict = new Annict();

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

const User = models.User;

try {
new CronJob(`*/5 * * * * *`, function() {
  User.find({}, function(err, users) {
    console.log(users);
    users.forEach(user => {
      annict.Me.Work.get({
        access_token: user.access_token,
        filter_status: 'watching',
        per_page: 10
      })
      .then(response => {
        user.watching = response.works;
        user.save();
        console.log('update');
      });
    });
  });

}, function() {}, true, 'Asia/Tokyo');
}
catch(ex) {
  console.log(ex);
}

app.listen(process.env.PORT || 3000);
