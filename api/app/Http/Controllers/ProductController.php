<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Thumbnail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    //
    public function index()
    {
        $puppies = Product::all();
        return response()->json($puppies);
    }

    public function arrivals(Request $request)
    {
        // Check the tab type from the request query
        $tab = $request->query('tab');

        if ($tab === 'New Arrivals') {
            // Fetch puppies created within the last month
            $puppies = Product::where('created_at', '>=', now()->subMonth())
                ->orderBy('created_at', 'desc')
                ->get();
        } elseif ($tab === 'Featured Puppies') {
            // Fetch puppies marked as featured
            $puppies = Product::where('is_featured', true)->get();
        } else {
            // Default: return all puppies
            $puppies = Product::all();
        }

        return response()->json($puppies);
    }



    public function store(Request $request)
    {
        $request->validate([
            'name' => 'string|max:255',
            'description' => 'string',
            'main_image' => 'nullable',
            'price' => 'nullable',
            'discount' => 'nullable',
            'category' => 'string|nullable',
        
            'is_featured' => 'required|boolean',
            'additionalImages.*' => 'nullable',
        ]);

        // Handle main image upload
        $mainImagePath = $request->file('main_image')->store('mainImage', 'uploads');
        // Create product
        $product = Product::create([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'discount' => $request->discount,
            'category' => $request->category,
            'main_image' => $mainImagePath,
            'is_featured' => $request->is_featured, // Ensure this is included
        ]);

        // Handle additional images upload
        if ($request->hasFile('additionalImages')) {
            foreach ($request->file('additionalImages') as $file) {
                $path = $file->store('additionalImg', 'uploads');
                Thumbnail::create([
                    'product_id' => $product->id,
                    'image_path' => $path,
                ]);
            }
        }

        return response()->json(['message' => 'Puppie added successfully', 'product' => $product], 201);
    }
    public function update(Request $request, $id)
    {
        $puppie = Product::findOrFail($id);

        $validatedData = $request->validate([
            'name' => 'required',
            'description' => 'nullable',
            'main_image' => 'nullable',
            'price' => 'nullable',
            'discount' => 'nullable',
            'category' => 'nullable',
            'additionalImages.*' => 'nullable',
        ]);
        $puppie->name = $validatedData['name'] ?? $puppie->name;
        $puppie->description = $validatedData['description'] ?? $puppie->description;
        $puppie->price = $validatedData['price'] ?? $puppie->price;
        $puppie->discount = $validatedData['discount'] ?? 0;
        $puppie->category = $validatedData['category'] ?? $puppie->category;
        
        // Handle main image update
        if ($request->hasFile('main_image')) {
            // Delete old image if exists
            if ($puppie->main_image) {
                Storage::delete($puppie->main_image);
            }
            // Save new main image
            $puppie->main_image = $request->file('main_image')->store('mainImage','uploads');
        }

        // Handle additional images update
        if ($request->hasFile('additionalImages')) {
            // Save new additional images
            foreach ($request->file('additionalImages') as $image) {
                $additionalImage = new Thumbnail();
                $additionalImage->product_id = $puppie->id;
                $additionalImage->image_path = $image->store('additionalImg','uploads');
                $additionalImage->save();
            }
        }
    
        $puppie->save();

        // Return a success response
        return response()->json([
            'message' => 'Product details updated successfully!',
            'puppie' => $puppie->load('images'),
        ]);
    }

    public function show($id)
    {
        $puppie = Product::with('images')->findOrFail($id);
        return response()->json($puppie);
    }

    public function destroy($id){

     $puppie = Product::find($id);
     if ($puppie) {
         $puppie->delete();
         return response()->json(['message' => 'product deleted'], 200);
     } else {
         return response()->json(['message' => 'product not found'], 404);
     }
        
    } 
}


