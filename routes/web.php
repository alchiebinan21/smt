<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('posts', [PostController::class, 'index']);
Route::get('posts/{id}', [PostController::class, 'show']);
Route::get('posts/{id}/comments', [CommentController::class, 'index']);

Route::group(['middleware' => 'auth'], function () {
    Route::get('/me/posts',[PostController::class, 'myPosts']);
    Route::resources([
        'posts.comment' => CommentController::class,
        'posts' => PostController::class,
    ], [
        'except' => ['index','show']
    ]);
});

Auth::routes();

Route::prefix('auth')->group(function() {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
});


Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
