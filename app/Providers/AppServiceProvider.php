<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
         if ($this->app->environment('production') || $this->app->environment('staging')) {
            URL::forceScheme('https');
        }

        RateLimiter::for('favorites', function (Request $request) {
            return Limit::perMinute(10)
                ->by(optional($request->user())->id ?? $request->ip())
                ->response(function () {
                    return redirect()->back()->withErrors(['favorite' => 'You are marking favorites too quickly. Please slow down.']);
                });
        });
    }
}
