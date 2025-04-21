<?php

namespace Database\Factories;

use App\Models\PaymentMethod;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class PaymentMethodFactory extends Factory
{
    protected $model = PaymentMethod::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'type' => fake()->randomElement(['Mastercard', 'Visa', 'Paypal']),
            'card_number_masked' => '**** **** **** ' . fake()->numerify('####'),
        ];
    }
}

