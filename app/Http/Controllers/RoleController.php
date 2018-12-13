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

    public function postCreate(Request $request){
    	$request->validate([
    		'name' => 'required|max:50|unique:roles',
    	],
    	[
            'max' => ':attribute can not be more than :max characters.',
            'unique' => ':attribute already exists.',
        ],
        [
        	'name' => 'Role name',
        ]
    	);
    	$role = new Role;
    	$role->name = $request->name;
    	$role->slug = strtolower($request->name);
    	$role->description = $request->description;
    	$role->save();
    	if($request->permission) {
            foreach ($request->permission as $idPermission) {
                $role->permission()->attach($idPermission);
            }
        }
        

        return redirect('admin/role/show')->with('success','Create new role successfully!');


    }

    public function getEdit($id){
    	$role = Role::find($id);
    	$permissions = Permission::all();
    	if($role){
    		return view('admin.role.edit', compact('role','permissions'));
    	}else{
    		return redirect('admin/role/show')->with('warning', 'No role has this id!');
    	}
    	
    	
    }

    public function postEdit(Request $request, $id){
    	$role = Role::find($id);
    	$role->name  = $request->name;
    	$role->description = $request->description;
    	$role->permission()->detach();
        $role->save();
        if($request->newPermission) {
            foreach ($request->newPermission as $idPermission) {
                $role->permission()->attach($idPermission);
            }
        }
        return redirect()->back()->with('success','Update role successfully!');

    }

    public function getDelete($id){
    	$role = Role::find($id);
    	if($role){
    		$users = $role->users;
    		foreach ($users as $user) {
    			$user->role_id = 3;
    			$user->save();
    		}

    		$role->delete();
    		return redirect()->back()->with('success','Delete role successfully!');
    	}else{
    		return redirect('admin/role/show')->with('warning','No such role!');
    	}
    }



}
