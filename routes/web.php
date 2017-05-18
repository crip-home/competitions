<?php

Route::get('/{subs?}', 'HomeController@index')->where(['subs' => '.*']);
