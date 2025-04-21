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

class UserService
{
    public function register(array $data): User
    {
        return User::create($data);
    }

    public function getUserCart(int $userId): ?Cart
    {
        return User::findOrFail($userId)->cart;
    }

    public function getOrders(int $userId): Collection
    {
        return User::findOrFail($userId)->orders;
    }
}

class ProductService
{
    public function listAll(): Collection
    {
        return Product::all();
    }

    public function getById(int $id): Product
    {
        return Product::findOrFail($id);
    }

    public function getPopular(): Collection
    {
        return Product::where('is_popular', true)->get();
    }

    public function getVariants(int $productId): Collection
    {
        return Product::findOrFail($productId)->variants;
    }
}

class VariantService
{
    public function checkStock(int $variantId): int
    {
        return Variant::findOrFail($variantId)->stock;
    }

    public function updateStock(int $variantId, int $quantity): void
    {
        $variant = Variant::findOrFail($variantId);
        $variant->decrement('stock', $quantity);
    }
}

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
        return $cart->items->sum(fn($item) => $item->variant->price * $item->quantity);
    }
}

class CartItemService
{
    public function updateQuantity(int $itemId, int $quantity): CartItem
    {
        $item = CartItem::findOrFail($itemId);
        $item->update(['quantity' => $quantity]);
        return $item;
    }

    public function getItem(int $itemId): CartItem
    {
        return CartItem::findOrFail($itemId);
    }
}

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

class OrderItemService
{
    public function getItems(int $orderId): Collection
    {
        return Order::findOrFail($orderId)->items;
    }
}

class PaymentService
{
    public function process(int $orderId, float $amount): Payment
    {
        return Payment::create(['order_id' => $orderId, 'amount' => $amount, 'date' => now()]);
    }
}

class PaymentMethodService
{
    public function addMethod(int $userId, string $type, string $masked): PaymentMethod
    {
        return PaymentMethod::create(['user_id' => $userId, 'type' => $type, 'card_number_masked' => $masked]);
    }

    public function getMethods(int $userId): Collection
    {
        return PaymentMethod::where('user_id', $userId)->get();
    }
}

class RecentViewService
{
    public function addView(int $userId, int $productId): RecentView
    {
        return RecentView::create(['user_id' => $userId, 'product_id' => $productId]);
    }

    public function listRecent(int $userId, int $limit = 10): Collection
    {
        return RecentView::where('user_id', $userId)
                         ->latest()
                         ->limit($limit)
                         ->get();
    }
}

class WishlistService
{
    public function addToWishlist(int $userId, int $productId): Wishlist
    {
        return Wishlist::firstOrCreate(['user_id' => $userId, 'product_id' => $productId]);
    }

    public function removeFromWishlist(int $id): void
    {
        Wishlist::findOrFail($id)->delete();
    }

    public function getWishlist(int $userId): Collection
    {
        return Wishlist::where('user_id', $userId)->get();
    }
}
