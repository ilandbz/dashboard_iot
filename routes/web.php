<?php


use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Laravel\Fortify\Http\Controllers\AuthenticatedSessionController;
use Inertia\Inertia;

// Raíz → login (sin Inertia)
Route::redirect('/', '/login')->name('home');
Route::get('/temperatura', function(){
    return 0;
})->name('home');

Route::get('/favicon.svg', function () {
    return response()->file(public_path('favicon.svg'));
});

// Logout Fortify
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

// SPA protegida
Route::middleware(['auth'])->group(function () {
    // (opcional) una ruta “dashboard” si la usas
    Route::get('/dashboard', fn () => view('spa'))->name('dashboard');
    // catch-all que monta TU SPA
    Route::view('/{any}', 'spa')->where('any', '^(?!api).*$');
});

// Healthcheck para tu AuthGate (si lo usas)
Route::get('/auth/check', function (Request $r) {
    return $r->user()
        ? response()->json(['ok' => 1])
        : response()->json(['ok' => 0], 401);
});