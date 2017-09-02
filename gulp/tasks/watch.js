var gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create();

gulp.task('watch', function(){
    // inicia o server do projeto.
    browserSync.init({
        notify: false,
        server: {
            baseDir: "app"
        }
    });

    // verifica modificação no html e recarrega.
    watch('./app/index.html', function(){
        browserSync.reload();
    });

    // verifica alteração em qualquer arquivo css
    watch('./app/assets/styles/**/*.css', function(){
        gulp.start('cssInject'); 
    });

    // verifica altereção em qualquer arquivo js
    watch('./app/assets/scripts/**/*.js', function(){
        gulp.start('scriptsRefresh');
    });
});

// executa task styles e injeta o novo css na página
gulp.task('cssInject', ['styles'], function(){
    return gulp.src('./app/temp/styles/styles.css')
        .pipe(browserSync.stream()); // injeta css sem reload da página.
});

// executa task scripts e recarrega a página
gulp.task('scriptsRefresh', ['scripts'], function(){
    browserSync.reload();
});
