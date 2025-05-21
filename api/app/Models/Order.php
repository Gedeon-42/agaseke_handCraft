<?php

namespace App\Models;

use App\Models\User;
use App\Models\Product;
use App\Models\OrderItem;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Order extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'email',
        'district',
        'sector',
        'cell',
        'street',
        'phone',
        
        'total_price',
        'quantity',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function puppie()
    {
        return $this->belongsTo(Product::class);
    }

     public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
}
