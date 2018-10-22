<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $table = 'comments';
    public $timestamp = false;

    public function user() {
    	return $this->belongsTo('App\User');
    }

    public function post() {
    	return $this->belongsTo('App\Post');
    }

    public function parentComment() {
    	return Comment::find($this->parent_id);
    }

    public function childrentComment() {
    	return Comment::where('parent_id','=',$this->id)->get();
    }
 
}
