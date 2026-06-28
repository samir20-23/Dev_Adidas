import { useState } from "react";
import { Plus, Banknote } from "lucide-react";
import "../css/payment.css";

export default function Payment() {
    const [selectedMethod, setSelectedMethod] = useState("mastercard");

    return (
        <div className="payment-page">
            <h2 className="section-title">Your cards</h2>
            
            {/* Mastercard */}
            <div 
                className={`payment-card ${selectedMethod === "mastercard" ? "selected" : ""}`}
                onClick={() => setSelectedMethod("mastercard")}
            >
                <div style={{ display: 'flex', position: 'relative', width: 36, height: 24 }}>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#EB001B', position: 'absolute', left: 0 }}></div>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#F79E1B', position: 'absolute', left: 12, mixBlendMode: 'screen' }}></div>
                </div>
                <div className="card-info">
                    <div className="card-name">Mastercard</div>
                    <div className="card-number">3742 **** **** 0126</div>
                </div>
                <div className={`radio-btn ${selectedMethod === "mastercard" ? "selected" : ""}`}></div>
            </div>

            {/* Paypal */}
            <div 
                className={`payment-card ${selectedMethod === "paypal" ? "selected" : ""}`}
                onClick={() => setSelectedMethod("paypal")}
            >
                <div style={{ color: '#003087', fontWeight: 800, fontStyle: 'italic', fontSize: 18, width: 36 }}>PayPal</div>
                <div className="card-info">
                    <div className="card-name" style={{ color: selectedMethod === 'paypal' ? '#fff' : 'inherit' }}>Paypal</div>
                    <div className="card-number">1432 **** 8065</div>
                </div>
                <div className={`radio-btn ${selectedMethod === "paypal" ? "selected" : ""}`}></div>
            </div>

            {/* Visa */}
            <div 
                className={`payment-card ${selectedMethod === "visa" ? "selected" : ""}`}
                onClick={() => setSelectedMethod("visa")}
            >
                <div style={{ color: '#1A1F71', fontWeight: 800, fontStyle: 'italic', fontSize: 18, width: 36 }}>VISA</div>
                <div className="card-info">
                    <div className="card-name" style={{ color: selectedMethod === 'visa' ? '#fff' : 'inherit' }}>Visa</div>
                    <div className="card-number">4356 **** **** 9089</div>
                </div>
                <div className={`radio-btn ${selectedMethod === "visa" ? "selected" : ""}`}></div>
            </div>

            <h2 className="section-title">Other options</h2>
            
            <div className="option-card">
                <Plus size={20} /> Add new card
            </div>
            <div className="option-card">
                <Banknote size={20} /> Cash on delivery
            </div>

            <button className="btn-pay-now">Pay now</button>
        </div>
    );
}