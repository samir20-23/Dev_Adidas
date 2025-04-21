<?php

namespace App\Services;
 
use App\Models\Product; 
use Illuminate\Support\Collection;

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