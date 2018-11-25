<?php

namespace App\Http\Controllers\Api;

use App\User;
use App\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

class AuthorController extends Controller
{
    public function getAuthorInfo(){
        $user = Auth::user();
        $allPostOfUser = Post::where('user_id',$user->id)->get();

        $userWithAllPost = array();
        $userWithAllPost["user_id"] = $user->id;
        $userWithAllPost["author_name"] = $user->name;
        $userWithAllPost["avatar"] = $user->image_link;
        $userWithAllPost["description"] = $user->description;
        $userWithAllPost["posts"] = $allPostOfUser;

        return response() -> json($userWithAllPost);
    }
}
