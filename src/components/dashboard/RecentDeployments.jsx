import StatusBadge from './StatusBadge';

export default function RecentDeployments({ deployments }) {
  return (
    <section className="panel recent-panel">
      <header className="panel-header"><h2>Recent Deployments</h2><button type="button">View all deployments →</button></header>
      <div className="table-scroll">
        <table>
          <thead><tr><th>Deployment ID</th><th>Application</th><th>Environment</th><th>Version / Image</th><th>Status</th><th>Deployed At</th><th>Triggered By</th></tr></thead>
          <tbody>
            {deployments.map((deployment) => (
              <tr key={deployment.id}>
                <td className="deployment-id">{deployment.id}</td>
                <td>{deployment.application}</td>
                <td><span className={`env-badge ${deployment.environment.toLowerCase()}`}>{deployment.environment}</span></td>
                <td><strong>{deployment.version}</strong><small>commit: {deployment.commit}</small></td>
                <td><StatusBadge status={deployment.status} label={deployment.status === 'success' ? 'Success' : 'Failed'} /></td>
                <td>{deployment.deployed_at}</td>
                <td><span className="user-cell"><i>{deployment.triggered_by.split(' ').map((n) => n[0]).join('')}</i>{deployment.triggered_by}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
