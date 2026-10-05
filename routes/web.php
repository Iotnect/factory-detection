<?php

use App\Http\Controllers\LoginController;
use App\Http\Middleware\EnsureDemoAuthenticated;
use Illuminate\Support\Facades\Route;

Route::get('/', [LoginController::class, 'create'])
    ->name('login');

Route::post('/login', [LoginController::class, 'store'])
    ->name('login.store');

Route::post('/logout', [LoginController::class, 'destroy'])
    ->name('logout');

Route::middleware(EnsureDemoAuthenticated::class)->group(function () {
    Route::view('/dashboard', 'dashboard')->name('dashboard');

    Route::view('/mobile-phone-usage-detection', 'modules.show', [
        'title' => 'Mobile Phone Usage Detection',
        'description' => 'Monitor and review mobile phone usage detection activity.',
    ])->name('modules.mobile-phone-usage');

    Route::view('/leave-post-and-absence-detection', 'modules.show', [
        'title' => 'Leave Post and Absence Detection',
        'description' => 'Monitor leave-post events and absence detection activity.',
    ])->name('modules.leave-post-absence');

    Route::view('/camera-tracking', 'modules.show', [
        'title' => 'Camera Tracking',
        'description' => 'View camera locations and tracking activity.',
    ])->name('modules.camera-tracking');

    Route::view('/floorplan-route-tracking', 'modules.show', [
        'title' => 'Floorplan Route Tracking',
        'description' => 'View movement routes across the monitored floorplan.',
    ])->name('modules.floorplan-route-tracking');
});
