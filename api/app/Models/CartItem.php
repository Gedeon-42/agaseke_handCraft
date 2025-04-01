<?php

namespace App\Models;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CartItem extends Model
{
    use HasFactory;
    protected $fillable =['cart_id','product_id','quantity','price'];
    public function cart()
    {
        return $this->belongsTo(Cart::class);
    }

    public function puppy()
    {
        return $this->belongsTo(Product::class,'product_id');
    }
}
