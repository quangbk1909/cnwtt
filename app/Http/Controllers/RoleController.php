<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Role;
use App\Permission;

class RoleController extends Controller
{
    public function getShow(){
    	$roles = Role::all();
    	return view('admin.role.show', compact('roles'));

    }

    public function getCreate(){
    	$permissions = Permission::all();
    	return view('admin.role.create', compact('permissions'));
    }


}
