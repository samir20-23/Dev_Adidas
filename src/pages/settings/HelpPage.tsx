import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import "../../css/subpage.css";

const FAQ = [
  {
    q: 'How do I add a product to my cart?',
    a: 'Go to any product page, select your size, then tap "Add to cart". The cart badge on the bottom nav will update instantly.',
  },
  {
    q: 'How do I save a product to my wishlist?',
    a: 'Tap the heart icon on any product card or on the product detail page. Wishlisted items show a red filled heart.',
  },
  {
    q: 'How do I checkout?',
    a: 'Open your cart, review the items, then tap "Checkout". On the payment page, select or add a card and tap "Pay now".',
  },
  {
    q: 'How do I change my password?',
    a: 'Go to Settings → Password. Enter your current password, then your new password twice and tap "Save".',
  },
  {
    q: 'How do I switch between dark and light mode?',
    a: 'Go to Settings and tap "Dark mode" to toggle. Your preference is saved automatically.',
  },
  {
    q: 'How do I delete my account?',
    a: 'Go to Settings → Account options → Delete my account. Tap again to confirm. This removes all your data from this device.',
  },
  {
    q: 'Is my data stored on a server?',
    a: 'No. All data (cart, wishlist, account, orders) is stored only on your device using localStorage. Nothing is sent to any server.',
  },
];

export default function HelpPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="subpage">
      <h1 className="subpage-title">Help / FAQ</h1>
      <div className="subpage-section">
        {FAQ.map((item, i) => (
          <div key={i} style={{ borderBottom: i < FAQ.length - 1 ? '1px solid var(--border)' : 'none' }}>
            <div
              className="subpage-row"
              style={{ cursor: 'pointer', borderBottom: 'none' }}
              onClick={() => setOpen(open === i ? null : i)}
            >
              <div className="subpage-row-label" style={{ fontWeight: 500 }}>{item.q}</div>
              {open === i ? <ChevronUp size={18} color="var(--text-secondary)" /> : <ChevronDown size={18} color="var(--text-secondary)" />}
            </div>
            {open === i && (
              <div style={{ padding: '0 20px 16px', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
