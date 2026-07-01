<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BucketTest extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke()
    {
        try {
            Storage::disk('s3-public')->put('hello.txt', 'Hello from Laravel!');

            return 'Upload completed';
        } catch (\Throwable $e) {
            return [
                'message' => $e->getMessage(),
                'previous' => $e->getPrevious()?->getMessage(),
                'class' => get_class($e),
                'previous_class' => $e->getPrevious() ? get_class($e->getPrevious()) : null,
            ];
        }
    }
}
