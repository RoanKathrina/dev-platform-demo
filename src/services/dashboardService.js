const dashboardStub = {
  status: 200,
  response_message: 'Success',
  response_body: {
    generated_at: '2026-07-16T17:00:00-04:00',
    date_range: {
      label: 'Last 7 days',
      start: '2026-07-10',
      end: '2026-07-16',
    },
    environments: [
      {
        key: 'DEV',
        status: 'active',
        deployment_target: 'ubuntu-dev-01',
        services: { total: 3, running: 3, degraded: 0 },
        deployments: { total: 3, successful: 3, failed: 0, in_progress: 0 },
      },
      {
        key: 'QA',
        status: 'active',
        deployment_target: 'ubuntu-qa-01',
        services: { total: 3, running: 2, degraded: 1 },
        deployments: { total: 5, successful: 3, failed: 2, in_progress: 0 },
      },
      {
        key: 'UAT',
        status: 'active',
        deployment_target: 'ubuntu-uat-01',
        services: { total: 3, running: 2, degraded: 1 },
        deployments: { total: 5, successful: 3, failed: 2, in_progress: 0 },
      },
    ],
    recent_deployments: [
      {
        id: 'DEP-20260716-1015',
        application: 'market-api',
        environment: 'DEV',
        version: 'v1.2.3',
        commit: 'a1b2c3d',
        status: 'success',
        deployed_at: 'Jul 16, 2026 10:15 AM',
        triggered_by: 'Alex Garcia',
      },
      {
        id: 'DEP-20260716-0930',
        application: 'pricing-api',
        environment: 'QA',
        version: 'v1.4.0',
        commit: 'b7c8d9e',
        status: 'failed',
        deployed_at: 'Jul 16, 2026 9:30 AM',
        triggered_by: 'Alex Garcia',
      },
      {
        id: 'DEP-20260715-1630',
        application: 'market-ui',
        environment: 'UAT',
        version: 'v2.0.1',
        commit: 'f4e5d6c',
        status: 'success',
        deployed_at: 'Jul 15, 2026 4:30 PM',
        triggered_by: 'Maria Santos',
      },
      {
        id: 'DEP-20260715-1510',
        application: 'notification-service',
        environment: 'QA',
        version: 'v1.1.2',
        commit: 'd4e5f6a',
        status: 'failed',
        deployed_at: 'Jul 15, 2026 3:10 PM',
        triggered_by: 'John Doe',
      },
      {
        id: 'DEP-20260714-1125',
        application: 'auth-service',
        environment: 'UAT',
        version: 'v1.0.8',
        commit: 'b7c8d9e',
        status: 'success',
        deployed_at: 'Jul 14, 2026 11:25 AM',
        triggered_by: 'Alex Garcia',
      },
    ],
    deployment_trend: [
      { day: 'Jul 10', successful: 1, failed: 0 },
      { day: 'Jul 11', successful: 2, failed: 1 },
      { day: 'Jul 12', successful: 1, failed: 0 },
      { day: 'Jul 13', successful: 1, failed: 1 },
      { day: 'Jul 14', successful: 2, failed: 0 },
      { day: 'Jul 15', successful: 1, failed: 1 },
      { day: 'Jul 16', successful: 1, failed: 1 },
    ],
    activity_feed: [
      {
        type: 'success',
        title: 'Deployment DEP-20260716-1015 to DEV completed successfully',
        timestamp: '5 minutes ago',
      },
      {
        type: 'warning',
        title: 'pricing-api deployment to QA failed health validation',
        timestamp: '50 minutes ago',
      },
      {
        type: 'warning',
        title: 'One service in UAT is degraded',
        timestamp: '1 hour ago',
      },
      {
        type: 'success',
        title: 'Health check completed for all environments',
        timestamp: '2 hours ago',
      },
    ],
  },
};

const delay = (milliseconds) =>
  new Promise((resolve) => window.setTimeout(resolve, milliseconds));

export async function getDashboard({ useStub = true } = {}) {
  if (useStub) {
    await delay(450);
    return structuredClone(dashboardStub);
  }

  const response = await fetch('/api/dev-platform-dashboard');
  if (!response.ok) {
    throw new Error(`Dashboard request failed with HTTP ${response.status}`);
  }
  return response.json();
}
