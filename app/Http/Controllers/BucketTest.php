<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BucketTest extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke()
    {
        return [
            'url' => request()->url(),
            'scheme' => request()->getScheme(),
            'secure' => request()->isSecure(),
            'full_url' => request()->fullUrl(),
        ];
    }
}
