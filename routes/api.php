<?php

use Illuminate\Http\Request;

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
});