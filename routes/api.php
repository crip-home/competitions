<?php

use Illuminate\Routing\Router;

$this->resource('authenticate', 'Auth\\AuthenticateController', [
    'only' => ['index', 'store']
]);

$this->post('register', 'Auth\\RegisterController@register');
$this->post('password/email', 'Auth\\ForgotPasswordController@sendResetLinkEmail');
$this->post('password/reset', 'Auth\\ResetPasswordController@reset');

$this->resource('posts', 'PostController', ['only' => ['index', 'show']]);
$this->resource('teams.members', 'TeamMemberController', ['only' => ['index']]);
$this->resource('teams', 'TeamController', ['only' => ['show']]);

$this->group(['prefix' => 'user'], function (Router $route) {
    $route->get('messages/count/unread', 'User\\MessageController@countUnread');
    $route->get('messages/read/{message}', 'User\\MessageController@read');
    $route->post('messages/{message}/reply', 'User\\MessageController@reply');
    $route->resource('messages', 'User\\MessageController', [
        'only' => ['index', 'store']
    ]);

    $route->get('teams/members/invitations/{id}/confirm', 'User\\TeamInvitationController@confirm');
    $route->get('teams/members/invitations/{id}/decline', 'User\\TeamInvitationController@decline');

    $route->resource('team-members', 'User\\TeamMemberController', [
        'only' => ['show']
    ]);

    $route->resource('profile', 'User\\ProfileController', [
        'only' => ['index', 'show']
    ]);
});

$this->group(['prefix' => 'admin'], function (Router $route) {
    $route->get('users/search', 'Admin\\UserController@search')->name('users.search');
    $route->resource('users', 'Admin\\UserController', [
        'only' => ['show']
    ]);

    $route->resource('posts', 'Admin\\PostController', [
        'only' => ['index', 'store', 'show', 'update', 'destroy']
    ]);

    $route->resource('teams.members', 'Admin\\TeamMemberController', [
        'only' => ['index', 'store', 'show', 'update']
    ]);

    $route->resource('teams', 'Admin\\TeamController', [
        'only' => ['index', 'store', 'show', 'update']
    ]);

    $route->resource('competitions', 'Admin\\CompetitionController', [
        'only' => ['index', 'store']
    ]);
});
