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
