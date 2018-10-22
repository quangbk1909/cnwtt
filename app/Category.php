<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Category extends Model
{
    protected $table = 'categories';

    public function posts(){
    	return $this->belongsToMany('App\Post','post_category','category_id','post_id');
    }


    /*Nested set for category*/
    //add new branch
    public static function newBranch(Category $category){

    	$lastBranchRoot = Category::where('level','=',0)->orderBy('rgt','desc')->first();
    	$category->lft = $lastBranchRoot->rgt + 1;
    	$category->rgt = $category->lft + 1;
    	$category->level = 0;
    	$category->save();
    }

    // add new children
   	public function addChildren(Category $category){

   		$category->lft = $this->rgt;
   		$category->rgt = $this->rgt+1;
   		$category->level = $this->level + 1;

   		DB::table('categories')->where('lft', '>', $this->rgt)->increment('lft',2);
   		DB::table('categories')->where('rgt', '>', $this->rgt)->increment('rgt',2);
   		$this->rgt = $this->rgt + 2;

   		$category->save();
   		$this->save();		
   	}

   	//get all child of category
   	public function getAllChild(){
   		$category = Category::where([['lft','>',$this->lft],['rgt','<',$this->rgt]])->get();
   		return $category; 
   	}

   	//get parent above 1 level
   	public function currentParent(){
   		$parent = Category::where([['lft', '<', $this->lft],['rgt', '>', $this->rgt],['level', '=', $this->level - 1 ]])->first();
   		return $parent;
   	}

   	//check children of category
   	public function hasChildren(){
   		return ($this->rgt - $this->lft) == 1 ? false : true ;
   	}

   	//get children below 1 level of category
   	public function currentChild(){
   		return Category::where([['lft', '>', $this->lft],['rgt', '<', $this->rgt],['level', '=', $this->level + 1 ]])->orderBy('lft','asc')->get();
   	}

   	// delete category and children of its
   	public function remove(){

   		$childCategories = $this->getAllChild();
   		$totalDel = $childCategories->count() + 1;

   		DB::table('categories')->where('lft', '>', $this->rgt)->decrement('lft', $totalDel*2);
   		DB::table('categories')->where('rgt', '>', $this->rgt)->decrement('rgt',
   			 $totalDel*2);

   		foreach ($childCategories as $cCategory) {
   			$cCategory->delete();
   		}
   		$this->delete();
   	}

   	//move category and children of its into another category
   	public function move(Category $parent){
        $childList = $this->getAllChild();
        $totalMove = $childList->count() + 1;

        if ($this->rgt < $parent->rgt) {

            DB::table('categories')->where([['lft', '>', $this->rgt],['lft','<',$parent->rgt]])->decrement('lft', $totalMove*2);
            DB::table('categories')->where([['rgt', '>', $this->rgt],['rgt','<',$parent->rgt]])->decrement('rgt', $totalMove*2);

            $numberIncre =  $parent->rgt - 1 - $this->rgt;
            $levelChange = ($parent->level + 1) - $this->level;
            $this->lft += $numberIncre;
            $this->rgt += $numberIncre;
            $this->level += $levelChange;

            foreach ($childList as $child) {
                $child->lft += $numberIncre;
                $child->rgt += $numberIncre;
                $child->level += $levelChange;
                $child->save();
            }
            $this->save();
        } else {

            DB::table('categories')->where([['lft', '>', $parent->rgt],['lft','<',$this->lft]])->increment('lft', $totalMove*2);
            DB::table('categories')->where([['rgt', '>=', $parent->rgt],['rgt','<',$this->rgt]])->increment('rgt', $totalMove*2);

            $numberDecre = $this->lft - $parent->rgt;
            $levelChange = ($parent->level + 1) - $this->level;
            $this->lft -=  $numberDecre;
            $this->rgt -=  $numberDecre;
            $this->level += $levelChange;

            foreach ($childList as $child) {
                $child->lft -=  $numberDecre;
                $child->rgt -=  $numberDecre;
                $child->level += $levelChange;
                $child->save();
            }
            $this->save();
        }
   	}

    // move to new branch
    public function moveToNewBranch(){
        $childList = $this->getAllChild();
        $totalMove = $childList->count() + 1;

        DB::table('categories')->where('lft', '>', $this->rgt)->decrement('lft', $totalMove*2);
        DB::table('categories')->where('rgt', '>', $this->rgt)->decrement('rgt', $totalMove*2);

        $lastBranchRoot = Category::where('level','=',0)->orderBy('rgt','desc')->first();
        $numberIncre = $lastBranchRoot->rgt + 1 - $this->lft;
        $levelChange = 0 - $this->level;
        $this->lft += $numberIncre;
        $this->rgt += $numberIncre;
        $this->level += $levelChange;

        foreach ($childList as $child) {
            $child->lft += $numberIncre;
            $child->rgt += $numberIncre;
            $child->level += $levelChange;
            $child->save();
        }
        $this->save();         
    }


}
