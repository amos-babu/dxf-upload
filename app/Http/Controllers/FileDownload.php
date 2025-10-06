<?php

namespace App\Http\Controllers;

use App\Models\File;
use Illuminate\Support\Facades\Storage;

class FileDownload extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(File $file)
    {
        $path = Storage::disk('private')->path($file->dxf_file);

        if (! file_exists($path)) {
            abort(404, 'File not found.');
        }

        return response()->download($path, $file->original_name);
    }
}
