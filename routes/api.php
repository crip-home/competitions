<?php

Route::post('authenticate', 'Auth\AuthenticateController@authenticate');
Route::resource('authenticate', 'Auth\AuthenticateController', ['only' => ['index']]);

$this->post('register', 'Auth\RegisterController@register');
$this->post('password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail');
$this->post('password/reset', 'Auth\ResetPasswordController@reset');