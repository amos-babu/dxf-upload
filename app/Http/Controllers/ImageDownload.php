<?php

namespace App\Http\Controllers;

use App\Models\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImageDownload extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(File $file)
    {
        $path = Storage::disk('public')->path($file->image);

        if (! file_exists($path)) {
            abort(404, 'File not found.');
        }

        return response()->download($path, $file->original_name);
    }
}
