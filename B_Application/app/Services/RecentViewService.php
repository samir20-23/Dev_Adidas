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