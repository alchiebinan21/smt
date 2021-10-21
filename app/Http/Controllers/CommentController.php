<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\Comment as CommentResource;

class CommentController extends Controller
{

    public function index($id)
    {
        return CommentResource::collection(Comment::where('post_id', $id)->get());
    }

    public function create()
    {
        //

    }

    public function store(Request $request, $id)
    {
        //

        $comment = new Comment;
        $comment->post_id = $id;
        $comment->user_id = Auth::id();
        $comment->content = $request->content;
        $comment->save();

        return response()->json([
            'message' => 'Post created!',
            'data'  => new CommentResource($comment)
        ]);
    }

    public function show($id)
    {
        //
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id, $comment_id)
    {
        //

        $comment = Comment::where('id',$comment_id)->first();
        if (Auth::id() == $comment->user_id || Auth::id() == $comment->post()->user_id) {
            $comment->delete();
            $message = 'Successfully Deleted the Comment';
        } else {
            $message = 'Unauthorized to delete Comment';
        }


        return response()->json([
            'message' => $message,
        ]);
    }
}
