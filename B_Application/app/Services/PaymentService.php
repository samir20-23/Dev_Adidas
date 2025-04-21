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
class PaymentService
{
    public function process(int $orderId, float $amount): Payment
    {
        return Payment::create(['order_id' => $orderId, 'amount' => $amount, 'date' => now()]);
    }
}
