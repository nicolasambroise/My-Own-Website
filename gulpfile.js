/** ===========================================================================
 * Gulp configuration file.
 * ========================================================================= */

// Requis
'use strict';

// Variables de chemins
var src = './src'; // dossier de travail
var dist = './dist'; // dossier à livrer

/** ---------------------------------------------------------------------------
 * Load plugins.
 * ------------------------------------------------------------------------- */

var gulp = require('gulp'),
    browser = require('browser-sync').create(),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    minifyJS = require('gulp-uglify'),
    concatJS = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    imagemin = require('gulp-imagemin'),
    sequence = require('run-sequence'),
    clean = require('gulp-clean'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    htmlbeautify = require('gulp-html-beautify'),
	jimpresize = require("gulp-jimp-resize"),
	notify = require('gulp-notify');
	

// Include plugins automatiquement
var plugins = require('gulp-load-plugins')({pattern: ['gulp-*', 'gulp.*'],replaceString: /\bgulp[\-.]/}); // tous les plugins de package.json


/* ************* JS FILE ************* */
	// Concatenate JS ( Multiple JS file --> scripts.js --> scripts.min.js) -- OK
	gulp.task('JSminify', ['JScheck'], function() {
		return gulp.src([src + '/assets/js/*.js', '!' +src + '/assets/js/*.min.js'])
			.pipe(concatJS('scripts.js'))
			.pipe(gulp.dest(dist + '/assets/js'))
			.pipe(plugins.notify({title: 'Gulp',message: 'JSconcat Done'}))
			//.pipe(minifyJS())
			.pipe(plugins.uglify()).on('error', function (err) { plugins.util.log(plugins.util.colors.red('[Error]'), err.toString()); })
			.pipe(rename('scripts.min.js'))
			.pipe(gulp.dest(dist + '/assets/js'))
			.pipe(plugins.notify({title: 'Gulp',message: 'JSminify Done'}));
	});
	
	// Check JS code for errors. -- OK
	gulp.task('JScheck', function() {
		return gulp.src([src + '/assets/js/*.js', '!' +src + '/assets/js/*.min.js'])
			.pipe(jshint())
			.pipe(jshint.reporter('jshint-stylish'))
			.pipe(jshint.reporter('fail')); // task fails on JSHint error
	});
	
	// Copy JS Jquery / Bootstrap -- OK
	gulp.task('JScopy', function() {
		return gulp.src(src + '/assets/js/*.min.js') 
		.pipe(gulp.dest(dist + '/assets/js'))
		.pipe(plugins.notify({title: 'Gulp',message: 'JScopy Done'}));
	});


/* ************* CSS FILE ************* */
	// Compile CSS from Sass files ( Multiple SCSS files --> style.css) -- OK
	gulp.task('sass', function() {
		return gulp.src(src + '/assets/scss/*.scss')
			.pipe(plumber({
				errorHandler: notify.onError({
					title: 'Gulp error in the <%= error.plugin %> plugin',
					message: '<%= error.message %>'})}))
			.pipe(sass({outputStyle: 'expanded'}))
			.pipe(autoprefixer({browsers: ['last 2 versions', 'ie 6-8']}))
			.pipe(plugins.concat('style.css')) //concatenates all the CSS files into one
		    .pipe(plugins.csscomb())
		    .pipe(plugins.cssbeautify({indent: '  '}))
		    .pipe(plugins.autoprefixer())
		    .pipe(plugins.rename({ basename : 'style', extname : '.css' }))
		    .pipe(gulp.dest(src + '/assets/css'))
			.pipe(browser.stream());	 
	});

	// Concatenate CSS ( style.css + bootstrap.css + ??? --> styles.css) -- OK
	gulp.task('CSSconcat', function() {
		return gulp.src([src + '/assets/css/*.css','!'+ src+'/assets/css/cover_top.css','!'+ src+'/assets/css/*.min.css']) // ATTENTION Exeption sur le cover_top.css
		  .pipe(plugins.concat('styles.css'))
		  .pipe(gulp.dest(dist + '/assets/css'))
			.pipe(plugins.notify({title: 'Gulp',message: 'CSSconcat Done'}));
	});
	
	// Copy CSS ( xxx.css (src ) --> xxx.css (prod)) -- OK
	gulp.task('CSScopy', function() {
		return gulp.src(src+'/assets/css/cover_top.css') 
		.pipe(gulp.dest(dist + '/assets/css'))
		.pipe(plugins.notify({title: 'Gulp',message: 'CSScopy Done'}));
	});
	
	// Copy CSS Bootstrap -- OK
	gulp.task('CSSbootstrap', function() {
		return gulp.src(src+'/assets/css/bootstrap.min.css') 
		.pipe(gulp.dest(dist + '/assets/css'))
		.pipe(plugins.notify({title: 'Gulp',message: 'CSSbootstrap Done'}));
	});

	// Minify CSS ( styles.css --> styles.min.css et ???.css --> ???.min.css) -- OK
	gulp.task('CSSminify', function() {
		return gulp.src([dist + '/assets/css/*.css', '!'+ dist + '/assets/css/*.min.css']) // ATTENTION Exeption sur les min.css
			.pipe(plugins.csso())
			.pipe(plugins.rename({suffix: '.min'}))
			.pipe(gulp.dest(dist + '/assets/css'))
			.pipe(plugins.notify({title: 'Gulp',message: 'CSSminify Done'}));
	});


/* ************* HTML FILE ************* */

	// HTMLoptimize (Corrige les erreurs de balise + remove des commentaires + Indente le code) -- OK
	gulp.task('HTMLoptimize', function() {
	 return gulp.src(src + '/*.html')
	 	.pipe(plugins.htmlclean())
		.pipe(plugins.rename({suffix: '.original'}))
	    .pipe(htmlbeautify({indentSize: 2}))
	    .pipe(gulp.dest(dist + '/'))
	});

	// HTMLminify -- OK
	gulp.task('HTMLminify', function() {
	  return gulp.src(dist + '/*.original.html')
	    .pipe(plugins.htmlmin({collapseWhitespace: true}))
		.pipe(plugins.rename("index.html"))
	    .pipe(gulp.dest(dist + '/'));
	});

/* ************* IMAGES ************* */

	// IMGoptimize --> all picture --> minimize picture
	gulp.task('IMGoptimize', function() {
	  return gulp.src(src + '/assets/img/**/*.{png,jpg,gif,svg,ico}')
		.pipe(plugins.cache(plugins.imagemin({ optimizationLevel: 5, progressive: true, interlaced: true, verbose: true })))
		.pipe(gulp.dest(dist + '/assets/img/'));
	});

	// IMGresize - ToDo : larger than original.
	gulp.task('IMGresize', function() {
	  return gulp.src(dist + '/assets/img/*.{png,jpg,gif,svg,ico}')
		.pipe(jimpresize({
			sizes: [
				{"suffix": "xxl", "width": 1200},
				{"suffix": "xl", "width": 991},
				{"suffix": "l", "width": 768},
				{"suffix": "m", "width": 576},
				{"suffix": "s", "width": 480},
				{"suffix": "xs", "width": 300},
				{"suffix": "xxs", "width": 100}
			]
		}))
		.pipe(gulp.dest(dist + '/assets/img/resized'));
	});

	/* ************** delete all *************** */ 
	
	// Deletes the dist folder so the build can start fresh.
	gulp.task('reset', function() {
		return gulp.src(dist)
			.pipe(clean());
	});

/** ---------------------------------------------------------------------------
 * Watch tasks.
 * ------------------------------------------------------------------------- */

// Create a server with BrowserSync and watch for file changes.
gulp.task('server', function() {
    browser.init({
        injectChanges: true,
        server: {baseDir: "dist"},
        port: 1234

        // For a complete list of options, visit: https://www.browsersync.io/docs/options
    });

    // Watch for file changes.
    gulp.watch('src/*.html', ['watch-html']);
	gulp.watch(src + '/assets/js/*.js', ['watch-js']);
    gulp.watch(src + '/assets/css/*.scss', ['sass']);
    gulp.watch(src + '/assets/css/*.css', ['style']);
    gulp.watch(src + '/assets/img/**/*.{png,jpg,gif,svg,ico}', ['watch-img']);
});

 
// HTML.
gulp.task('watch-html', ['pages'], function(done) {
    browser.reload();
    done();
});

// Images.
gulp.task('watch-img', ['images'], function(done){
    browser.reload();
    done();
});

// JS.
gulp.task('watch-js', ['script'], function(done) {
    browser.reload();
    done();
});



/* ************* TASKS MANAGER ************* */

// Tâche "style CSS" -- OK
gulp.task('style', function(cb) {
    sequence(['CSSconcat', 'CSScopy', 'CSSbootstrap'], 'CSSminify', cb);
});

// Tâche "script"
gulp.task('script', function(cb) {
    sequence('JScopy', 'JSminify', cb);
});

// Tâche "images"
gulp.task('images', function(cb) {
    sequence('IMGoptimize', 'IMGresize', cb);
});

// Tâche "pages" -- OK
gulp.task('pages', function(cb) {
    sequence('HTMLoptimize', 'HTMLminify', cb);
});

// Tâche "build"
gulp.task('build', function(cb) {
    sequence('sass',['style', 'script', 'images','pages'], cb);
});

// Default Task
gulp.task('default', function(cb) {
    sequence('build', 'server', cb);
});
