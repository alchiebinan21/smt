<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use App\Http\Resources\Post as PostResource;


class PostController extends Controller
{
    public function index()
    {
        //
        return PostResource::collection(Post::all());
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
        $request->validate([
            'title' => 'required',
            'content' => 'required',
        ]);

        $post = new Post;
        $post->title = $request->title;
        $post->user_id = 1;
        $post->content = $request->content;
        $post->save();

        return response()->json([
            'message' => 'Post created!',
            'data'  => new PostResource($post)
        ]);
    }

    public function show($id)
    {
        //
    }

    public function edit($id)
    {
        //
        return new PostResource(Post::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        //
        //
        $request->validate([
            'title' => 'required',
            'content' => 'required',
        ]);

        $post = Post::findOrFail($id);
        $post->title = $request->title;
        $post->content = $request->content;
        $post->save();

        return response()->json([
            'message' => 'Post updated!',
            'data'  => new PostResource($post)
        ]);
    }

    public function destroy($id)
    {
        //
        $post = Post::findOrFail($id);
        $post->delete();

        return response()->json([
            'message' => 'Post deleted!'
        ]);
    }
}
