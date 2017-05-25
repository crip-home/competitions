<?php

Route::group(['prefix' => 'filemanager', 'middleware' => 'jwt.auth'], function () {
    Route::resource('api/crip-folders', Crip\Filesys\App\Controllers\FolderController::class);
    Route::resource('api/crip-files', Crip\Filesys\App\Controllers\FileController::class);
    Route::get('api/crip-tree', Crip\Filesys\App\Controllers\TreeController::class);
    Route::get('/', Crip\Filesys\App\Controllers\ManagerController::class);
});

/*
// Make sure that each user have own dir for upload
$configValue = storage_path('app/public/' . Auth::user()->id);
config(['filesystems.disks.public.root' => $configValue]);
*/