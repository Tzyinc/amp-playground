var express = require('express');
var exphbs  = require('express-handlebars');
 
var app = express();

var { testemplate } = require('./temp');
 
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  helpers: require('./handlebars-helpers') //only need this
}));
app.set('view engine', 'handlebars');
 
app.get('/', function (req, res) {
    res.render('home');
});

console.log(testemplate)

app.get('/story', function(req, res) {
  res.render('story', {helpers: {
    section: function (name, options) {
      if (!this._sections) this._sections = {};
      this._sections[name] = options.fn(this);
      return null;
    }},
    slides: testemplate.slides,
    template: testemplate,
  });
});
app.use('/assets', express.static('assets'))
 
app.listen(3000);
