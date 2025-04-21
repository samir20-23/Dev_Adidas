<?php

namespace App\Services;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Payment;
use App\Models\PaymentMethod;
use App\Models\Product;
use App\Models\RecentView;
use App\Models\User;
use App\Models\Variant;
use App\Models\Wishlist;
use Illuminate\Support\Collection;
class OrderService
{
    public function createOrder(int $userId, array $items): Order
    {
        $order = Order::create(['user_id' => $userId, 'date' => now(), 'total' => 0]);
        $total = 0;
        foreach ($items as $item) {
            $orderItem = OrderItem::create([ 
                'order_id' => $order->id,
                'product_id' => $item['product_id'],
                'variant_id' => $item['variant_id'],
                'quantity' => $item['quantity'],
            ]);
            $total += $orderItem->variant->price * $orderItem->quantity;
        }
        $order->update(['total' => $total]);
        return $order;
    }

    public function getById(int $orderId): Order
    {
        return Order::findOrFail($orderId);
    }

    public function listByUser(int $userId): Collection
    {
        return Order::where('user_id', $userId)->get();
    }
}