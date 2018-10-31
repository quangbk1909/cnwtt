<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use App\User;
use App\Role;
use App\Permission;

class UserController extends Controller
{
    public function getUserSetting(){
    	return view('admin.user.setting');
    }

    public function postUpdateInfo(Request $request){
    	$user = Auth::user();
    	if(isset($request->name)){
    		$user->name = $request->name;
    	}
    	if($file = $request->file('image')){
    		$name = $user->id.'.'.$file->getClientOriginalExtension();
    		$user->image_link = 'assets/img/'.$name;

    		if (File::exists($user->image_link)) {
    			File::delete($user->image_link);
    			$file->move('assets/img',$name);
    		} else {
    			$file->move('assets/img',$name);    			
    		}
    	}
    	$user->save();
    	return redirect()->back()->with('success','Profile update successfully!');
    }

    public function postUpdatePassword(Request $request){
    	$user = Auth::user();

    	$request->validate([
    		'new_password' => 'required|min:6|confirmed',
    		'new_password_confirmation' => 'required|min:6'
    	],
    	[
    		'min' => ':attribute can not be less than :min characters',
    	],
    	[
    		'new_password' => 'New password'
    	]);

    	if (!Hash::check($request->old_password, $user->password)) {
    		return redirect()->back()->with('warning','Old password is incorrect.');
    	}else {
    		if (Hash::check($request->new_password, $user->password)) {
    			return redirect()->back()->with('warning','New password must be different old password ');
    		}else {
    			$user->password = Hash::make($request->new_password);
    			$user->save();
    			return redirect()->back()->with('success','Change password successfully');
    		}
    	}
    }

    public function getShow(){
        $users = User::all();
        return view('admin.user.show', compact('users'));
    }

    public function getPermission($id){
        $user = User::find($id);
        $roles = Role::all();
        $permissionNotInRole = Permission::all()->diff($user->role->permission);
        return view('user.permission',compact('user','roles','permissionNotInRole'));
    }

    public function postPermission(Request $request, $id){
        $user = User::find($id);

        $user->role_id = $request->role;
        $user->permission()->detach();
        $user->save();
        if($request->newPermission) {
            foreach ($request->newPermission as $idPermission) {
                $user->permission()->attach($idPermission);
            }
        }

        
       
        return redirect()->back()->with('success','Update permission user successfully!');


    }

    public function test(){
        dd(Auth::user()->hasPermission("category.view")) ;
    }

    public function getChangeRole(Request $request){
        $user  = User::find($request->idUser);
        $role = Role::find($request->idRole);
        $data = "";
        if ($role->slug === 'admin') {
            $data = '<p>Administration has all permission</p>'; 
        } else {
            $permissionNotInRole = Permission::all()->diff($role->permission);
            $data = '<div class="form-control" style=" height: 200px; overflow-y: scroll;">';
            foreach ($user->permission as $permission) {
                $data .=    '<input type="checkbox" name="newPermission[]" value="'. $permission->id.'" checked="">'. $permission->action.' <br>';
            }
            foreach ($permissionNotInRole->diff($user->permission) as $permission) {
                $data .= '<input type="checkbox" name="newPermission[]" value="'.$permission->id.'"> '.$permission->action.'<br>';
            }
            $data .= '</div>';
        }


        return $data;
    }

}
