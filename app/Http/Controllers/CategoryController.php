<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Category;

class CategoryController extends Controller
{

   	public function getShow(){
   		$categories = Category::all();
   		$categoryRoots = Category::where('level','=',0)->orderBy('lft','asc')->get();
   		return view('admin.category.show', compact('categories','categoryRoots'));   	}

   	public function getCreate(){
   		$categoryRoots = Category::where('level','=',0)->orderBy('lft','asc')->get();
   		$categories = Category::all();
   		return view('admin.category.create',compact('categories','categoryRoots'));
   	}

   	public function getEdit($id){
   		$categoryRoots = Category::where('level','=',0)->orderBy('lft','asc')->get();
   		$categories = Category::all();
   		$cCategory = Category::find($id);
   		$parentCategory = $cCategory->currentParent();
   		return view('admin.category.edit',compact('categoryRoots','categories','cCategory','parentCategory'));
   	}

      public function postCreate(Request $request){

         $request->validate([
            'name' => 'required|unique:categories|max:40',
         ]);

         $category = new Category;
         $category->name = $request->name;
         $category->save();

         if ($request->category_parent == 0) {
            Category::newBranch($category);
         } else {
            $categoryParent = Category::find($request->category_parent);
            $categoryParent->addChildren($category);
         }

         return redirect()->back()->with('success', 'Create new category successfully!');
      }

      public function postEdit(Request $request, $id){

         
        // return $request->categories;
         $request->validate([
            'name' => 'required|max:40|unique:categories,name,'.$id,
         ]);

         $category = Category::find($id);
         $category->name = $request->name;

         if ($category->currentParent() != null) {
            if ($request->category_parent == 0) {
               $category->moveToNewBranch();
            } else if ($request->category_parent != $category->currentParent()->id) {
               $parent = Category::find($request->category_parent);
               $category->move($parent);
            }
         } else {
            if ($request->category_parent != 0) {
               $parent = Category::find($request->category_parent);
               $category->move($parent);
            }
         }

         $category->save();
         return redirect()->back()->with('success', 'Edit category successfully!');

      }

      public function getDelete($id){
         $category = Category::find($id);
         $category->remove();
         return redirect()->back()->with('success','Delete category successfully!');
      }

}
