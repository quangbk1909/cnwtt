<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
use App\User;

Route::get('/', function () {
    return view('welcome');
});


Route::get('test', 'Controller@test');


Route::group(['prefix' => 'admin'], function() {
	Auth::login(User::find(31));
	Route::get('/', function(){
		return view('admin.dashboard');
	});

	Route::group(['prefix' => 'user'], function() {

	    Route::get('myprofile', 'UserController@getUserSetting');	
		Route::post('update-info', 'UserController@postUpdateInfo');
		Route::post('update-password', 'UserController@postUpdatePassword');
		Route::get('show', 'UserController@getShow')->middleware('can:user.view');
		Route::get('permission/{id}','UserController@getPermission')->middleware('can:user.authorize');
		Route::post('permission/{id}', 'UserController@postPermission');
		Route::get('ajax/changerole' , 'UserController@getChangeRole');


	});

	Route::group(['prefix' => 'post'], function() {

	    Route::get('show', 'PostController@getShow')->middleware('can:post.view');
	    Route::get('create','PostController@getCreate')->middleware('can:post.create');
	    Route::post('create', 'PostController@postCreate');
	    Route::get('edit/{id}', 'PostController@getEdit')->middleware('can:post.update');
	    Route::post('edit/{id}', 'PostController@postEdit');
	    Route::get('delete/{id}', 'PostController@getDelete')->middleware('can:post.delete');
	    Route::post('delete/all', 'PostController@postDeleteAll')->middleware('can:post.delete');

	});

	Route::group(['prefix' => 'category'], function() {
	    
		Route::get('show', 'CategoryController@getShow')->middleware('can:category.view');
		Route::get('create', 'CategoryController@getCreate')->middleware('can:category.create');
		Route::post('create', 'CategoryController@postCreate');
		Route::get('edit/{id}', 'CategoryController@getEdit')->middleware('can:category.update');
		Route::post('edit/{id}', 'CategoryController@postEdit');
		Route::get('delete/{id}', 'CategoryController@getDelete')->middleware('can:category.delete');


	});

    
});

//
//Route::get('post/1', function() {
//    return view('welcome');
//});


Route::view('{path?}', 'welcome')
     ->where('path', '.*')
     ->name('react');
