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
            $table->foreignId('product_id')->constrained()->onDelete('cascade'); // Assuming each order is for one product
            $table->string('location')->nullable(); // Location can be a simple string or a more structured data
            $table->string('address')->nullable(); // Full address or additional details
            $table->string('total_price'); // Total price of the order
            $table->string('quantity')->default(1); // Quantity of the product ordered
            $table->string('status')->default('pending'); // e.g., pending, shipp
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
