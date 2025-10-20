'use client';

import { useState } from 'react';
import { ChevronLeft, CreditCard, Plus, Wallet, DollarSign, ShoppingCart, Home, Heart, User } from 'lucide-react';
import '../../../src/css/payment.css';

export default function Payment() {
    const [selectedPayment, setSelectedPayment] = useState('mastercard');
    const [cashOnDelivery, setCashOnDelivery] = useState(false);

    const paymentMethods = [
        {
            id: 'mastercard',
            type: 'Mastercard',
            number: '3742 **** **** 0126',
            icon: 'mastercard',
            bgColor: '#000',
        },
        {
            id: 'paypal',
            type: 'Paypal',
            number: '1432 **** 8065',
            icon: 'paypal',
            bgColor: '#fff',
        },
        {
            id: 'visa',
            type: 'Visa',
            number: '4356 **** **** 9089',
            icon: 'visa',
            bgColor: '#fff',
        },
    ];

    return (
        <div className="payment-container">
            {/* Header */}
            <header className="payment-header">
                <button className="back-btn">
                    <ChevronLeft size={24} />
                </button>
                <h1 className="page-title">Payment</h1>
                <div style={{ width: '44px' }}></div>
            </header>

            <div className="payment-content">
                {/* Your Cards */}
                <section className="cards-section">
                    <h2 className="section-title">Your cards</h2>
                    <div className="cards-list">
                        {paymentMethods.map((method) => (
                            <div
                                key={method.id}
                                className={`payment-card ${method.bgColor === '#000' ? 'dark' : 'light'}`}
                                style={{ background: method.bgColor }}
                                onClick={() => setSelectedPayment(method.id)}
                            >
                                <div className="card-content">
                                    <div className="card-icon">
                                        {method.icon === 'mastercard' && (
                                            <div className="mastercard-logo">
                                                <div className="circle red"></div>
                                                <div className="circle orange"></div>
                                            </div>
                                        )}
                                        {method.icon === 'paypal' && <span className="paypal-text">PayPal</span>}
                                        {method.icon === 'visa' && <span className="visa-text">VISA</span>}
                                    </div>
                                    <div className="card-info">
                                        <div className="card-type">{method.type}</div>
                                        <div className="card-number">{method.number}</div>
                                    </div>
                                </div>
                                <div className={`radio-btn ${selectedPayment === method.id ? 'checked' : ''}`}>
                                    <div className="radio-inner"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Other Options */}
                <section className="other-options-section">
                    <h2 className="section-title">Other options</h2>
                    <div className="options-list">
                        <button className="option-btn">
                            <Plus size={20} />
                            <span>Add new card</span>
                        </button>
                        <button
                            className={`option-btn ${cashOnDelivery ? 'active' : ''}`}
                            onClick={() => setCashOnDelivery(!cashOnDelivery)}
                        >
                            <DollarSign size={20} />
                            <span>Cash on delivery</span>
                        </button>
                    </div>
                </section>

                {/* Pay Button */}
                <button className="pay-now-btn">Pay now</button>
            </div>

            {/* Bottom Navigation */}
            {/* <nav className="bottom-nav">
                <button className="nav-item">
                    <Home size={24} />
                </button>
                <button className="nav-item">
                    <ShoppingCart size={24} />
                </button>
                <button className="nav-item">
                    <Heart size={24} />
                </button>
                <button className="nav-item active">
                    <User size={24} />
                </button>
            </nav> */}
        </div>
    );
}