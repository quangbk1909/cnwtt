<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;
    use FullTextSearchTrait;
    protected $searchable = [
        'name',
    ];
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'username', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function verifyUser(){
        return $this->hasOne('App\VerifyUser');
    }

    public function passwordReset(){
        return $this->hasOne('App\PasswordReset','email','email');
    }

    public function role(){
        return $this->belongsTo('App\Role','role_id','id');
    }

    public function permission(){
        return $this->belongsToMany('App\Permission','permission_user','user_id','permission_id');
    }

    public function hasPermission(string $permission) :bool {

        if ($this->role) {
            foreach ($this->role->permission as $rolePermission) {
                if ($rolePermission->slug === $permission) {
                    return true;
                }
            }
        } 

        if ($this->permission) {
            foreach ($this->permission as $userPermission) {
                if ($userPermission->slug === $permission) {
                    return true;
                }
            }
        } 

        return false;
    }

    public function inRole(string $role){
        return $this->role()->where('slug', $role)->count() == 1;
    }
}
