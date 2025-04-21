<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'price', 'image', 'category', 'is_popular'];

    public function variants()
    {
        return $this->hasMany(Variant::class);
    }

    public function cartItems()
    {
        return $this->hasMany(CartItem::class);
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function recentViews()
    {
        return $this->hasMany(RecentView::class);
    }

    public function wishlists()
    {
        return $this->hasMany(Wishlist::class);
    }
}
