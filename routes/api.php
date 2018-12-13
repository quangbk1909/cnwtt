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
    Auth::login(User::find(31));
    Route::group(['prefix' => 'post'], function(){

        Route::get('allPostByVote', 'Api\PostController@getAllPostByVote');
        Route::get('allPostByRandom', 'Api\PostController@getAllPostByRandom');
        Route::get('getComment/{post_id}', 'Api\PostController@getCommentByPostID');
        Route::get('saveComment/{post_id}', 'Api\PostController@saveComment');
        Route::get('getSinglePost/{post_id}', 'Api\PostController@getSinglePost');
        Route::post('vote/{post_id}', 'Api\PostController@vote');
        Route::get('recommendItem', 'Api\PostController@getRecommendItems');
    });
    Route::group(['prefix' => 'category'], function(){
        Route::get('allCate','Api\CategoryController@getMainCategory');
        Route::get('categoryPostFromNewest/{category_id}','Api\CategoryController@getCategoryPostFromNewest');
        Route::get('categoryPostPopular/{category_id}','Api\CategoryController@getCategoryPostPopular');
        Route::get('description/{category_id}','Api\CategoryController@getDescription');
    });
    Route::group(['prefix' => 'author'], function(){
        Route::get('getCurrentAuthor','Api\AuthorController@getCurrentAuthor');
        Route::get('getAuthorByID/{user_id}','Api\AuthorController@getAuthorByID');
        Route::get('checkUser','Api\AuthorController@checkUserExist');
    });
    Route::get('searchList','Api\PostController@search');
});


