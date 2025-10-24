<?php

namespace App\Http\Controllers;

use App\Enums\Categories;
use App\Http\Requests\PostUploadRequest;
use App\Http\Resources\PostResource;
use App\Http\Resources\ShowPostResource;
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
        // $searchResults = Post::search($request->query('q'))->get();
        $posts = Post::with('media')->latest()->paginate(12);

        return Inertia::render('dashboard', [
            'posts' => PostResource::collection($posts),
        ]);
    }

    public function create(): Response
    {
        $categoryOptions = collect(Categories::cases())->map(fn ($category) => [
            'name' => $category->label(),
            'value' => $category->value,
        ]);

        return Inertia::render('posts/create', [
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

        $post = Post::create($data);

        if ($request->hasFile('dxf_file')) {
            $post->addMediaFromRequest('dxf_file')
                ->usingName($post->name)
                ->toMediaCollection('dxf-files', 'private');
        }

        if ($request->hasFile('image')) {
            $post->addMediaFromRequest('image')
                ->usingName($post->name)
                ->toMediaCollection('dxf-images');
        }

        return to_route('posts.index')->with('success', 'Uploaded successfully');
    }

    public function show(Post $post): Response
    {
        $post->load('media');

        return Inertia::render('posts/show', [
            'post' => new ShowPostResource($post),

        ]);
    }

    public function imageDownload(Post $post)
    {
        $path = Storage::disk('public')->path($post->image);

        if (! file_exists($path)) {
            abort(404, 'File not found.');
        }

        return response()->download($path, $post->original_name);
    }

    public function dxfDownload(Post $post)
    {
        $path = Storage::disk('private')->path($post->dxf_file);

        if (! file_exists($path)) {
            abort(404, 'File not found.');
        }

        return response()->download($path, $post->original_name);

    }

    public function edit(Post $post): Response
    {
        return Inertia::render('posts/update', [
            'post' => new ShowPostResource($post),
        ]);
    }

    public function search(Request $request)
    {
        $query = $request->query('q');
        $searchResults = collect();

        if ($query) {
            $searchResults = Post::search($query)->get();
        }

        return Inertia::render('dashboard', [
            'posts' => PostResource::collection($searchResults),
            'filters' => ['q' => $query],
            'message' => $searchResults->isEmpty() ? 'No results found.' : null,
        ]);
    }

    public function update(Request $request, Post $post): RedirectResponse
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

        $post->update($data);

        return to_route('posts.index');
    }

    public function destroy(Post $post): RedirectResponse
    {
        $post->delete();

        return to_route('posts.index');
    }
}
