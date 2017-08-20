var gulp = require('gulp'),
svgSprite = require('gulp-svg-sprite'),
rename = require('gulp-rename'),
del = require('del');

var config = {
    mode: {
        css: {
            sprite: 'sprite.svg',
            render: {
                css: {
                    template: './gulp/templates/sprite.css'
                }
            }
        }
    }
}

// Deleta arquivos antigos antes de gerar novamente
gulp.task('beginClean', function(){
	return del(['./app/temp/sprite', './app/assets/images/sprites']);
});

// Depende de beginClean
// Une vários arquivos svg em um só
// Salva svg e css na pasta temp/sprite
gulp.task('createSprite', ['beginClean'], function(){
    return gulp.src('./app/assets/images/icons/**/*.svg')
        .pipe(svgSprite(config))
        .pipe(gulp.dest('./app/temp/sprite/'));
});

// Depende de createSprite
// Copia o svg de temp para assets
gulp.task('copySpriteGraphic', ['createSprite'], function(){
	return gulp.src('./app/temp/sprite/css/**/*.svg')
		.pipe(gulp.dest('./app/assets/images/sprites'));
});

// Depende de createSprite
// Copia css, renomeia e salva na pasta assets
gulp.task('copySpriteCSS', ['createSprite'], function(){
    return gulp.src('./app/temp/sprite/css/*.css')
        .pipe(rename('_sprite.css'))
        .pipe(gulp.dest('./app/assets/styles/modules'));
});

// Deleta a pasta temp/sprite após copiar svg e css
gulp.task('endClean', ['copySpriteGraphic','copySpriteCSS'], function(){
	return del('./app/temp/sprite');
})

// Executa todas as tasks
gulp.task('icons', ['beginClean', 'createSprite', 'copySpriteGraphic','copySpriteCSS', 'endClean']);
