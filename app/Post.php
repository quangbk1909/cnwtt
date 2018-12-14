<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    // use this for full text search
    use FullTextSearchTrait;
    protected $searchable = [
        'title',
    ];

    // define for relationship
    protected $table = "posts";

    public function categories(){
    	return $this->belongsToMany('App\Category','post_category','post_id','category_id');
    }

    public function comments(){
        return $this->hasMany('App\Comment');
    }

    public function user(){
    	return $this->belongsTo('App\User');
    }
}
