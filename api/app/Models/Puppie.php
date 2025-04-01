<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Puppie extends Model
{
    use HasFactory;
    protected $fillable = ['name','user_id', 'description', 'main_image', 'price', 'discount', 'category', 'color','is_featured'];
    public function images()
    {
        return $this->hasMany(Thumbnail::class);
    }

    public function category(){
        return $this->belongsTo(Category::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }

}
