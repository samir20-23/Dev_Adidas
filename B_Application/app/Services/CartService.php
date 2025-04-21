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

class CartService
{
    public function addItem(int $userId, int $productId, int $variantId, int $quantity): CartItem
    {
        $cart = Cart::firstOrCreate(['user_id' => $userId]);
        return CartItem::updateOrCreate(
            ['cart_id' => $cart->id, 'variant_id' => $variantId],
            ['product_id' => $productId, 'quantity' => 
                CartItem::raw('quantity + ?', [$quantity])]
        );
    }

    public function removeItem(int $itemId): void
    {
        CartItem::findOrFail($itemId)->delete();
    }

    public function getTotal(int $userId): float
    {
        $cart = Cart::with('items.variant')->where('user_id', $userId)->first();
    
        if (!$cart) {
            return 0;
        }
    
        return $cart->items->sum(fn($item) => $item->variant->price * $item->quantity);
    }
    
}
