<?php

namespace App\Http\Controllers;

use App\Http\Requests\FileUploadRequest;
use App\Models\File;
use Illuminate\Support\Facades\Auth;

class FileUploadController extends Controller
{
    /**
     * @param  \App\Http\Requests\FileUploadRequest|\Illuminate\Http\Request  $request
     */
    public function __invoke(FileUploadRequest $request)
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

        File::create($data);

        return to_route('files.index')->with('success', 'Uploaded successfully');
    }
}
