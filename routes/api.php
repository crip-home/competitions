<?php

use Illuminate\Routing\Router;

$this->post('authenticate', 'Auth\\AuthenticateController@authenticate');
$this->resource('authenticate', 'Auth\\AuthenticateController', ['only' => ['index']]);

$this->post('register', 'Auth\\RegisterController@register');
$this->post('password/email', 'Auth\\ForgotPasswordController@sendResetLinkEmail');
$this->post('password/reset', 'Auth\\ResetPasswordController@reset');

$this->resource('posts', 'PostsController',
    ['only' => ['index', 'show']]);

$this->group(['prefix' => 'user'], function (Router $route) {
    $route->get('messages/read/{message}', 'User\\MessagesController@read');
    $route->get('messages/count/unread', 'User\\MessagesController@countUnread');
    $route->resource('messages', 'User\\MessagesController',
        ['only' => ['index', 'store']]);
});

$this->group(['prefix' => 'admin'], function (Router $route) {
    $route->get('users/search', 'Admin\\UsersController@search')->name('users.search');
    $route->resource('users', 'Admin\\UsersController',
        ['only' => ['show']]);

    $route->resource('posts', 'Admin\\PostsController',
        ['only' => ['index', 'store', 'show', 'update', 'destroy']]);

    $route->resource('teams.members', 'Admin\\TeamMembersController',
        ['only' => ['index', 'store', 'show', 'update']]);

    $route->resource('teams', 'Admin\\TeamsController',
        ['only' => ['index', 'store', 'show', 'update']]);
});
