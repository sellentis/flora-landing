const { src, dest, series, watch } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const csso = require('gulp-csso')
const imagecomp = require('compress-images');
const imagemin =  require('gulp-imagemin');
const uglify = require('gulp-uglify-es').default
const include = require('gulp-file-include')
const htmlmin = require('gulp-htmlmin')
const autoprefixer = require('gulp-autoprefixer')
const concat = require('gulp-concat')
const del = require('del')
const sync = require('browser-sync').create()

function html() {
  return src('src/**.html')
    .pipe(include({
      prefix: '@@'
    }))
    // .pipe(htmlmin({
    //     collapseWhitespace: true
    // }))
    .pipe(dest('dist'))
}

function scss() {
  return src(['src/scss/*.scss'])
    .pipe(sass())
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(csso())
    .pipe(concat('main.css'))
    .pipe(dest('dist/css'))
}

function js() {
  return src([
    'src/js/main.js'
  ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('dist/js'))
}

// async function compressImages() {
//   imagecomp(
//     "src/img/**/*",
//     "dist/img/**/*",
//     { compress_force: false, statistic: true, autoupdate: true }, false,
//     { jpg: { engine: "mozjpeg", command: ["-quality", "75"] } },
//     { png: { engine: "pngquant", command: ["--quality=75-100", "-o"] } },
//     { svg: { engine: "svgo", command: "--multipass" } },
//     { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
//     function (err, completed) {
//       if (completed === true) {
//         // browserSync.reload()
//       }
//     }
//   )
// }


function compressImages() {
  return src('src/img/**/*')
    .pipe(imagemin())
    .pipe(dest('dist/img/'))
}

function copyCss() {
  return src('src/css/**/*')
    .pipe(dest('dist/css/'));
}

function copyCss() {
  return src('src/css/**/*')
    .pipe(dest('dist/css/'));
}

function copyFonts() {
  return src('src/fonts/*')
    .pipe(dest('dist/fonts/'));
}

function copyImg() {
  return src('src/img/**/*')
    .pipe(dest('dist/img/'));
}
function copyVideo() {
  return src('src/video/*')
    .pipe(dest('dist/video/'));
}

function clear() {
  return del('dist')
}

function serve() {
  sync.init({
    server: './dist'
  })

  watch(['src/**.html',
    'src/parts/**.html'], series(html))
    .on('change', sync.reload)

  watch(['src/scss/**/*.scss'], series(scss))
    .on('change', sync.reload)

  watch('src/js/**.js', series(js))
    .on('change', sync.reload)

  watch('src/img/*', series(copyImg))
    .on('change', sync.reload)

  watch('src/video/*', series(copyVideo))
    .on('change', sync.reload)
}

exports.build = series(clear,
  scss,
  html,
  js,
  copyCss,
  copyFonts,
  compressImages,
  copyVideo
)
exports.serve = series(
  clear,
  scss,
  html,
  js,
  copyCss,
  copyFonts,
  copyImg,
  copyVideo,
  serve
)
exports.clear = clear