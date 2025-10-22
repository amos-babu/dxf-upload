<?php

namespace App\Http\Controllers;

use App\Models\Post;

class FileDownload extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Post $post)
    {
        $media = $post->getFirstMedia('dxf-files');

        if (! $media) {
            abort(404, 'File not found.');
        }

        $media->disk ?? 'private';
        $path = $media->getPath();

        if (! file_exists($path)) {
            abort(404, 'File not found.');
        }

        return response()->download($path, $media->file_name);
    }
}
