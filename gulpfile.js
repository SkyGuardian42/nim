var	gulp					=	require('gulp'),
		pug						=	require('gulp-pug'),
		sass					=	require('gulp-sass'),
		jshint				=	require('gulp-jshint'),
		stylish				=	require('jshint-stylish'),
		server				=	require('gulp-webserver'),
		autoprefixer	= require('gulp-autoprefixer');

gulp.task('html', function () {
	return gulp.src('source/index.pug')
	.pipe(pug())
	.on('error', swallowError)
	.pipe(gulp.dest('public'))
});
gulp.task('css', function () {
	return gulp.src(['source/**/*.sass', 'source/includes'])
	.pipe(sass({outputStyle: 'compressed'}))
	.on('error', swallowError)
	.pipe(autoprefixer({
		browsers: ['last 2 versions'],
    cascade: false
	}))
	.on('error', swallowError)
	.pipe(gulp.dest('public'))
});
gulp.task('js', function () {
	return gulp.src('source/**/*.js')
	.pipe(jshint())
	.pipe(jshint.reporter(stylish))
	.pipe(gulp.dest('public'))
});
gulp.task('media', function () {
	return gulp.src('source/media/**/*.*')
	.pipe(gulp.dest('public/media'))
});
gulp.task('webserver', function () {
	gulp.src('./public/')
	.pipe(server({
		livereload: true,
		directoryListing: false,
		open: true,
		port: 1337
	}))
});
gulp.task('watch', function(){
	gulp.watch('source/**/*.pug', ['html']);
	gulp.watch('source/styles.sass', ['css']);
	gulp.watch('source/**/*.js', ['js']);
	gulp.watch('source/media/**/*.*', ['media'])
});

gulp.task('serve', ['build', 'webserver', 'watch']);

gulp.task('build', ['html', 'css', 'js', 'media']);

gulp.task('default', ['build']);

function swallowError (error) {
  console.log(error.toString());
  this.emit('end');
}