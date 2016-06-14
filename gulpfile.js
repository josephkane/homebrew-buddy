"use strict"

const gulp = require("gulp");
const jshint = require("gulp-jshint");
const jsPath = `/app/**/*.js`;

gulp.task("js:lint", () => {
	gulp.src(jsPath)
		.pipe(jshint())
		.pipe(jshint.reporter("jshint-stylish"))
});

gulp.task("js:watch", () => {
	gulp.watch(jsPath, ["js:lint"])
});

gulp.task("default", ["js:lint", "js:watch"]);