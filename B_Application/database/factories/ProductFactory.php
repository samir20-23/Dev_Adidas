<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition(): array
    {
        return [
            'name' => fake()->words(3, true),
            'description' => fake()->paragraph(),
            'price' => fake()->randomFloat(2, 1, 200),
            'image' => fake()->imageUrl(640, 480, 'products', true),
            'category' => fake()->word(),
            'is_popular' => fake()->boolean(20),
        ];
    }
}