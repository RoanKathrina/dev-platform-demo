import { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import DashboardPage from './pages/DashboardPage';
import PlaceholderPage from './pages/PlaceholderPage';

const pages = {
  dashboard: <DashboardPage />,
  environments: (
    <PlaceholderPage
      title="Environments"
      description="Environment health, services, logs, and deployment targets will be implemented next."
    />
  ),
  deployments: (
    <PlaceholderPage
      title="Deployments"
      description="Deployment history and the three-step deployment workflow will be implemented next."
    />
  ),
  audit: (
    <PlaceholderPage
      title="Audit Logs"
      description="User actions, deployment events, and system activity will be implemented next."
    />
  ),
};

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');

  return (
    <div className="app-shell">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <main className="app-main">{pages[activePage]}</main>
    </div>
  );
}
