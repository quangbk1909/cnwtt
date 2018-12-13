<?php

namespace App\Http\Controllers\Api;

use App\User;
use App\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Input;

class AuthorController extends Controller
{
    public function getCurrentAuthor(){
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
    
    public function checkUserExist(){
        if (Auth::check()){
            return response() -> json(['status_logged_in'=>true]);
        }
        else {
            return response() -> json(['status_logged_in'=>false]);
        }
    }

    public function getAuthorByID($userID){
        $allPostOfUser = Post::where('user_id',$userID)->get();
        $user = User::where('id',$userID)->first();

        $userWithAllPost = array();
        $userWithAllPost["user_id"] = $user->id;
        $userWithAllPost["author_name"] = $user->name;
        $userWithAllPost["avatar"] = $user->image_link;
        $userWithAllPost["description"] = $user->description;
        $userWithAllPost["posts"] = $allPostOfUser;

        return response() -> json($userWithAllPost);
    }
}
