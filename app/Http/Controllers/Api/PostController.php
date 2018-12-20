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
        return response() -> json($responseArray);
    }

    public function search(){
        $textSearch = Input::get('textSearch');
        $posts = Post::search($textSearch)->get();
        $authors = User::search($textSearch)->get();
        $responsePost = array();

        // duyet tung thang post cho author vao
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

            array_push($responsePost,$arrayPost);
        }

        // duyet het tac gia cung voi nhung bai post
        $responseAuthor = array();
        foreach ($authors as $author){
            $allPostOfUser = Post::where('user_id',$author->id)->get();
            $userWithAllPost = array();
            $userWithAllPost["user_id"] = $author->id;
            $userWithAllPost["author_name"] = $author->name;
            $userWithAllPost["avatar"] = $author->image_link;
            $userWithAllPost["description"] = $author->description;
            $userWithAllPost["posts"] = $allPostOfUser;

            array_push($responseAuthor, $userWithAllPost);
        }
        
        return response() -> json(
            array(
                'posts'=>$responsePost,
                'authors'=>$responseAuthor
            )
        );

    }

    public function getCommentByPostID($postID){
        $allComment = Comment::where('post_id',$postID)->get();
        $responseArray = array();
        foreach ($allComment as $comment){
            $user = User::find($comment->user_id);

            $arrayPost = array();
            $arrayPost['id'] = $comment->id;
            $arrayPost['post_id'] = $comment->post_id;
            $arrayPost['user_id'] = $comment->user_id;
            $arrayPost['parent_id'] = $comment->parent_id;
            $arrayPost['content'] = $comment->content;
            $arrayPost['author'] = $user->name;
            $arrayPost['avatar'] = $user->image_link;

            array_push($responseArray,$arrayPost);
        }
        return response() -> json($responseArray);
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
            return response() -> json(
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
        $post->views = $post->views + 1;
        $post->save();
        $author = User::find($post->user_id);

        $recommendCategory = $post->categories()->get();
        
        return response() -> json(
            array(
                'post' => $post,
                'author' => $author,
                'recommendCategory' => $recommendCategory
            )
        );
    }

    public function upVote($postID){
        $post = Post::find($postID);
        $post->vote_numbers = $post->vote_numbers + 1;
        
        if ($post->save()){
            return response() -> json($post);
        }
    }

    public function downVote($postID){
        $post = Post::find($postID);
        $post->vote_numbers = $post->vote_numbers -1;
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
        return response() -> json($responseArray);
    }

    
}
