<?php

namespace App\Http\Controllers\api;

use App\Post;
use App\User;
use App\Comment;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PostController extends Controller
{

    public function getAllPost(){
        $allPost = Post::all();
        $responseArray = array();
        foreach ($allPost as $post){
            $userOfPost = User::where('id',$post->user_id)->first();

            $arrayPost = array();
            $arrayPost["post_id"] = $post->id;
            $arrayPost["title"] = $post->title;
            $arrayPost["content"] = $post->content;
            $arrayPost["date_created"] = $post->created_at;
            $arrayPost["image_post"] = $post->image_name;
            $arrayPost["author_id"] = $userOfPost->id;
            $arrayPost["author_name"] = $userOfPost->name;
            $arrayPost["avatar"] = $userOfPost->image_link;

            array_push($responseArray,$arrayPost);
        }
        // json_encode($responseArray);
        return response() -> json($responseArray);
    }

    public function search(){
        $textSearch = Input::get('textSearch');
        $posts = Post::search($textSearch)->get();
        return response() -> json($posts);
    }

    public function getCommentByPostID($postID){
        $allComment = Comment::where('post_id',$postID)->get();
        return response() -> json($allComment);
    }

    public function saveComment($postID){
        $parentID = Input::get('parent_id');
        $userID = Auth::id();
        $content = Input::get('content');
        
        $comment = new Comment;
        $comment->timestamps = false;
        $comment->user_id = $userID;
        $comment->content = $content;
        $comment->post_id = $postID;
        $comment->parent_id= $parentID;
        $comment->save();
    }

    public function getSinglePost($postID){
        $post = Post::find($postID);
        $post->view = $post->view + 1;
        $post->save();
        return response() -> json($post);
    }
}
