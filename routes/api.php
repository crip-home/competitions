<?php

$this->post('authenticate', 'Auth\\AuthenticateController@authenticate');
$this->resource('authenticate', 'Auth\\AuthenticateController', ['only' => ['index']]);

$this->post('register', 'Auth\\RegisterController@register');
$this->post('password/email', 'Auth\\ForgotPasswordController@sendResetLinkEmail');
$this->post('password/reset', 'Auth\\ResetPasswordController@reset');

Route::resource('posts', 'PostsController',
    ['only' => ['index', 'show']]);

Route::resource('admin/posts', 'Admin\\PostsController', ['only' => ['index', 'store', 'show', 'update', 'destroy']]);
Route::resource('admin/teams', 'Admin\\TeamsController', ['only' => ['index']]);