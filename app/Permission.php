<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    protected $table = 'permission';
    public $timestamp = false;

    public function users(){
    	return $this->belongsToMany('App\User','permission_user','permission_id','user_id');
    }

    public function roles(){
    	return $this->belongsToMany('App\Role','role_permission','permission_id','role_id');
    }
}
