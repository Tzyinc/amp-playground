var express = require('express');
var exphbs  = require('express-handlebars');
 
var app = express();

var lokidb = require('./db');

var { testemplate } = require('./temp');

lokidb.initDbIfNotExist();
lokidb.initData();
 
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  helpers: require('./handlebars-helpers') //only need this
}));
app.set('view engine', 'handlebars');
 
app.get('/', function (req, res) {
  res.render('home', {
    helpers: {
      section: function (name, options) {
        if (!this._sections) this._sections = {};
        this._sections[name] = options.fn(this);
        return null;
      }
    }
  });
});


app.get('/editor', function (req, res) {
  res.render('editor', {
    helpers: {
      section: function (name, options) {
        if (!this._sections) this._sections = {};
        this._sections[name] = options.fn(this);
        return null;
      }
    }
  });
});

app.get('/story', function(req, res) {
  res.render('story', {helpers: {
    section: function (name, options) {
      if (!this._sections) this._sections = {};
      this._sections[name] = options.fn(this);
      return null;
    }},
    pages: testemplate.pages,
    template: testemplate,
  });
});


app.get('/preview', function (req, res) {
  const template = lokidb.fetchTest();
  res.render('story', {
    helpers: {
      section: function (name, options) {
        if (!this._sections) this._sections = {};
        this._sections[name] = options.fn(this);
        return null;
      }
    },
    pages: template.pages,
    template: template,
  });
});

app.use('/assets', express.static('assets'))

app.use('/ace-builds-master', express.static('ace-builds-master'));
 
app.listen(3000);
