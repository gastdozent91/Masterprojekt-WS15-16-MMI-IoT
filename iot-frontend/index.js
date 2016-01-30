require('node-jsx').install({extension: '.jsx'});
var express = require('express')
  , bodyParser = require('body-parser')
  , session = require('express-session')
  , passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

var chart = require('./lib/app/controller/chart')
  , login = require('./lib/app/controller/login')
  , sensor = require('./lib/app/controller/sensor')
  , gateway = require('./lib/app/controller/gateway')
  , cluster = require('./lib/app/controller/cluster')
  , dashboard = require('./lib/app/controller/dashboard')
  , test = require('./lib/app/controller/test')
  , sensor = require('./lib/app/controller/sensor')
  , user = require('./lib/app/controller/user')
  , User = require('./lib/app/models/user'); // only used by passport

var app = express();

app.set('views', __dirname + '/build/views');
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/build/public'));
app.use(bodyParser.json());

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.find(username, function(err, user) {
      if (err) {return done(err);}
      if (!user) {
        return done(null, false, {message: 'Incorrect Username'});
      }
      if (user.password !== password) {
        return done(null, false, {message: 'Incorrect password'});
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  console.log('serialize');
    done(null, user.Username);
});

passport.deserializeUser(function(username, done) {
  console.log('deserialize');
    User.find(username, function(err, user) {
      done(err, user);
    });
});

app.set('trust proxy', 1);

app.use(session({
  secret: 'keyboard cat',
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 365},
  resave: false,
  saveUninitialized: true,
  //cookie: { secure: true }
}));
app.use(passport.initialize());
app.use(passport.session());

// Frontend

app.get('/login',
  login.isAlreadyLoggedIn,
  login.render
);

app.get('/logout',
  login.logout
);

app.get('/',
  login.shouldBeLoggedIn,
  sensor.getAll,
  gateway.getAll,
  cluster.getAll,
  dashboard.render
);

app.get('/gateways',
  login.shouldBeLoggedIn,
  gateway.getAll,
  gateway.render
);

app.get('/clusters',
  login.shouldBeLoggedIn,
  cluster.getAll,
  cluster.render
);

app.get('/sensors',
  login.shouldBeLoggedIn,
  sensor.getAll,
  sensor.render
);

app.get('/users',
  login.shouldBeLoggedIn,
  user.getAll,
  user.render
);

app.get('/user/:username',
  login.shouldBeLoggedIn,
  user.getOne,
  user.render
);

app.get('/sensor/:id',
  login.shouldBeLoggedIn,
  sensor.getOne,
  sensor.render
);

app.get('/gateway/:id',
  login.shouldBeLoggedIn,
  gateway.getOne,
  gateway.getSensors,
  gateway.render
);

app.get('/cluster/:id',
  login.shouldBeLoggedIn,
  cluster.getOne,
  cluster.getSensors,
  cluster.render
);

// API

app.post('/user',
  login.shouldBeLoggedIn,
  user.create
);

app.post('/sensor',
  login.shouldBeLoggedIn,
  sensor.create
);

app.post('/gateway',
  login.shouldBeLoggedIn,
  gateway.create
);

app.post('/cluster',
  login.shouldBeLoggedIn,
  cluster.create
);

app.get('/chart',
  chart.render
);

app.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    if (req.user) res.json({status: 'success'});
});

app.get('/createTest',
  test.createTable,
  test.createDummyUser
);

app.get('/getUser',
  test.getUser
);

app.get('/listUser',
  user.getAll
);

app.get('/updateUser',
  user.update
);

app.get('/deleteUser',
  user.delete
);

app.get('/createUser',
  user.create
);

app.get('/listUserSensors',
  user.getSensors
);

app.get('/updateUserSensors',
  user.setSensors
);

var server = app.listen(3000, function() {
  var host = server.address().address
  var port = server.address().port
  console.log('Server running at http://%s:%s', host, port)
})
