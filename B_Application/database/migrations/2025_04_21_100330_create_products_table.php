<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('brand')->nullable(); 
            $table->string('gender')->nullable();
            $table->text('description')->nullable();
            $table->decimal('price', 8, 2);
            $table->string('image')->nullable();
            $table->string('category')->nullable();
            $table->string('items_left')->default(5);
            $table->boolean('is_popular')->default(false);
            $table->boolean('is_in_inventory')->default(true);
            $table->timestamps();

            //  
            // "brand": "NIKE",
            // "gender": "MEN",
            // "category": "RUNNING",
            // "price": 160,
            // "is_in_inventory": true,
            // "items_left": 3, 
            // 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
