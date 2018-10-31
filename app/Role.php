<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected $table = "roles";
    public $timestamp = false;

    public function permission(){
    	return $this->belongsToMany('App\Permission','role_permission','role_id','permission_id');
    }

    public function users(){
    	return $this->hasMany('App\User','role_id','id');
    }
}
