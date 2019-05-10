var express = require('express');
var bodyParser = require('body-parser')
var exphbs  = require('express-handlebars');
 
var app = express();

var lokidb = require('./db');

var { testemplate } = require('./temp');

lokidb.initDbIfNotExist();
 
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


app.get('/editor/:title', function (req, res) {
  const title = req.params.title;
  const initJson = lokidb.fetch(req.params.title);
  res.render('editor', {
    helpers: {
      section: function (name, options) {
        if (!this._sections) this._sections = {};
        this._sections[name] = options.fn(this);
        return null;
      }
    },
    title: title,
    initJson: JSON.stringify(initJson, null, 4),
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


app.get('/preview/:title', function (req, res) {
  if (req.params && req.params.title) {
    const template = lokidb.fetch(req.params.title);
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
  } else {
    res.send('404');
  }
});

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded()); // to support URL-encoded bodies

app.post('/save', function (req, res){
  const data = JSON.parse(req.body.value);
  lokidb.update(data);
  res.send({success: true});
})

app.post('/writeChanges', function(req, res) {
  lokidb.saveToDisk();
  res.send({success: true});
})

app.use('/assets', express.static('assets'))

app.use('/ace-builds', express.static('node_modules/ace-builds'));
 
app.listen(3000);
