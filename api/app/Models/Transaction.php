<?php

namespace App\Models;

use App\Models\Order;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Transaction extends Model
{
    use HasFactory;
    protected $casts = [
    'response' => 'array',
];

    protected $fillable = [
        'order_id',
        'phone',
        'network',
        'status',
        'paypack_reference',
        'response',
    ];



    public function order(){
        return $this->belongsTo(Order::class);
    }
}
