<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Customer extends Model
{
    use HasFactory;
    protected $fillable = ['first_name','last_name','phone',"city","province"];

    public function user(){
        return $this->belongsTo(User::class);
    }
}
