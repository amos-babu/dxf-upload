<?php

use App\Http\Controllers\FileDownload;
use App\Http\Controllers\ImageDownload;
use App\Http\Controllers\PostController;
use App\Http\Middleware\AdminMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('posts', PostController::class)->except(['index', 'show']);
    Route::get('/dxf/{post}/download/', FileDownload::class)->name('dxf.download');
    Route::get('/image/{post}/download/', ImageDownload::class)->name('image.download');
});

Route::get('/', [PostController::class, 'index'])->name('posts.index');
Route::resource('posts', PostController::class)->only(['show']);
Route::get('/search', [PostController::class, 'search'])->name('search');

// ->middleware(AdminMiddleware::class)

Route::fallback(function () {
    return Inertia::render('notfound');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
