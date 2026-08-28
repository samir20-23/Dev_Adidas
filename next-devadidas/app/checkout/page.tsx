"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { ChevronLeft, CreditCard, Lock, Check, Package } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import "../css/checkout.css";

type Step = "details" | "payment" | "success";

export default function CheckoutPage() {
    const router = useRouter();
    const { t } = useTranslation();
    const { cartItems, totalPrice, clearCart } = useCart();
    const [step, setStep] = useState<Step>("details");
    const [isProcessing, setIsProcessing] = useState(false);

    // Shipping form state
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        zip: "",
        country: "Morocco",
    });

    // Payment form state
    const [payment, setPayment] = useState({
        cardNumber: "",
        cardName: "",
        expiry: "",
        cvv: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const shippingCost = totalPrice >= 50 ? 0 : 9.99;
    const grandTotal = totalPrice + shippingCost;

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
        setErrors(prev => ({ ...prev, [e.target.name]: "" }));
    };

    const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        if (e.target.name === "cardNumber") {
            value = value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
        }
        if (e.target.name === "expiry") {
            value = value.replace(/\D/g, "").slice(0, 4);
            if (value.length > 2) value = value.slice(0, 2) + "/" + value.slice(2);
        }
        if (e.target.name === "cvv") {
            value = value.replace(/\D/g, "").slice(0, 3);
        }
        setPayment(prev => ({ ...prev, [e.target.name]: value }));
        setErrors(prev => ({ ...prev, [e.target.name]: "" }));
    };

    const validateDetails = () => {
        const newErrors: Record<string, string> = {};
        if (!form.firstName.trim()) newErrors.firstName = "Required";
        if (!form.lastName.trim()) newErrors.lastName = "Required";
        if (!form.email.includes("@")) newErrors.email = "Invalid email";
        if (!form.address.trim()) newErrors.address = "Required";
        if (!form.city.trim()) newErrors.city = "Required";
        if (!form.zip.trim()) newErrors.zip = "Required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validatePayment = () => {
        const newErrors: Record<string, string> = {};
        const raw = payment.cardNumber.replace(/\s/g, "");
        if (raw.length < 16) newErrors.cardNumber = "Enter a valid 16-digit card number";
        if (!payment.cardName.trim()) newErrors.cardName = "Required";
        if (payment.expiry.length < 5) newErrors.expiry = "Enter MM/YY";
        if (payment.cvv.length < 3) newErrors.cvv = "Enter 3-digit CVV";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleContinueToPayment = () => {
        if (validateDetails()) setStep("payment");
    };

    const handlePlaceOrder = () => {
        if (!validatePayment()) return;
        setIsProcessing(true);
        // Simulate payment processing (no real API)
        setTimeout(() => {
            setIsProcessing(false);
            clearCart();
            setStep("success");
        }, 2000);
    };

    if (cartItems.length === 0 && step !== "success") {
        return (
            <div className="checkout-empty">
                <Package size={64} strokeWidth={1.5} />
                <h2>Your cart is empty</h2>
                <button className="checkout-back-btn" onClick={() => router.push("/home")}>
                    Continue Shopping
                </button>
            </div>
        );
    }

    if (step === "success") {
        return (
            <div className="checkout-success">
                <div className="success-icon">
                    <Check size={48} />
                </div>
                <h1>Order Confirmed!</h1>
                <p>Thank you for your purchase. Your order has been placed successfully.</p>
                <p className="success-sub">You will receive a confirmation email shortly.</p>
                <div className="success-order-id">
                    Order #{Math.random().toString(36).slice(2, 10).toUpperCase()}
                </div>
                <button className="checkout-back-btn" onClick={() => router.push("/home")}>
                    Continue Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="checkout-container">
            {/* Header */}
            <header className="checkout-header">
                <button className="back-btn" onClick={() => step === "payment" ? setStep("details") : router.back()} aria-label="Go back">
                    <ChevronLeft size={24} />
                </button>
                <h1 className="checkout-title">
                    {step === "details" ? "Shipping Details" : "Payment"}
                </h1>
                <div />
            </header>

            {/* Steps indicator */}
            <div className="checkout-steps">
                <div className={`step-dot ${step === "details" || step === "payment" ? "active" : ""}`}>1</div>
                <div className="step-line" />
                <div className={`step-dot ${step === "payment" ? "active" : ""}`}>2</div>
            </div>
            <div className="checkout-step-labels">
                <span>Shipping</span>
                <span>Payment</span>
            </div>

            <div className="checkout-body">
                {/* Order summary */}
                <div className="order-summary">
                    <h3>Order Summary</h3>
                    {cartItems.map(item => (
                        <div key={`${item.id}-${item.size}-${item.color}`} className="summary-item">
                            <img src={item.image} alt={item.name} />
                            <div className="summary-item-info">
                                <span className="summary-item-name">{item.name}</span>
                                <span className="summary-item-meta">Size: {item.size} · {item.color} × {item.quantity}</span>
                            </div>
                            <span className="summary-item-price">${(item.priceNum * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                    <div className="summary-totals">
                        <div className="summary-row"><span>Subtotal</span><span>${totalPrice.toFixed(2)}</span></div>
                        <div className="summary-row"><span>Shipping</span><span>{shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}</span></div>
                        <div className="summary-row summary-grand-total"><span>Total</span><span>${grandTotal.toFixed(2)}</span></div>
                    </div>
                </div>

                {/* Step 1: Shipping details */}
                {step === "details" && (
                    <div className="checkout-form">
                        <h2 className="form-section-title">Shipping Details</h2>
                        <div className="form-row">
                            <div className="form-group">
                                <label>First Name</label>
                                <input name="firstName" value={form.firstName} onChange={handleFormChange} placeholder="John" />
                                {errors.firstName && <span className="form-error">{errors.firstName}</span>}
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
                                <input name="lastName" value={form.lastName} onChange={handleFormChange} placeholder="Doe" />
                                {errors.lastName && <span className="form-error">{errors.lastName}</span>}
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input name="email" type="email" value={form.email} onChange={handleFormChange} placeholder="john@example.com" />
                            {errors.email && <span className="form-error">{errors.email}</span>}
                        </div>
                        <div className="form-group">
                            <label>Phone (optional)</label>
                            <input name="phone" value={form.phone} onChange={handleFormChange} placeholder="+212 600 000000" />
                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <input name="address" value={form.address} onChange={handleFormChange} placeholder="123 Main Street" />
                            {errors.address && <span className="form-error">{errors.address}</span>}
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>City</label>
                                <input name="city" value={form.city} onChange={handleFormChange} placeholder="Casablanca" />
                                {errors.city && <span className="form-error">{errors.city}</span>}
                            </div>
                            <div className="form-group">
                                <label>ZIP Code</label>
                                <input name="zip" value={form.zip} onChange={handleFormChange} placeholder="20000" />
                                {errors.zip && <span className="form-error">{errors.zip}</span>}
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Country</label>
                            <select name="country" value={form.country} onChange={handleFormChange} className="form-select">
                                <option>Morocco</option>
                                <option>France</option>
                                <option>United States</option>
                                <option>United Kingdom</option>
                                <option>Germany</option>
                                <option>Spain</option>
                                <option>UAE</option>
                                <option>Saudi Arabia</option>
                            </select>
                        </div>
                        <button className="checkout-action-btn" onClick={handleContinueToPayment}>
                            Continue to Payment
                        </button>
                    </div>
                )}

                {/* Step 2: Payment */}
                {step === "payment" && (
                    <div className="checkout-form">
                        <h2 className="form-section-title">
                            <Lock size={18} /> Secure Payment
                        </h2>

                        <div className="payment-methods">
                            <button className="payment-method active">
                                <CreditCard size={20} /> Card
                            </button>
                            <button className="payment-method">
                                💳 PayPal
                            </button>
                            <button className="payment-method">
                                🍎 Apple Pay
                            </button>
                        </div>

                        <div className="card-visual">
                            <div className="card-chip" />
                            <div className="card-number-display">
                                {payment.cardNumber || "•••• •••• •••• ••••"}
                            </div>
                            <div className="card-bottom">
                                <span>{payment.cardName || "CARD HOLDER"}</span>
                                <span>{payment.expiry || "MM/YY"}</span>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Card Number</label>
                            <div className="input-icon-wrap">
                                <CreditCard size={18} className="input-icon" />
                                <input
                                    name="cardNumber"
                                    value={payment.cardNumber}
                                    onChange={handlePaymentChange}
                                    placeholder="0000 0000 0000 0000"
                                    maxLength={19}
                                />
                            </div>
                            {errors.cardNumber && <span className="form-error">{errors.cardNumber}</span>}
                        </div>
                        <div className="form-group">
                            <label>Cardholder Name</label>
                            <input
                                name="cardName"
                                value={payment.cardName}
                                onChange={handlePaymentChange}
                                placeholder="JOHN DOE"
                                style={{ textTransform: "uppercase" }}
                            />
                            {errors.cardName && <span className="form-error">{errors.cardName}</span>}
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Expiry Date</label>
                                <input
                                    name="expiry"
                                    value={payment.expiry}
                                    onChange={handlePaymentChange}
                                    placeholder="MM/YY"
                                    maxLength={5}
                                />
                                {errors.expiry && <span className="form-error">{errors.expiry}</span>}
                            </div>
                            <div className="form-group">
                                <label>CVV</label>
                                <input
                                    name="cvv"
                                    value={payment.cvv}
                                    onChange={handlePaymentChange}
                                    placeholder="•••"
                                    type="password"
                                    maxLength={3}
                                />
                                {errors.cvv && <span className="form-error">{errors.cvv}</span>}
                            </div>
                        </div>

                        <div className="secure-badge">
                            <Lock size={14} /> Your payment information is encrypted and secure
                        </div>

                        <button
                            className={`checkout-action-btn ${isProcessing ? "processing" : ""}`}
                            onClick={handlePlaceOrder}
                            disabled={isProcessing}
                        >
                            {isProcessing ? (
                                <span className="processing-spinner" />
                            ) : (
                                <>Place Order · ${grandTotal.toFixed(2)}</>
                            )}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
