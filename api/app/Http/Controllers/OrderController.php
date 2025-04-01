<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    //
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
            'location' => 'required|string',
            'address' => 'required|string',
        ]);

        $product = Product::findOrFail($request->puppie_id);

        $order = Order::create([
            'user_id' => auth()->id(),
            'product_id' => $product->id,
            'location' => $request->location,
            'address' => $request->address,
            'quantity' => $request->quantity,
            'total_price' => $product->price * $request->quantity,
            'status' => 'pending',
        ]);

        return response()->json(['message' => 'Order placed successfully', 'order' => $order], 201);
    }

    
    public function index()
    {
        $orders = Order::where('user_id', auth()->id())->with('product')->get();

        return response()->json(['orders' => $orders]);
    }
}
