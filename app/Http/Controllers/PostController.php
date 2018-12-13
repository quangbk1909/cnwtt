<?php

namespace App\Http\Controllers;


use App\Post;
use App\Category;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Db;

class PostController extends Controller
{
	// show list post of user
    public function getShow(){
    	$user = Auth::user();
        if ( $user->inRole('admin')) {
            $posts = Post::orderBy('created_at','desc')->get();    
        } else {
             $posts = Post::where('user_id','=',$user->id)->orderBy('created_at','desc')->get();
        }
    	return view('admin.posts.show',compact('posts'));
    }


    // get create post view
    public function getCreate(){
    	$categories =  Category::all();
    	return view('admin.posts.create',compact('categories'));
    }

    // create new post
    public function postCreate(Request $request){

    	$request->validate([
    		'title' => 'required|unique:posts|max:255',
    		'content' =>'required',
    	]);

    	$post = new Post;
    	$categories = array();

    	if (isset($request->categories)) {
    		foreach ($request->categories as $idCategory) {
	    		$category = Category::find($idCategory);
	    		$categories[] = $category;
	    	}
    	}

    	$post->title = $request->title;
    	$post->content = $request->content;
    	$post->visibility = $request->visibility;
    	$post->status = $request->status;
    	$post->user_id = Auth::user()->id;

    	if ($file = $request->file('img')) {
    		$name = sha1(time()).'.'.$file->getClientOriginalExtension();
    		$post->image_path = 'assets/img/img_post/';
    		$post->image_name = $name;
    		$file->move($post->image_path,$name);
    	}

    	$post->save();
    	foreach ($categories as $category) {
    		$post->categories()->save($category);
    	}
    	return redirect()->back()->with('success', 'Create post successfully');
    }

    //get edit post view
    public function getEdit($id){
    	$user = Auth::user();
    	$post = Post::find($id);
    	$categories = Category::all();
    	
    	if (!isset($post)) {
    		return redirect('admin/post/show')->with('warning', 'User has no this post!');
    	} else if ($user->inRole('admin')) {
            return view('admin.posts.edit', compact('post','categories'));
        }else if ($post->user_id != $user->id ) {
    		return redirect('admin/post/show')->with('warning', 'User has no this post!');
    	}else {
	    	return view('admin.posts.edit', compact('post','categories'));	
    	}	
    }

    // edit post
    public function postEdit(Request $request,$id){
    	$request->validate([
    		'title' => 'required|max:255|unique:posts,title,'.$id,
    		'content' =>'required',
    	]);

    	$post = Post::find($id);

    	$post->title = $request->title;
    	$post->content = $request->content;
    	$post->visibility = $request->visibility;
    	$post->status = $request->status;

    	
    	if($file = $request->file('img')){
    		$name = sha1(time()).'.'.$file->getClientOriginalExtension();
    		if (File::exists($post->image_path.$post->image_name)) {
    			File::delete($post->image_path.$post->image_name);
    			$post->image_name = $name;
    			$file->move($post->image_path,$name);
    		} else {
    			$post->image_name = $name;
                $post->image_path = 'assets/img/img_post/';
    			$file->move($post->image_path,$name);			
    		}
    	}

    	$oldCategories = collect();
    	foreach ($post->categories as $category) {
    		$oldCategories->push(Category::find($category->id));
    	}

    	$newCategories = collect();
    	if (isset($request->categories)) {
    		foreach ($request->categories as $idCategory) {
	    		$newCategories->push(Category::find($idCategory)) ;
	    	}
    	}

    	if ($oldCategories->diff($newCategories)->count()) {
    		foreach ($oldCategories->diff($newCategories) as $category) {
    			DB::table('post_category')->where([
    				['category_id','=',$category->id],
    				['post_id','=',$post->id],
    			])->delete();
    		}
    	}

    	if ($newCategories->diff($oldCategories)->count()) {
    		foreach ($newCategories->diff($oldCategories) as $category) {
    			$post->categories()->attach($category->id);
    		}
    	}  

    	$post->save();

    	return redirect()->back()->with('success', 'Edit post successfully!');
    	
    }

    public function getDelete($id){
        $user = Auth::user();
        $post = Post::find($id);
        
        if (!isset($post)) {
            return redirect('admin/post/show')->with('warning', 'User has no this post!');
        } else if ($user->inRole('admin')) {
            $post->delete();
            return redirect()->back()->with('success' ,'Delete post successfully!');
        }else if ($post->user_id != $user->id ) {
            return redirect('admin/post/show')->with('warning', 'User has no this post!');
        }else {
            $post->delete();
            return redirect()->back()->with('success' ,'Delete post successfully!');   
        }
    }

    public function postDeleteAll(Request $request){
        if ($request->bulked) {
            foreach ($request->bulked as $idPost) {
                $post = Post::find($idPost);
                $post->delete();
            }
            return redirect()->back()->with('success' ,'Delete all post selected sucessfully!');
        } else {
            return redirect()->back()->with('warning', 'Select post before click delete');
        }
    }

    public function getDataPoint(){
        $posts = Post::all();
        $dateCreatedPosts = array();
        $dataPoints = array();
        foreach ($posts as $post) {
            $dateCreatedPosts[] = substr($post->created_at, 0, 10);
        }

        foreach (array_count_values($dateCreatedPosts) as $key =>$value){
            $data = (object) array('date' => $key, 'number' =>$value); 
            $dataPoint[] = $data;
        };

        return json_encode($dataPoint);
    }

}
