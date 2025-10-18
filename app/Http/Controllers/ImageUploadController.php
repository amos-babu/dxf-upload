<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostUploadRequest;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;

class FileUploadController extends Controller
{
    /**
     * @param  \App\Http\Requests\PostUploadRequest|\Illuminate\Http\Request  $request
     */
    public function __invoke(PostUploadRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = Auth::id();

        if ($request->hasFile('image')) {
            $filePath = $request->file('image')->store('images', 'public');
            $data['image'] = $filePath;
        }

        if ($request->hasFile('dxf_file')) {
            $dxfFile = $request->file('dxf_file');
            $dxfFileName = time().'.dxf';
            $filePath = $dxfFile->storeAs('dxf_files', $dxfFileName, 'private');
            $data['dxf_file'] = $filePath;
        }

        Post::create($data);

        return to_route('posts.index')->with('success', 'Uploaded successfully');
    }
}
