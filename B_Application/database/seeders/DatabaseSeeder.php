<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User; 
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Payment;
use App\Models\PaymentMethod;
use App\Models\RecentView;
use App\Models\Variant;
use App\Models\Wishlist;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            ProductSeeder::class,
        ]); 
        User::factory(10)->create();
 
       
        Cart::factory(5)->create()->each(function ($cart) {
            CartItem::factory(2)->create([
                'cart_id' => $cart->id,
            ]);
        });

        Order::factory(5)->create()->each(function ($order) {
            OrderItem::factory(2)->create([
                'order_id' => $order->id,
            ]);

            Payment::factory()->create([
                'order_id' => $order->id,
            ]);
        });
 
        PaymentMethod::factory(5)->create();
 
        RecentView::factory(10)->create();

     
        Wishlist::factory(10)->create();
    }
}
