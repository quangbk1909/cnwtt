<?php

namespace App\Http\Controllers\Api;

use App\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Input;

class CategoryController extends Controller
{
    public function getMainCategory(){
        $mainCate = Category::where('level',1)->get();
        return response() -> json($mainCate);
    }

    public function getCategoryPostFromNewest($categoryID){
        $category = Category::find($categoryID);        
        $categoryPost = $category->posts()->orderBy('created_at','DESC')->get();
        return response() -> json($categoryPost);
    }

    public function getCategoryPostPopular($categoryID){
        $category = Category::find($categoryID);
        $categoryPost = $category->posts()->orderBy('vote_numbers','DESC')->get();
        return response() -> json($categoryPost);
    }

    public function getDescription($categoryID){
        $category = Category::find($categoryID);
        return response() -> json(
            [
                'id'=>$category->id,
                'name'=>$category->name,
                // 'description'=>$category->description
            ]
            );
    }
}
