<?php

namespace App\Http\Controllers\api;

use App\Post;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PostController extends Controller
{

    public function getAllPost(){
        $allPost = Post::all();
        return response() -> json($allPost);
    }
}
