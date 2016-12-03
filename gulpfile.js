const elixir = require('laravel-elixir');

elixir(mix => {
    mix.sass('app.scss');
    mix.copy('./node_modules/ckeditor', './public/ckeditor');
});
