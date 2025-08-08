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

Route::resource('files', FileController::class)->only(["index", "show"]);

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('files', FileController::class)->except(["index", "show"]);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
