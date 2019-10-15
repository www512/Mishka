"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var rename = require("gulp-rename");
var less = require("gulp-less");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");
var server = require("browser-sync").create();
var webp = require("gulp-webp");
var imagemin = require("gulp-imagemin");
var svgstore = require("gulp-svgstore");
var uglify = require("gulp-uglify");
var del = require("del");

gulp.task("webp", function () {
  return gulp.src("source/img/**/*.{png,jpg}")
  .pipe(webp({quality: 90}))
  .pipe(gulp.dest("build/img"));
});


gulp.task("images", function() {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("svgstore", function () {
  return gulp.src("source/img/sprite/**/*.svg")
  .pipe(svgstore({
    inlineSvg: true
  }))
  .pipe(rename("sprite.svg"))
  .pipe(gulp.dest("build/img/sprite"));
});

gulp.task("uglify", function () {
  return gulp.src("source/js/script.js")
  .pipe(uglify())
  .pipe(rename("script.min.js"))
  .pipe(gulp.dest("build/js"))
});

gulp.task("css", function () {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([ autoprefixer()    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/js/**",
    "source/*.html",
    "source/*.ico",
    "source/css/normalize.css",
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/less/**/*.less", gulp.series("css"));
  gulp.watch("source/img/sprite/**/*.svg", gulp.series("svgstore"));
  gulp.watch("source/*.html", gulp.series("refresh"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("image", gulp.series("webp", "images"));
gulp.task("build", gulp.series("clean", "copy", "css", "uglify", "svgstore", "webp"));
gulp.task("start", gulp.series("build", "server"));
