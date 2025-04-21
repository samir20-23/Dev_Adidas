<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Product;
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
        // إنشاء مستخدمين
        User::factory(10)->create();

        // إنشاء منتجات وكل منتج يحتوي على Variant
        Product::factory(10)->create()->each(function ($product) {
            Variant::factory(3)->create([
                'product_id' => $product->id,
            ]);
        });

        // إنشاء عربات وربطها بمستخدمين
        Cart::factory(5)->create()->each(function ($cart) {
            CartItem::factory(2)->create([
                'cart_id' => $cart->id,
            ]);
        });

        // إنشاء طلبات وربطها بعناصر الطلبات
        Order::factory(5)->create()->each(function ($order) {
            OrderItem::factory(2)->create([
                'order_id' => $order->id,
            ]);

            Payment::factory()->create([
                'order_id' => $order->id,
            ]);
        });

        // طرق الدفع
        PaymentMethod::factory(5)->create();

        // المنتجات التي تم عرضها مؤخرًا
        RecentView::factory(10)->create();

        // المفضلات
        Wishlist::factory(10)->create();
    }
}
