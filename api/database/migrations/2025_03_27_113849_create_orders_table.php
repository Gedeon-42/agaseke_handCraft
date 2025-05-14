<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Assuming each order is linked to a user
            $table->string('email')->nullable(); // Location can be a simple string or a more structured data
            $table->string('district')->nullable(); // Full address or additional details
            $table->string('sector')->nullable(); 
            $table->string('cell')->nullable();
            $table->string('street')->nullable(); 
            $table->string('phone')->nullable(); // Full address or additional details
            $table->string('total_price'); // Total price of the order
            $table->enum('status',['pending','completed','rejected'])->default('pending'); // e.g., pending, shipp
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
