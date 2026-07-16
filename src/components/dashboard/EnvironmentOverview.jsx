import StatusBadge from './StatusBadge';

export default function EnvironmentOverview({ environments }) {
  return (
    <section className="panel environment-panel">
      <header className="panel-header">
        <h2>Environment Overview</h2>
        <button type="button">View all environments →</button>
      </header>
      <div className="table-scroll">
        <table>
          <thead><tr><th>Environment</th><th>Status</th><th>Services</th><th>Deployment Target</th><th>Health</th></tr></thead>
          <tbody>
            {environments.map((environment) => {
              const healthy = environment.services.degraded === 0;
              return (
                <tr key={environment.key}>
                  <td><span className={`env-badge ${environment.key.toLowerCase()}`}>{environment.key}</span></td>
                  <td><StatusBadge status="active" label="Active" /></td>
                  <td><strong>{environment.services.running} / {environment.services.total}</strong><small>{healthy ? 'Healthy' : 'Running'}</small></td>
                  <td>{environment.deployment_target}</td>
                  <td><StatusBadge status={healthy ? 'success' : 'warning'} label={healthy ? 'Healthy' : 'Degraded'} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
