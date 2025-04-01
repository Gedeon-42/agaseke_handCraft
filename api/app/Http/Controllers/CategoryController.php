<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CategoryController extends Controller
{
    //
    public function index()
    {
        $categories = Category::all();
        return response()->json($categories);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string',
            'status' => 'required|string'
        ]);

        if ($request->hasFile('image')) {
            $validatedData['image'] = $request->file('image')->store('category_img', 'uploads');
        }
        $category = Category::create($validatedData);
        return response()->json($category, 201);
    }

    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);
        $validatedData = $request->validate([
            'name' => 'required|nullable',
            'status' => 'nullable'
        ]);
        $category->name = $validatedData['name'] ?? $category->name;
        $category->status = $validatedData['status'] ?? $category->status;

        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($category->image) {
                Storage::delete($category->image);
            }
            // Save new main image
            $category->image = $request->file('image')->store('category_img','uploads');
        }
        $category->save();
        return response()->json([
            'message'=>'updated successfully'
        ]);
    }


    public function destroy($id){

        $category = Category::find($id);
        if ($category) {
            $category->delete();
            return response()->json(['message' => 'category deleted'], 200);
        } else {
            return response()->json(['message' => 'category not found'], 404);
        }
           
       }
}
