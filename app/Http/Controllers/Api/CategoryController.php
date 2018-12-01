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

    public function getCategoryPost(Request $request){
        $nameCategory = Input::get('name');
        $category = Category::where('name',$nameCategory)->first();
        $categoryPost = $category->posts()->get();
        return response() -> json($categoryPost);
    }
}
