<?php

namespace App\Http\Controllers\Api;

use App\User;
use App\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Input;

class CategoryController extends Controller
{
    public function getMainCategory(){
        $mainCate = Category::where('level', 0)->get();
        return response() -> json($mainCate);
    }

    public function getCategoryPostFromNewest($categoryID){
        $category = Category::find($categoryID);        
        $categoryPost = $category->posts()->orderBy('created_at','DESC')->get();
        $responseArray = array();
        foreach ($categoryPost as $post){
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

    public function getCategoryPostPopular($categoryID){
        $category = Category::find($categoryID);
        $categoryPost = $category->posts()->orderBy('vote_numbers','DESC')->get();
        $responseArray = array();
        foreach ($categoryPost as $post){
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

    public function getDescription($categoryID){
        $category = Category::find($categoryID);
        return response() -> json(
            [
                'id'=>$category->id,
                'name'=>$category->name,
                'description'=>$category->description
            ]
            );
    }
}
