<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\Post as PostResource;
use Illuminate\Support\Facades\Auth;


class PostController extends Controller
{

    public function index()
    {
        //
        return PostResource::collection(Post::all());
    }

    public function myPosts()
    {
        //
        $id = Auth::id();
        $posts = Post::where('user_id', $id)->get();
        return PostResource::collection($posts);
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
        $post = Post::where('id',$id)
            ->with(['comments' => function ($query) use ($id) {
                $query->where('post_id', $id);
            },'comments.user'])
            ->first();

        return new PostResource($post);
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


        if (Auth::id() == $post->user_id) {
            $post->delete();
            $message = 'Post successfully deleted';
        } else {
            $message = 'Unauthorized to delete post';
        }

        return response()->json([
            'message' => $message
        ]);
    }
}
