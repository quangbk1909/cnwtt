<?php

namespace App\Http\Controllers\Api;

use App\User;
use App\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\DB;

class AuthorController extends Controller
{
    public function getCurrentAuthor(){
        if (Auth::check()){
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
        else {
            return response() -> json(['status_logged_in'=>false]);
        }
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

    public function follow($userId){
        Auth::user()->authors()->attach($userId);
        return response() -> json(['status_follow' => true]);
    }

    public function unfollow($userId){
        Auth::user()->authors()->detach($userId);
        return response() -> json(['status_unfollow' => true]);
    }

    public function checkFollowedAuthor($userId){
        $rela = DB::table('author_follower')->where([
            ['author_id','=',$userId],
            ['follower_id','=',Auth::user()->id]
        ])->first();
        if(isset($rela->author_id)){
            return response() -> json(['check_relationship'=>true]);
        }else {
            return response() -> json(['check_relationship'=>false]);
        }
    }

    public function getNotifications(){
        if(Auth::check()){
            $notifications = Auth::user()->notifications;
            return response()->json($notifications);
        }
    }

    public function markAsRead(){
        if(Auth::check()){
            Auth::user()->notifications->markAsRead();
            return response()->json(['mark_as_read'=>true]);
        }else{
            return response()->json(['mark_as_read'=>flase]);
        }
    }


}
