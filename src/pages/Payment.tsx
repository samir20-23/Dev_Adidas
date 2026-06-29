import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Banknote, CreditCard } from "lucide-react";
import "../css/payment.css";

interface PaymentMethod {
  id: number;
  type: string;
  name: string;
  number: string;
  expiry: string;
}

const getMethods = (): PaymentMethod[] =>
  JSON.parse(localStorage.getItem('paymentMethods') || '[]');

const saveMethods = (m: PaymentMethod[]) =>
  localStorage.setItem('paymentMethods', JSON.stringify(m));

export default function Payment() {
  const navigate = useNavigate();
  const [methods, setMethods] = useState<PaymentMethod[]>(getMethods);
  const [selected, setSelected] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ name: '', number: '', expiry: '' });

  useEffect(() => {
    if (methods.length > 0) setSelected(methods[0].id);
  }, []);

  const addCard = () => {
    if (!form.name || !form.number || !form.expiry) return;
    const newCard: PaymentMethod = {
      id: Date.now(),
      type: 'card',
      name: form.name,
      number: '**** **** **** ' + form.number.slice(-4),
      expiry: form.expiry,
    };
    const updated = [...methods, newCard];
    saveMethods(updated);
    setMethods(updated);
    setSelected(newCard.id);
    setShowForm(false);
    setForm({ name: '', number: '', expiry: '' });
  };

  const handlePay = () => {
    if (!selected && methods.length > 0) return;
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="payment-page">
        <div className="payment-success">
          <div className="success-icon">✓</div>
          <h2>Order Placed!</h2>
          <p>Your order has been confirmed.</p>
          <p>Estimated delivery: 3–5 business days</p>
          <button className="btn-continue" onClick={() => {
            localStorage.removeItem('cart');
            window.dispatchEvent(new Event('cartUpdated'));
            navigate('/home');
          }}>Continue Shopping</button>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-page">
      <h2 className="section-title">Your cards</h2>

      {methods.map(m => (
        <div
          key={m.id}
          className={`payment-card ${selected === m.id ? 'selected' : ''}`}
          onClick={() => setSelected(m.id)}
        >
          <CreditCard size={24} />
          <div className="card-info">
            <div className="card-name">{m.name}</div>
            <div className="card-number">{m.number}</div>
          </div>
          <div className={`radio-btn ${selected === m.id ? 'selected' : ''}`} />
        </div>
      ))}

      {methods.length === 0 && !showForm && (
        <p className="no-cards-msg">No saved cards yet.</p>
      )}

      {showForm && (
        <div className="add-card-form">
          <h3>New Card</h3>
          <input
            placeholder="Cardholder name"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          />
          <input
            placeholder="Card number"
            maxLength={16}
            value={form.number}
            onChange={e => setForm(f => ({ ...f, number: e.target.value.replace(/\D/g, '') }))}
          />
          <input
            placeholder="MM/YY"
            maxLength={5}
            value={form.expiry}
            onChange={e => setForm(f => ({ ...f, expiry: e.target.value }))}
          />
          <div className="form-actions">
            <button className="btn-cancel-form" onClick={() => setShowForm(false)}>Cancel</button>
            <button className="btn-save-card" onClick={addCard}>Save Card</button>
          </div>
        </div>
      )}

      <h2 className="section-title">Other options</h2>
      <div className="option-card" onClick={() => setShowForm(true)}>
        <Plus size={20} /> Add new card
      </div>
      <div className="option-card">
        <Banknote size={20} /> Cash on delivery
      </div>

      <button className="btn-pay-now" onClick={handlePay}>Pay now</button>
    </div>
  );
}
