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
