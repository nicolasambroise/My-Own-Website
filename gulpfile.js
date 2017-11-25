// Requis
var gulp = require('gulp');

// Include plugins
var plugins = require('gulp-load-plugins')({pattern: ['gulp-*', 'gulp.*'],replaceString: /\bgulp[\-.]/}); // tous les plugins de package.json
var hash = require('gulp-hash-filename')

// Variables de chemins
var src = './src'; // dossier de travail
var build = './build'; // dossier compilé
var dist = './dist'; // dossier à livrer

/* ************* JS FILE ************* */
	// Concatenate JS ( Multiple JS file --> scripts.js) -- OK
	gulp.task('JSconcat', function() {
		return gulp.src([src + '/assets/js/*.js', '!'+ src +'/assets/js/jquery.min.js','!'+ src +'/assets/js/modal.js']) // hors jQuery et Modals
		  .pipe(plugins.concat('scripts.js'))
		  .pipe(gulp.dest(build + '/assets/js'))
			.pipe(plugins.notify({title: 'Gulp',message: 'JSconcat Done'}));
	});

	// Minify JS (scripts.js --> scripts.min.js) -- OK
	gulp.task('JSminify', function() {
		return gulp.src([build + '/assets/js/*.js','!'+ build + '/assets/js/*.min.js']) // ATTENTION Exeption sur les min.js
			.pipe(plugins.rename({suffix: '.min'}))
			.pipe(plugins.strip())
			.pipe(plugins.uglify())  // Erreur si ES6 - se renseigner sur uglify-es()
			.on('error', function (err) { plugins.util.log(plugins.util.colors.red('[Error]'), err.toString()); })
			.pipe(gulp.dest(build + '/assets/js'))
			.pipe(plugins.notify({title: 'Gulp',message: 'JSminify Done'}));
	});

	// Hash JS (scripts.min.js --> scripts-00000000.min.js)
	gulp.task('JShash', function() {
		return gulp.src(build + '/assets/js/*.min.js')
		  .pipe(hash({"format" : "{name}-{hash}{ext}"}))
		  .pipe(gulp.dest(build + '/assets/js'))
			.pipe(plugins.notify({title: 'Gulp',message: 'JShash Done'}));
	});

/* ************* CSS FILE ************* */
	// Compile CSS from Sass files ( Multiple SCSS files --> style.css)
	gulp.task('SASScompile', function() {
		return gulp.src(src + '/assets/scss/*.scss')
		  .pipe(plugins.sass({ includePaths: [src + '/assets/scss'] /* [1] */, errLogToConsole: true /* [2] */ })) //compiles SASS to CSS and logs errors
		  .pipe(plugins.concat('style.css')) //concatenates all the CSS files into one
		  .pipe(plugins.csscomb())
		  .pipe(plugins.cssbeautify({indent: '  '}))
		  .pipe(plugins.autoprefixer())
		  .pipe(plugins.rename({ basename : 'style', extname : '.css' }))
		  .pipe(gulp.dest(src + '/assets/css'));
	});

	// Compile CSS from Sass files ( Multiple SCSS files --> bootstrap.css)
	gulp.task('SASScompile_Bootstrap', function() {
	   return gulp.src(src + '/assets/scss/bootstrap.scss')
		 //.pipe(plugins.sass())
		 .pipe(plugins.sass({ includePaths: [src + '/assets/scss'] /* [1] */, errLogToConsole: true /* [2] */ })) //compiles SASS to CSS and logs errors
		 .pipe(plugins.concat('bootstrap.css')) //concatenates all the CSS files into one
		 .pipe(plugins.csscomb())
		 .pipe(plugins.cssbeautify({indent: '  '}))
		 .pipe(plugins.autoprefixer())
		 .pipe(plugins.rename({ basename : 'bootstrap', extname : '.css' }))
		 .pipe(gulp.dest(src + '/assets/css'));
	});

	// Concatenate CSS ( style.css + bootstrap.css + ??? --> styles.css) -- OK
	gulp.task('CSSconcat', function() {
		return gulp.src([src + '/assets/css/*.css','!'+ src+'/assets/css/cover_top.css'])
		  .pipe(plugins.concat('styles.css'))
		  .pipe(gulp.dest(build + '/assets/css'))
			.pipe(plugins.notify({title: 'Gulp',message: 'CSSconcat Done'}));
	});

	// Minify CSS ( styles.css --> styles.min.css et ???.css --> ???.min.css) -- OK
	gulp.task('CSSminify', function() {
		return gulp.src([build + '/assets/css/*.css', '!'+ build + '/assets/css/*.min.css']) // ATTENTION Exeption sur les min.css
		  .pipe(plugins.csso())
			.pipe(plugins.strip())
		  .pipe(plugins.rename({suffix: '.min'}))
		  .pipe(gulp.dest(build + '/assets/css'))
			.pipe(plugins.notify({title: 'Gulp',message: 'CSSminify Done'}));
	});

	// Hash CSS ( styles.min.css --> styles-00000000.min.css et ???.min.css --> ???-00000000.min.css)
	gulp.task('CSShash', function() {
		return gulp.src(build + '/assets/css/*.min.css')
		  .pipe(hash({"format" : "{name}-{hash}{ext}"}))
		  .pipe(gulp.dest(build + '/assets/css'))
			.pipe(plugins.notify({title: 'Gulp',message: 'CSShash Done'}));
	});

