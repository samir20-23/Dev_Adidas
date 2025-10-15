Here are all your **Laravel migration tables** with the missing `order_items` included — all formatted consistently:

---

### ✅ 1. `users` table

```php
Schema::create('users', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->string('email')->unique();
    $table->string('password');
    $table->timestamps();
});
```

---

### ✅ 2. `products` table

```php
Schema::create('products', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->text('description')->nullable();
    $table->decimal('price', 8, 2);
    $table->string('image')->nullable();
    $table->string('category')->nullable();
    $table->boolean('is_popular')->default(false);
    $table->timestamps();
});
```

---

### ✅ 3. `variants` table

```php
Schema::create('variants', function (Blueprint $table) {
    $table->id();
    $table->foreignId('product_id')->constrained()->onDelete('cascade');
    $table->string('size');
    $table->string('color');
    $table->integer('stock');
    $table->decimal('price', 8, 2);
    $table->timestamps();
});
```

---

### ✅ 4. `carts` table

```php
Schema::create('carts', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->timestamps();
});
```

---

### ✅ 5. `cart_items` table

```php
Schema::create('cart_items', function (Blueprint $table) {
    $table->id();
    $table->foreignId('cart_id')->constrained()->onDelete('cascade');
    $table->foreignId('product_id')->constrained()->onDelete('cascade');
    $table->foreignId('variant_id')->constrained()->onDelete('cascade');
    $table->integer('quantity');
    $table->timestamps();
}); 
```

---

### ✅ 6. `orders` table

```php
Schema::create('orders', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->date('date');
    $table->decimal('total', 8, 2);
    $table->timestamps();
});
```

---

### ✅ 7. `order_items` table

```php
Schema::create('order_items', function (Blueprint $table) {
    $table->id();
    $table->foreignId('order_id')->constrained()->onDelete('cascade');
    $table->foreignId('product_id')->constrained()->onDelete('cascade');
    $table->foreignId('variant_id')->constrained()->onDelete('cascade');
    $table->integer('quantity');
    $table->timestamps();
});
```

---

### ✅ 8. `payments` table

```php
Schema::create('payments', function (Blueprint $table) {
    $table->id();
    $table->foreignId('order_id')->constrained()->onDelete('cascade');
    $table->decimal('amount', 8, 2);
    $table->date('date');
    $table->timestamps();
});
```

---

### ✅ 9. `recent_views` table

```php
Schema::create('recent_views', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->foreignId('product_id')->constrained()->onDelete('cascade');
    $table->timestamps();
});
```

---

### ✅ 10. `payment_methods` table

```php
Schema::create('payment_methods', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->enum('type', ['Mastercard', 'Visa', 'Paypal']);
    $table->string('card_number_masked');
    $table->timestamps();
});
```

---

### ✅ 11. `wishlists` table

```php
Schema::create('wishlists', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->foreignId('product_id')->constrained()->onDelete('cascade');
    $table->timestamps();
});
```

---

### ✅ Recommended Models & Commands

```bash
php artisan make:model User -mrcs
php artisan make:model Product -mrcs
php artisan make:model Variant -mrcs
php artisan make:model Cart -mrcs
php artisan make:model CartItem -mrcs
php artisan make:model Order -mrcs
php artisan make:model OrderItem -mrcs
php artisan make:model Payment -mrcs
php artisan make:model RecentView -mrcs
php artisan make:model PaymentMethod -mrcs
php artisan make:model Wishlist -mrcs
```

Let me know if you want seeders or factories too.