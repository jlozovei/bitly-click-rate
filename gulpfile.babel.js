'use strict'

const gulp = require('gulp'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	webpack = require('webpack-stream'),
	babel = require('gulp-babel'),
	UglifyJsPlugin = require('uglifyjs-webpack-plugin');

function handleError(err) {
	console.log(err.toString());
	this.emit('end');
}


gulp.task('js', function(){
	return gulp.src('./dev/js/**.js')
		.pipe(webpack({
			module: {
				loaders: [{
					test: /\.js$/,
					loader: "babel-loader",
					options: {
						presets: ["es2015"]
					},
				}]
			},
			output: {
				filename: 'app.js'
			},
			plugins: [
			    new UglifyJsPlugin()	
			]
		}))
		.on('error', handleError)
		.pipe(gulp.dest('./dist/js'));
});


gulp.task('sass', function () {
    return gulp.src('./dev/sass/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'));
});




gulp.task('default', () => {
	gulp.watch('./dev/js/*.js', ['js']);
	gulp.watch('./dev/sass/**/*.scss', ['sass']);
});

gulp.task('scripts', () => {
	gulp.watch('./dev/js/*.js', ['js']);
});

gulp.task('styles', () => {
	gulp.watch('./dev/sass/**/*.scss', ['sass']);
});