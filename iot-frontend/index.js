require('node-jsx').install({extension: '.jsx'});
var express = require('express')
  , bodyParser = require('body-parser')
  , session = require('express-session')
  , passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

var chart = require('./lib/app/controller/chart')
  , login = require('./lib/app/controller/login')
  //, gateways = require('./lib/app/controller/gateways')
  , dashboard = require('./lib/app/controller/dashboard')
  , test = require('./lib/app/controller/test')
  , User = require('./lib/app/models/user')
  , usercontroller = require('./lib/app/controller/usercontroller');

var app = express();

app.set('views', __dirname + '/build/views');
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/build/public'));
app.use(bodyParser.json());

passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log('use');
    User.find('Guest', function(err, user) {
      if (err) {return done(err);}
      if (!user) {
        return done(null, false, {message: 'Incorrect Username'});
      }
      if (user.password !== password) {
        return done(null, false, {message: 'Incorrect password'});
      }
      console.log('done');
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  console.log('serialize');
    done(null, user.name);
});

passport.deserializeUser(function(name, done) {
  console.log('deserialize');
    User.find(name, function(err, user) {
      done(err, user);
    });
});

app.set('trust proxy', 1);

app.use(session({
  secret: 'keyboard cat',
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 365}
  //resave: false,
  //saveUninitialized: true,
  //cookie: { secure: true }
}));
app.use(passport.initialize());
app.use(passport.session());

// Frontend

app.get('/login',
  function(req, res, next) {
    if (req.user) res.redirect('/');
    next();
  },
  login.render
);

app.get('/',
  function(req, res, next) {
    if (!req.user) res.redirect('/login');
    next();
  },
  dashboard.render
);

app.get('/chart',
  chart.render
);

app.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    if (req.user) res.json({status: 'success'});
});

//app.get('/login',
  //login.render
//);

//app.get('/gateways',
  //gateways.render
//);

//app.get('/createTest',
  //test.createTable
//);

app.get('/getUser',
  test.getUser
);

// Api

app.get('/users/all',
  usercontroller.allUsers
);

app.post('/users/register',
  usercontroller.registerUser
);

app.get('/users/login',
  usercontroller.loginUser
);

app.delete('/users/delete/:id',
  usercontroller.deleteUser
);

app.delete('/users/admin/delete/:id',
  usercontroller.deleteUser
);

app.put('/users/admin/change/:id/:role',
  usercontroller.changeUserRole
);


var server = app.listen(3000, function() {
  var host = server.address().address
  var port = server.address().port
  console.log('Server running at http://%s:%s', host, port)
})
