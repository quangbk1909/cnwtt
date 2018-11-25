<?php

namespace App\Http\Controllers\Api;

use App\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CategoryController extends Controller
{
    public function getMainCategory(){
        $mainCate = Category::where('level',1)->get();
        return response() -> json($mainCate);
    }
}
