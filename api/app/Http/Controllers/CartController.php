<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use Illuminate\Http\Request;

class CartController extends Controller
{
    //

    public function addToCart(Request $request)
    {
        $user = auth()->user();
        $cart = Cart::firstOrCreate(['user_id' => $user->id]);

        $cartItem = $cart->items()->where('product_id', $request->product_id)->first();
        if ($cartItem) {
            // Update quantity if item already in cart
            $cartItem->quantity += $request->quantity;
            $cartItem->save();
        } else {

            // Add new item to cart
            $cart->items()->create([

                'product_id' => $request->product_id,
                'quantity' => $request->quantity,
                'price' => $request->price,
            ]);
        }

        return response()->json(['message' => 'Item added to cart']);
    }

    public function syncCart(Request $request)
    {
        $user = auth()->user();
        $guestCart = $request->cart;

        $cart = Cart::firstOrCreate(['user_id' => $user->id]);

        foreach ($guestCart as $item) {
            $cartItem = $cart->items()->where('product_id', $item['product_id'])->first();
            if ($cartItem) {
                $cartItem->quantity += $item['quantity'];
                $cartItem->save();
            } else {
                $cart->items()->create([
                    'product_id' => $item['product_id'],
                    'quantity' => $item['quantity'],
                    'price' => $item['price'],
                ]);
            }
        }

        return response()->json(['message' => 'Cart synced successfully']);
    }


    public function viewCart()
    {
        $cart = auth()->user()->cart()->with('items.puppy')->first();

        if (!$cart) {
            return response()->json(['message' => 'Cart is empty'], 404);
        }

        return response()->json([
            'id' => $cart->id,
            'user_id' => $cart->user_id,
            'items' => $cart->items->map(function ($item) {
                if ($item->puppy) {
                    
                    return [
                        'id' => $item->id,
                        'product_id' => $item->puppy->id,
                        'name' => $item->puppy->name,
                        'price' => $item->puppy->price,
                        'quantity' => $item->quantity,
                        'image' => $item->puppy->main_image, // Adjust field name if needed
                        'total' => $item->quantity * $item->puppy->price,
                    ];
                } else {
                    // If the puppy is missing, return a placeholder
                    return [
                        'id' => $item->id,
                        'product_id' => null,
                        'name' => 'Unknown Product',
                        'price' => 0,
                        'quantity' => $item->quantity,
                        'image' => null,
                        'total' => 0,
                    ];
                }
            }),
        ]);
    }

    public function updateCartItem(Request $request, $itemId)
    {
        $cartItem = CartItem::findOrFail($itemId);
        $cartItem->update(['quantity' => $request->quantity]);
        return response()->json(['message' => 'Cart item updated']);
    }

    public function removeCartItem($itemId)
    {
        $cartItem = CartItem::findOrFail($itemId);
        $cartItem->delete();

        return response()->json(['message' => 'Item removed from cart']);
    }


    public function clearCart()
    {
        $cart = auth()->user()->cart;
        $cart->items()->delete();

        return response()->json(['message' => 'Cart cleared']);
    }
    

}
