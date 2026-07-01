<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Support\Facades\Storage;

class FileDownload extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Post $post)
    {
        $media = $post->getFirstMedia('dxf-files');

        abort_if(! $media, 404, 'File not found.');

        $media->disk ?? 's3-private';
        $path = $media->getPath();

        return Storage::disk($media->disk)->download(
            $media->getPathRelativeToRoot(),
            $media->file_name
        );
    }
}
