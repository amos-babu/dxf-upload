<?php

use App\Http\Controllers\FileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('welcome');
// })->name('home');

// Route::get('/', function () {
//     return Inertia::render('dashboard');
// })->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('files', FileController::class)->except(["index", "show"]);
});

Route::resource('files', FileController::class)->only(["show"]);
Route::get('/', [FileController::class, 'index'])->name('files.index');
Route::get('/image/{file}/download/', [FileController::class, 'imageDownload'])->name('image.download');
Route::get('/dxf/{file}/download/', [FileController::class, 'dxfDownload'])->name('dxf.download');

Route::fallback(function () {
    return Inertia::render('notfound');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
