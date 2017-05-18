<?php

Route::group(['prefix' => 'filemanager'], function () {
    Route::resource('api/crip-folders', Crip\Filesys\App\Controllers\FolderController::class);
    Route::resource('api/crip-files', Crip\Filesys\App\Controllers\FileController::class);
    Route::get('api/crip-tree', Crip\Filesys\App\Controllers\TreeController::class);
    Route::get('/', Crip\Filesys\App\Controllers\ManagerController::class);
});