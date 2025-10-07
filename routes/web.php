<?php

use App\Http\Controllers\FileController;
use App\Http\Controllers\FileDownload;
use App\Http\Controllers\ImageDownload;
use App\Http\Middleware\AdminMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('files', FileController::class)->except(['index', 'show']);
});

Route::resource('files', FileController::class)->only(['show']);
Route::get('/', [FileController::class, 'index'])->name('files.index');
Route::get('/image/{file}/download/', [ImageDownload::class])->name('image.download');
Route::get('/dxf/{file}/download/', [FileDownload::class])->name('dxf.download');
// ->middleware(AdminMiddleware::class)
Route::fallback(function () {
    return Inertia::render('notfound');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
