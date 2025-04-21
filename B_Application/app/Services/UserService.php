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