/* ************* HTML FILE ************* */

	// HTMLoptimize (Corrige les erreurs de balise + remove des commentaires)
	gulp.task('HTMLoptimize', function() {
	 return gulp.src(src + '/*.html')
	 		.pipe(plugins.htmlclean())
	    .pipe(plugins.htmlbeautify({indentSize: 2}))
	    .pipe(gulp.dest(build + '/'))
	});

	// HTMLminify
	gulp.task('HTMLminify', function() {
	  return gulp.src(build + '/*.html')
	    .pipe(plugins.htmlmin({collapseWhitespace: true}))
			.pipe(plugins.strip())
			.pipe(plugins.rename({suffix: '.min'}))
	    .pipe(gulp.dest(build + '/'));
	});

/* ************* IMAGES ************* */
gulp.task('IMGoptimize', function() {
  return gulp.src(src + '/img/**/*')
    .pipe(plugins.cache(plugins.imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest(build + '/img/originals'));
});

gulp.task('IMGhash', function() {
  return gulp.src(build + '/img/originals/*.{png,jpg,bmp}')
    .pipe(hash({"format" : "{name}-{hash}{ext}"}))
    .pipe(gulp.dest(build + '/img/hashed'));
});

gulp.task('IMGresize', function() {
  return gulp.src(build + '/img/hashed/*.{png,jpg,bmp}')
		/*
		.pipe(plugins.ifElse(condition,
			// si la condition est rempli
			ifCallback,
			// sinon
			elseCallback)) */
    .pipe(plugins.jimp({
        sizes: [
            {"suffix": "md", "width": 960},
            {"suffix": "sm", "width": 480}
        ]
    }))
    .pipe(gulp.dest(build + '/img/resized'));
});

/* ************* Hash all *************** */
// HTMLhash_replace
gulp.task('hash', function() {
 return gulp.src(src + '/originals/*.min.html')
		.pipe(plugins.hash_src({build_dir: "./build", src_path: "./client"}))
		.pipe(gulp.dest(build))
});

/* ************* TASKS MANAGER ************* */

// Tâche "style"
gulp.task('sass', ['SASSconcat', 'SASScompile_Bootstrap']);

// Tâche "style"
//gulp.task('style', ['sass','CSSconcat', 'CSSminify']);
//gulp.task('style', ['CSSconcat', 'CSSminify']);
gulp.task('style', ['CSSminify'],'CSSconcat');


// Tâche "script"
gulp.task('script', ['JSconcat', 'JSminify']);

// Tâche "build"
gulp.task('images', ['IMGoptimize', 'IMGresize']);

// Tâche "pages"
gulp.task('pages', ['HTMLoptimize','HTMLminify']);

// Tâche "build"
gulp.task('build', ['style', 'script', 'images','pages']);

// Tâche "prod" = Build + minify
gulp.task('prod', ['build', 'hash']);

// Watch for changes in files
gulp.task('watch', function() {
 gulp.watch(src + '/assets/js/*.js', ['JSconcat']);
 gulp.watch(src + '/assets/css/*.scss', ['SASSconcat']);
 gulp.watch(src + '/assets/css/*.css', ['CSSconcat']);
 gulp.watch(src + '/assets/img/**/*', ['images']);
});
// Default Task
gulp.task('default', ['build', 'watch']);
