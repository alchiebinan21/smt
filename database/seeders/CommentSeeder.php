<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $user = User::first();

        $posts = Post::get()->take(2);

        foreach ($posts as $post) {
            $comments = Comment::factory()->count(2)->make([
                'user_id' => $user->id,
                'post_id' => $post->id
            ]);

            foreach ($comments as $comment) {
                $comment->save();
            }
        }

    }
}
