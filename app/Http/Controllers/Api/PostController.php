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

    public function getAllPostByVote(){
        $allPost = Post::orderBy('vote_numbers','DESC')->get();
        $responseArray = array();
        foreach ($allPost as $post){
            $userOfPost = User::where('id',$post->user_id)->first();

            $arrayPost = array();
            $arrayPost["post_id"] = $post->id;
            $arrayPost["title"] = $post->title;
            $arrayPost["content"] = $post->content;
            $arrayPost["date_created"] = $post->created_at;
            $arrayPost["vote"] =$post->vote_numbers;
            $arrayPost["image_post"] = $post->image_name;
            $arrayPost["author_id"] = $userOfPost->id;
            $arrayPost["author_name"] = $userOfPost->name;
            $arrayPost["avatar"] = $userOfPost->image_link;

            array_push($responseArray,$arrayPost);
        }
        // json_encode($responseArray);
        return response() -> json($responseArray);
    }

    public function getAllPostByRandom(){
        $allPost = Post::inRandomOrder()->get();
        $responseArray = array();
        foreach ($allPost as $post){
            $userOfPost = User::where('id',$post->user_id)->first();

            $arrayPost = array();
            $arrayPost["post_id"] = $post->id;
            $arrayPost["title"] = $post->title;
            $arrayPost["content"] = $post->content;
            $arrayPost["date_created"] = $post->created_at;
            $arrayPost["vote"] =$post->vote_numbers;
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
        $authors = User::search($textSearch)->get();
        return response() -> json(
            array(
                'posts'=>$posts,
                'authors'=>$authors
            )
        );
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
        if ($comment->save()){
            return json(
                array(
                    'success' => true
                )
            );
        }
        else {
            return json(
                array(
                    'success' => false
                )
            );
        }
    }

    public function getSinglePost($postID){
        $post = Post::find($postID);
        $post->view = $post->view + 1;
        $post->save();
        $author = User::find($post->user_id);
        return response() -> json(
            array(
                'post' => $post,
                'author' => $author
            )
        );
    }

    public function vote($postID){
        $post = Post::find($postID);
        $post->vote_numbers = $post->vote_numbers + 1;
        if ($post->save()){
            return response() -> json($post);
        }     
    }

    public function getRecommendItems(){
        $posts = Post::inRandomOrder()->take(3)->get();
        $responseArray = array();
        foreach ($posts as $post){
            $userOfPost = User::where('id',$post->user_id)->first();

            $arrayPost = array();
            $arrayPost["post_id"] = $post->id;
            $arrayPost["title"] = $post->title;
            $arrayPost["content"] = $post->content;
            $arrayPost["date_created"] = $post->created_at;
            $arrayPost["vote"] =$post->vote_numbers;
            $arrayPost["image_post"] = $post->image_name;
            $arrayPost["author_id"] = $userOfPost->id;
            $arrayPost["author_name"] = $userOfPost->name;
            $arrayPost["avatar"] = $userOfPost->image_link;

            array_push($responseArray,$arrayPost);
        }
        // json_encode($responseArray);
        return response() -> json($responseArray);
    }

    
}
