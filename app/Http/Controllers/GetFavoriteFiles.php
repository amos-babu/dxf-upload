<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use Illuminate\Http\Request;

class GetFavoriteFiles extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $user = $request->user();
        $favoritePosts = $user->favoritePosts()
            ->with('media')
            ->orderByPivot('created_at', 'desc')
            ->paginate(12);

        return inertia('posts/favorite-files', [
            'favoritePosts' => PostResource::collection($favoritePosts),
        ]);
    }
}
