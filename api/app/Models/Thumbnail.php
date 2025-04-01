<?php

namespace App\Models;

use App\Models\Puppie;
use App\Models\Product;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Thumbnail extends Model
{
    use HasFactory;

    protected $fillable = ['product_id','image_path'];

    // app/Models/ProductImage.php
public function puppie()
{
    return $this->belongsTo(Product::class);
}
}
