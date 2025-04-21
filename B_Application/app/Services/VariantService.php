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
