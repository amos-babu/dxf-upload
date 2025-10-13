<?php

namespace App\Http\Controllers;

use App\Enums\Categories;
use App\Http\Requests\FileUploadRequest;
use App\Http\Resources\FileResource;
use App\Http\Resources\ShowFileResource;
use App\Models\File;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class FileController extends Controller
{
    public function index(Request $request): Response
    {
        $searchResults = File::search($request->query('q'))->get();
        $files = File::select('id', 'name', 'image', 'dxf_file')->latest()->paginate(9);

        return Inertia::render('dashboard', [
            'files' => FileResource::collection($files),
            // 'example' => File::getMedia("*"),
        ]);
    }

    public function create(): Response
    {
        $categoryOptions = collect(Categories::cases())->map(fn ($category) => [
            'name' => $category->label(),
            'value' => $category->value,
        ]);

        return Inertia::render('files/create', [
            'categoryOptions' => $categoryOptions,
        ]);
    }

    /**
     * @param  \App\Http\Requests\FileUploadRequest|\Illuminate\Http\Request  $request
     */
    public function store(FileUploadRequest $request): RedirectResponse
    {
        // $data = $request->validated();
        // $data['user_id'] = Auth::id();

        // if ($request->hasFile('image')) {
        //     $filePath = $request->file('image')->store('images', 'public');
        //     $data['image'] = $filePath;
        // }

        // if ($request->hasFile('dxf_file')) {
        //     $dxfFile = $request->file('dxf_file');
        //     $dxfFileName = time().'.dxf';
        //     $filePath = $dxfFile->storeAs('dxf_files', $dxfFileName, 'private');
        //     $data['dxf_file'] = $filePath;
        // }

        // File::create($data);

        // return to_route('files.index')->with('success', 'Uploaded successfully');

        $data = $request->validated();
        $data['user_id'] = Auth::id();
        $file = File::create($data);

        if ($request->hasFile('dxf_file')) {
            $file->addMedia($request->file('dxf_file'))->toMediaCollection('dxf_files', 'private');
        }

        if ($request->hasFile('image')) {
            $file->addMedia($request->file('image'))->toMediaCollection('images');
        }

        return to_route('files.index')->with('success', 'Uploaded successfully');
    }

    public function show(File $file): Response
    {
        return Inertia::render('files/show', [
            'file' => new ShowFileResource($file),
        ]);
    }

    public function imageDownload(File $file)
    {
        $path = Storage::disk('public')->path($file->image);

        if (! file_exists($path)) {
            abort(404, 'File not found.');
        }

        return response()->download($path, $file->original_name);
    }

    public function dxfDownload(File $file)
    {
        $path = Storage::disk('private')->path($file->dxf_file);

        if (! file_exists($path)) {
            abort(404, 'File not found.');
        }

        return response()->download($path, $file->original_name);

    }

    public function edit(File $file): Response
    {
        return Inertia::render('files/update');
    }

    public function search(Request $request)
    {
        $name = $request->query('name');
    }

    public function update(Request $request, File $file): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['nullable'],
            'description' => ['nullable'],
            'image' => ['nulllable', 'image'],
            'dxf_file' => ['nullable', 'file'],
        ]);

        if ($request->hasFile('image')) {
            $filePath = $request->file('image')->store('images', 'public');
            $data['image'] = $filePath;
        }

        if ($request->hasFile('dxf_file')) {
            $filePath = $request->file('dxf_file')->store('dxf_files', 'public');
            $data['dxf_file'] = $filePath;
        }

        $file->update($data);

        return to_route('files.index');
    }

    public function destroy(File $file): RedirectResponse
    {
        $file->delete();

        return to_route('files.index');
    }
}
