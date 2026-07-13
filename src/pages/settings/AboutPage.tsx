import "../../css/subpage.css";

export default function AboutPage() {
  return (
    <div className="subpage">
      <h1 className="subpage-title">About</h1>

      <div className="subpage-section">
        <div className="info-block">
          <h3>Dev Adidas</h3>
          <p>A next-generation Adidas shopping experience built with React + TypeScript + Vite.</p>
          <span className="info-badge">Version 1.0.0</span>
        </div>
      </div>

      <div className="subpage-section">
        <div className="subpage-row">
          <div className="subpage-row-label">Framework</div>
          <span style={{ color: 'var(--text-secondary)', fontSize: 14 }}>React 18 + Vite</span>
        </div>
        <div className="subpage-row">
          <div className="subpage-row-label">Language</div>
          <span style={{ color: 'var(--text-secondary)', fontSize: 14 }}>TypeScript</span>
        </div>
        <div className="subpage-row">
          <div className="subpage-row-label">Storage</div>
          <span style={{ color: 'var(--text-secondary)', fontSize: 14 }}>localStorage</span>
        </div>
        <div className="subpage-row">
          <div className="subpage-row-label">Icons</div>
          <span style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Lucide React</span>
        </div>
        <div className="subpage-row" style={{ borderBottom: 'none' }}>
          <div className="subpage-row-label">Developer</div>
          <a
            href="https://github.com/samir20-23/Dev_Adidas"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--text-secondary)', fontSize: 14, textDecoration: 'none' }}
          >
            GitHub ↗
          </a>
        </div>
      </div>

      <div className="subpage-section">
        <div className="info-block">
          <h3>Legal</h3>
          <p>This app is a portfolio project and is not affiliated with Adidas AG. All brand assets belong to their respective owners.</p>
        </div>
      </div>
    </div>
  );
}
