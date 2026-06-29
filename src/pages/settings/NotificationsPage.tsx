import { useState } from "react";
import "../../css/subpage.css";

const KEYS = ['push', 'email', 'promos', 'orderUpdates', 'newArrivals'] as const;
type Key = typeof KEYS[number];

const LABELS: Record<Key, { label: string; sub: string }> = {
  push:         { label: 'Push notifications',    sub: 'Alerts on your device' },
  email:        { label: 'Email notifications',   sub: 'Updates to your inbox' },
  promos:       { label: 'Promotions & deals',    sub: 'Sales, discounts, offers' },
  orderUpdates: { label: 'Order updates',         sub: 'Shipping & delivery status' },
  newArrivals:  { label: 'New arrivals',          sub: 'Be first to know' },
};

function loadPrefs(): Record<Key, boolean> {
  try { return JSON.parse(localStorage.getItem('notifPrefs') || '{}'); } catch { return {}; }
}

export default function NotificationsPage() {
  const [prefs, setPrefs] = useState<Record<Key, boolean>>(() => {
    const saved = loadPrefs();
    const defaults: Record<Key, boolean> = { push: true, email: true, promos: false, orderUpdates: true, newArrivals: false };
    return { ...defaults, ...saved };
  });

  const toggle = (key: Key) => {
    const next = { ...prefs, [key]: !prefs[key] };
    setPrefs(next);
    localStorage.setItem('notifPrefs', JSON.stringify(next));
  };

  return (
    <div className="subpage">
      <h1 className="subpage-title">Notifications</h1>
      <div className="subpage-section">
        {KEYS.map(key => (
          <div className="subpage-row" key={key} onClick={() => toggle(key)} style={{ cursor: 'pointer' }}>
            <div>
              <div className="subpage-row-label">{LABELS[key].label}</div>
              <div className="subpage-row-sub">{LABELS[key].sub}</div>
            </div>
            <div className={`toggle ${prefs[key] ? '' : 'off'}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
