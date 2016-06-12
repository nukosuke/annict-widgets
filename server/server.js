var express    = require('express');
var bodyParser = require('body-parser');
var route      = require('./route');
var app        = express();

app.set('views', __dirname+'/views');
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use('/static', express.static(__dirname+'/../public'));
app.use(route);

app.listen(process.env.PORT || 3000);
