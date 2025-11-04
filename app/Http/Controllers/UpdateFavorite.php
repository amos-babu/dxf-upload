<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class UpdateFavorite extends Controller
{
    public function __invoke(Request $request, Post $post)
    {
        $request->user()->favoritePosts()->toggle($post->id);

        return back();
    }
}
