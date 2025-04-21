<?php

namespace Database\Factories;

use App\Models\RecentView;
use App\Models\User;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class RecentViewFactory extends Factory
{
    protected $model = RecentView::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'product_id' => Product::factory(),
        ];
    }
}