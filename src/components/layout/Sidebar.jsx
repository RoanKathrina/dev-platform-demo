import { Icon } from './Icons';

const navigation = [
  { key: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { key: 'environments', label: 'Environments', icon: 'cube' },
  { key: 'deployments', label: 'Deployments', icon: 'rocket' },
  { key: 'audit', label: 'Audit Logs', icon: 'audit' },
];

export default function Sidebar({ activePage, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark"><Icon name="cube" size={29} /></div>
        <div>
          <div className="brand-title">OTPP Developer Platform</div>
          <div className="brand-subtitle">Developer Self-Service Portal</div>
        </div>
      </div>

      <nav className="sidebar-nav" aria-label="Main navigation">
        {navigation.map((item) => (
          <button
            className={`nav-item ${activePage === item.key ? 'active' : ''}`}
            key={item.key}
            onClick={() => onNavigate(item.key)}
            type="button"
          >
            <Icon name={item.icon} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <section className="platform-status">
          <div className="status-line"><span className="status-dot" /> All Systems Operational</div>
          <p>Last health check</p>
          <strong>1 minute ago</strong>
        </section>
        <div className="profile">
          <span className="avatar">AG</span>
          <span><strong>Alex Garcia</strong><small>Platform Engineer</small></span>
        </div>
        <button className="logout" type="button"><Icon name="logout" size={18}/> Logout</button>
      </div>
    </aside>
  );
}
