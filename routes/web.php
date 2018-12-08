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



Route::group(['prefix' => 'admin'], function() {
	//Auth::login(User::find(31));
	Route::get('/', function(){
		return view('admin.dashboard');
	});

	Route::group(['prefix' => 'user'], function() {

	    Route::get('myprofile', 'UserController@getUserSetting');	
		Route::post('update-info', 'UserController@postUpdateInfo');
		Route::post('update-password', 'UserController@postUpdatePassword');
		Route::get('show', 'UserController@getShow');
		Route::get('permission/{id}','UserController@getPermission');
		Route::post('permission/{id}', 'UserController@postPermission');
		Route::get('update/{id}', 'UserController@getUpdate');
		Route::post('update/{id}', 'UserController@postUpdate');

		Route::get('ajax/changerole' , 'UserController@getChangeRole');
		Route::get('delete/{id}', 'UserController@getDelete');
		Route::post('delete/all','UserController@postDeleteAllBulked');

	});

	Route::group(['prefix' => 'post'], function() {

	    Route::get('show', 'PostController@getShow');
	    Route::get('create','PostController@getCreate');
	    Route::post('create', 'PostController@postCreate');
	    Route::get('edit/{id}', 'PostController@getEdit');
	    Route::post('edit/{id}', 'PostController@postEdit');
	    Route::get('delete/{id}', 'PostController@getDelete');
	    Route::post('delete/all', 'PostController@postDeleteAll');

	});

	Route::group(['prefix' => 'category'], function() {
	    
		Route::get('show', 'CategoryController@getShow');
		Route::get('create', 'CategoryController@getCreate');
		Route::post('create', 'CategoryController@postCreate');
		Route::get('edit/{id}', 'CategoryController@getEdit');
		Route::post('edit/{id}', 'CategoryController@postEdit');
		Route::get('delete/{id}', 'CategoryController@getDelete');

	});

	Route::group(['prefix' => 'role'], function() {
	    
		Route::get('show', 'RoleController@getShow');
		Route::get('create', 'RoleController@getCreate');
		Route::post('create', 'RoleController@postCreate');
		Route::get('edit/{id}', 'RoleController@getEdit');
		Route::post('edit/{id}', 'RoleController@postEdit');
		Route::get('delete/{id}', 'RoleController@getDelete');
		Route::

	});

    
});



