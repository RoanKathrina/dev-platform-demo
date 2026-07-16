import { useCallback, useEffect, useMemo, useState } from 'react';
import { getDashboard } from '../services/dashboardService';
import { Icon } from '../components/layout/Icons';
import MetricCard from '../components/dashboard/MetricCard';
import EnvironmentOverview from '../components/dashboard/EnvironmentOverview';
import ServiceHealth from '../components/dashboard/ServiceHealth';
import RecentDeployments from '../components/dashboard/RecentDeployments';
import DeploymentTrend from '../components/dashboard/DeploymentTrend';
import ActivityFeed from '../components/dashboard/ActivityFeed';

export default function DashboardPage() {
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const loadDashboard = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await getDashboard({ useStub: true });
      setDashboard(response.response_body);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to load dashboard');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const summary = useMemo(() => {
    if (!dashboard) return null;
    return dashboard.environments.reduce((result, environment) => {
      result.services.total += environment.services.total;
      result.services.healthy += environment.services.running;
      result.services.degraded += environment.services.degraded;
      result.deployments.total += environment.deployments.total;
      result.deployments.successful += environment.deployments.successful;
      result.deployments.failed += environment.deployments.failed;
      return result;
    }, {
      services: { total: 0, healthy: 0, degraded: 0, unhealthy: 0 },
      deployments: { total: 0, successful: 0, failed: 0 },
    });
  }, [dashboard]);

  if (isLoading) {
    return <div className="page-state"><span className="spinner"/><h2>Loading dashboard…</h2><p>Reading the stubbed BFF response.</p></div>;
  }

  if (error || !dashboard || !summary) {
    return <div className="page-state error"><h2>Dashboard unavailable</h2><p>{error}</p><button onClick={loadDashboard}>Try again</button></div>;
  }

  return (
    <div className="dashboard-page">
      <header className="page-header">
        <div><h1>Dashboard</h1><p>Overview of environments, deployments and system health</p></div>
        <div className="header-actions"><span>{dashboard.date_range.label}</span><button onClick={loadDashboard}><Icon name="refresh" size={17}/> Refresh</button></div>
      </header>

      <section className="metrics-grid">
        <MetricCard icon="cube" title="Environments" value={dashboard.environments.length} detail="All active" tone="blue" />
        <MetricCard icon="check" title="Healthy Services" value={`${summary.services.healthy} / ${summary.services.total}`} detail={`${Math.round((summary.services.healthy / summary.services.total) * 100)}% healthy`} tone="green" />
        <MetricCard icon="rocket" title="Deployments (7d)" value={summary.deployments.total} detail={`${summary.deployments.successful} successful`} tone="purple" />
        <MetricCard icon="warning" title="Failed Deployments (7d)" value={summary.deployments.failed} detail="QA and UAT require attention" tone="orange" />
      </section>

      <section className="dashboard-grid">
        <EnvironmentOverview environments={dashboard.environments} />
        <ServiceHealth summary={summary.services} />
        <RecentDeployments deployments={dashboard.recent_deployments} />
        <div className="right-column">
          <DeploymentTrend data={dashboard.deployment_trend} />
          <ActivityFeed activities={dashboard.activity_feed} />
        </div>
      </section>
    </div>
  );
}
