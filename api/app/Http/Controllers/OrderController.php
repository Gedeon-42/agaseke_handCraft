<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class OrderController extends Controller
{
    //
    public function store(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'street' => 'required|string',
            'district' => 'required|string',
            'sector' => 'required|string',
            'cell' => 'required|string',
            'phone' => 'required|string',
             'items'    => 'required|array',  
        ]);
    $total = collect($request->items)->sum(function ($item) {
        return $item['price'] * $item['quantity'];
    });
      $user = auth()->user();
        $order = Order::create([
            'user_id' => $user->id,
            'email' => $request->email,
            'street' => $request->street,
            'district' => $request->district,
            'sector' => $request->sector,
            'cell' => $request->cell,
            'phone' => $request->phone,
            'total_price' => $total,
            'status' => 'pending',
        ]);
   foreach ($request->items as $item) {
     
        if (!Product::where('id', $item['product_id'])->exists()) {
        return response()->json([
            'message' => "Product with ID {$item['product_id']} not found."
        ], 400);
    }
            $order->items()->create([
                'product_id' => $item['product_id'],
                'name'     => $item['name'],
                'image'    => $item['image'] ?? null,
                'quantity' => $item['quantity'],
                'price'    => $item['price'],
            ]);
        }

        Log::info($request->items);
        return response()->json(['message' => 'Order placed successfully', 'order' => $order], 201);
    }


    public function index()
    {
        $orders = Order::with(['items','user'])->get();
        return response()->json($orders);
    }
     public function myOrders()
    {
        $orders = Order::where('user_id', auth()->id())->with(['items','user'])->get();
        return response()->json($orders);
    }
}
