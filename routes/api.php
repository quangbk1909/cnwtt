<?php

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/', function(){
    return view("Welcome");
});

Route::group(['prefix' => 'blog'], function(){
    Route::group(['prefix' => 'post'], function(){
        Route::get('allPost', 'Api\PostController@getAllPost');
    });
    Route::group(['prefix' => 'category'], function(){
        Route::get('allCate','Api\CategoryController@getMainCategory');
        Route::get('categoryPost','Api\CategoryController@getCategoryPost');
    });
    Route::group(['prefix' => 'author'], function(){
        Auth::login(User::find(31));
        Route::get('getCurrentAuthor','Api\AuthorController@getCurrentAuthor');
        Route::get('getAuthorByID','Api\AuthorController@getAuthorByID');
    });
    Route::get('searchList','Api\PostController@search');
});


