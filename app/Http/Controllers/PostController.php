<?php

namespace App\Http\Controllers;

use App\Enums\Categories;
use App\Http\Requests\PostUploadRequest;
use App\Http\Resources\PostResource;
use App\Http\Resources\ShowFileResource;
use App\Models\File;
use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    public function index(Request $request): Response
    {
        $searchResults = Post::search($request->query('q'))->get();
        // $files = File::select('id', 'name', 'image', 'dxf_file')->latest()->paginate(9);
        $files = Post::with('media')->latest()->paginate(9);

        return Inertia::render('dashboard', [
            'files' => PostResource::collection($files),
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
     * @param  \App\Http\Requests\PostUploadRequest|\Illuminate\Http\Request  $request
     */
    public function store(PostUploadRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $data['user_id'] = Auth::id();

        $file = Post::create($data);

        if ($request->hasFile('dxf_file')) {
            $file->addMediaFromRequest('dxf_file')
                ->usingName($file->name)
                ->toMediaCollection('dxf-files', 'private');
        }

        if ($request->hasFile('image')) {
            $file->addMediaFromRequest('image')
                ->usingName($file->name)
                ->toMediaCollection('dxf-images');
        }

        return to_route('files.index')->with('success', 'Uploaded successfully');
    }

    public function show(Post $file): Response
    {
        return Inertia::render('files/show', [
            'file' => new ShowFileResource($file),
        ]);
    }

    public function imageDownload(Post $file)
    {
        $path = Storage::disk('public')->path($file->image);

        if (! file_exists($path)) {
            abort(404, 'File not found.');
        }

        return response()->download($path, $file->original_name);
    }

    public function dxfDownload(Post $file)
    {
        $path = Storage::disk('private')->path($file->dxf_file);

        if (! file_exists($path)) {
            abort(404, 'File not found.');
        }

        return response()->download($path, $file->original_name);

    }

    public function edit(Post $file): Response
    {
        return Inertia::render('files/update');
    }

    public function search(Request $request)
    {
        $name = $request->query('name');
    }

    public function update(Request $request, Post $file): RedirectResponse
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

    public function destroy(Post $file): RedirectResponse
    {
        $file->delete();

        return to_route('files.index');
    }
}
