"use strict"

const gulp = require("gulp");
const babel = require("gulp-babel")
const sourcemaps = require("gulp-sourcemaps")
const concat = require("gulp-concat")
const uglify = require("gulp-uglify")
const rename = require("gulp-rename")
const jsFiles = [
	"main.js",
	"auth/auth.config.js",
	"auth/auth.factory.js",
	"auth/auth.ctrl.js",
	"profile/profile.config.js",
	"profile/profile.factory.js",
	"profile/profile.ctrl.js",
	"recipe/addRecipe.config.js",
	"recipe/addRecipe.ctrl.js",
	"recipe/editRecipe.config.js",
	"recipe/editRecipe.ctrl.js",
	"recipe/viewRecipe.config.js",
	"recipe/viewRecipe.ctrl.js",
	"recipe/recipe.factory.js",
	"nav/nav.ctrl.js",
	"nav/nav.factory.js",
	"taproom/taproom.config.js",
	"taproom/taproom.factory.js",
	"taproom/taproom.ctrl.js",
	"taproom/tapView.ctrl.js",
	"lib/angular/angular.min.js",
	"lib/angular-bootstrap/ui-bootstrap.min.js",
	"lib/angular-filter/dist/angular-filter.min.js",
	"lib/angular-route/angular-route.min.js",
	"lib/angular-toArrayFilter/toArrayFilter.js",
	"lib/bootstrap/dist/js/bootstrap.min.js",
	"lib/firebase/firebase.js",
	"lib/jquery/dist/jquery.min.js",
	"main.js"
]

gulp.task("compilejs", function () {
  return gulp.src(jsFiles)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat("all.js"))
    .pipe(sourcemaps.write("./"))
    // .pipe(gulp.dest("docs"))
    // .pipe(rename("all.min.js"))
    // .pipe(uglify())
    .pipe(gulp.dest("docs"));
});

gulp.task('copystatic', function() {
    gulp.src("src/**/*.{html,css,png}")
    .pipe(gulp.dest("docs"));
});

gulp.task("default", ["compilejs", "copystatic"])
