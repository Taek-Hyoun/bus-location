var express = require('express');
var app = express();

app.set('view engine', 'jade');
app.set('views', './views');
app.use(express.static('public'));
// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.render('map');
});
app.listen(3000, () => console.log('서버 실행중...'))