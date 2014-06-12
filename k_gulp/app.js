
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var ejs = require('ejs');

var app = express();

// all environments
app.engine('.html',ejs.__express);
app.set('view engine', 'html');
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', routes.index);
app.get('/users', user.list);

app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
