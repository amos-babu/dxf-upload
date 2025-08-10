<?php

use App\Http\Controllers\FileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('welcome');
// })->name('home');

Route::get('/', function () {
    return Inertia::render('dashboard');
})->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('files', FileController::class)->except(["index", "show"]);
});

Route::resource('files', FileController::class)->only(["index", "show"]);

Route::fallback(function () {
    return Inertia::render('notfound');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
