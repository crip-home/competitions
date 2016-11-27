<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('authenticate', 'Auth\AuthenticateController@authenticate');
Route::resource('authenticate', 'Auth\AuthenticateController', ['only' => ['index']]);

$this->post('register', 'Auth\RegisterController@register');
$this->post('password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail');
$this->post('password/reset', 'Auth\ResetPasswordController@reset');