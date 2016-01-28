var gulp = require('gulp')
  , jade = require('gulp-jade')
  , browserify = require('gulp-browserify')
  , stylus = require('gulp-stylus')
  , jshint = require('gulp-jshint')
  , rename = require('gulp-rename')
  , gulpsync = require('gulp-sync')(gulp)
  , react = require('gulp-react')
  , fs = require('fs')

var timestamp = Date.now();

gulp.task('jade', function() {
  return gulp.src('lib/app/views/*.jade')
        .pipe(gulp.dest('build/views'))
})

gulp.task('browserify', function() {
  return gulp.src('lib/public/js/app.js')
        .pipe(browserify({extensions: ['.jsx']}))
        .pipe(gulp.dest('build/public/js'))
})

gulp.task('stylus', function() {
  return gulp.src('lib/public/css/*.styl')
        .pipe(stylus({
          compress: true
        }))
        .pipe(gulp.dest('build/public/css'))
})

gulp.task('fonts', function() {
  return gulp.src('lib/public/fonts/*')
        .pipe(gulp.dest('build/public/fonts'))
})

gulp.task('clean', function() {
  var jsFiles = fs.readdirSync('build/public/js');
  jsFiles.forEach(function(file) {
    fs.unlinkSync('build/public/js/' + file);
  });

  var cssFiles = fs.readdirSync('build/public/css');
  cssFiles.forEach(function(file) {
    if (file !== 'foundation.min.css')
      fs.unlinkSync('build/public/css/' + file);
  });
})

gulp.task('rename', function() {
  gulp.src('build/public/js/app.js')
  .pipe(rename('app' + timestamp + '.js'))
  .pipe(gulp.dest('build/public/js'))

  gulp.src('build/public/css/style.css')
  .pipe(rename('style' + timestamp + '.css'))
  .pipe(gulp.dest('build/public/css'))

  fs.readFile('build/views/layout.jade', 'utf8', function(err, str) {
    if (err) return console.log(err)
    var compiled = str.replace(/<%=(.+?)%>/g, timestamp)

    fs.writeFile('build/views/layout.jade', compiled, function(err) {
      if (err) return console.log(err)
    })
  })
})

gulp.task('createBuildDir', function() {
  fs.existsSync('build') || fs.mkdirSync('build')
  fs.existsSync('build/public') || fs.mkdirSync('build/public')
  fs.existsSync('build/public/js') || fs.mkdirSync('build/public/js')
  fs.existsSync('build/public/css') || fs.mkdirSync('build/public/css')
})

gulp.task('copyFoundation', function() {
  if (!fs.existsSync('build/public/css/foundation.min.css')) {
    gulp.src('foundation.min.css')
    .pipe(gulp.dest('build/public/css'))
  }
})

gulp.task('lintjs', function() {
  return gulp.src('lib/**/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('default', {verbose: true}))
})

gulp.task('lintjsx', function() {
  return gulp.src('lib/**/*.jsx')
  .pipe(jshint({linter: require('jshint-jsx').JSXHINT}))
  .pipe(jshint.reporter('default', {verbose: true}))
})

gulp.task('sync', ['jade', 'stylus', 'fonts'])
gulp.task('async', ['rename'])

gulp.task('first', gulpsync.sync([
  'always', 'watch'
]))

gulp.task('always', gulpsync.sync([
  'clean', 'sync', 'browserify', 'rename', 'lintjs', 'lintjsx'
]))

gulp.task('watch', function() {
  gulp.watch('lib/public/**/*', ['always'])
})

gulp.task('default', ['createBuildDir', 'copyFoundation', 'first'])

gulp.task('production', ['createBuildDir', 'copyFoundation', 'always'])
