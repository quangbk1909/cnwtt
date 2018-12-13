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

Route::get('/', function () {
    return redirect('admin');
});


Route::get('test', 'Controller@test');

Route::get('register', 'Auth\RegisterController@getRegistration');
Route::post('register', 'Auth\RegisterController@register');
Route::get('user/verify/{token}', 'Auth\RegisterController@verifyUser');

Route::get('login', 'Auth\LoginController@getLogin');
Route::post('login', 'Auth\LoginController@postLogin');
Route::get('logout', 'Auth\LoginController@logout');

Route::get('reset-account', 'Auth\ForgotPasswordController@showLinkResetForm');
Route::post('reset-account', 'Auth\ForgotPasswordController@sendResetLinkEmail');
Route::get('change-password/{token?}', 'Auth\ResetPasswordController@showResetForm');
Route::post('change-password', 'Auth\ResetPasswordController@changePassword');



Route::group(['prefix' => 'admin', 'middleware' => 'admin'], function() {
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
		Route::get('update/{id}', 'UserController@getUpdate')->middleware('can:user.update');
		Route::post('update/{id}', 'UserController@postUpdate');

		Route::get('ajax/changerole' , 'UserController@getChangeRole');
		Route::get('delete/{id}', 'UserController@getDelete')->middleware('can:user.delete');
		Route::post('delete/all','UserController@postDeleteAllBulked')->middleware('can:user.delete');

		Route::get('data-point','UserController@getDataPoint');


	});

	Route::group(['prefix' => 'post'], function() {

	    Route::get('show', 'PostController@getShow')->middleware('can:post.view');
	    Route::get('create','PostController@getCreate')->middleware('can:post.create');
	    Route::post('create', 'PostController@postCreate');
	    Route::get('edit/{id}', 'PostController@getEdit')->middleware('can:post.update');
	    Route::post('edit/{id}', 'PostController@postEdit');
	    Route::get('delete/{id}', 'PostController@getDelete')->middleware('can:post.delete');
	    Route::post('delete/all', 'PostController@postDeleteAll');
	    Route::get('data-point','PostController@getDataPoint')->middleware('can:post.delete');


	});

	Route::group(['prefix' => 'category'], function() {
	    
		Route::get('show', 'CategoryController@getShow')->middleware('can:category.view');
		Route::get('create', 'CategoryController@getCreate')->middleware('can:category.create');
		Route::post('create', 'CategoryController@postCreate');
		Route::get('edit/{id}', 'CategoryController@getEdit')->middleware('can:category.update');
		Route::post('edit/{id}', 'CategoryController@postEdit');
		Route::get('delete/{id}', 'CategoryController@getDelete')->middleware('can:category.delete');

	});

	Route::group(['prefix' => 'role'], function() {
	    
		Route::get('show', 'RoleController@getShow')->middleware('can:role.view');
		Route::get('create', 'RoleController@getCreate')->middleware('can:role.create');
		Route::post('create', 'RoleController@postCreate');
		Route::get('edit/{id}', 'RoleController@getEdit')->middleware('can:role.update');
		Route::post('edit/{id}', 'RoleController@postEdit');
		Route::get('delete/{id}', 'RoleController@getDelete')->middleware('can:role.delete');

	});

	Route::get('statistical', 'UserController@getStatistical')->middleware('can:statistical');

    
});



Route::view('{path?}', 'welcome')
     ->where('path', '.*')
     ->name('react');

