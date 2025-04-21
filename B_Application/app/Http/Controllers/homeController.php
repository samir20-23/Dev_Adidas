<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ProductService;
use App\Services\CartService;
use App\Services\PaymentMethodService;
use App\Services\UserService;

class homeController extends Controller
{
    private ProductService $productService;
    private CartService $cartService;
    private PaymentMethodService $paymentMethodService;
    private UserService $userService;

    public function __construct(
        ProductService $productService,
        CartService $cartService,
        PaymentMethodService $paymentMethodService,
        UserService $userService
    ) {
        $this->productService = $productService;
        $this->cartService = $cartService;
        $this->paymentMethodService = $paymentMethodService;
        $this->userService = $userService;
    }

    public function index(Request $request)
    {
        $userId =1;

       
        


        $products = $this->productService->listAll();
        $cart = $this->userService->getUserCart($userId);
        $cartItems = $cart ? $cart->items()->with('variant')->get() : collect();
        $cartTotal = $this->cartService->getTotal($userId);
        $paymentMethods = $this->paymentMethodService->getMethods($userId);

        return view('home', compact(
            'products',
            'cartItems',
            'cartTotal',
            'paymentMethods'
        ));
    }
}
